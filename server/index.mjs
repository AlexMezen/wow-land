import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, "..", "dist");
const DATA_DIR = path.join(__dirname, "..", "data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const MEDIA_DIR = path.join(DATA_DIR, "images");
const BASE_PATH = "/wow-land";
const PORT = Number(process.env.PORT) || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "wow-admin";
const MAX_BODY = 12 * 1024 * 1024;
const MAX_LEADS = 5000;
const LEADS_PER_MINUTE = 5;
const ALLOWED_IMAGE_EXT = ["webp", "png", "jpg", "jpeg", "gif", "svg", "avif"];

const tokens = new Set();
const hitLog = new Map();

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

const sendJson = (res, status, payload) => {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let size = 0;
    let tooLarge = false;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        tooLarge = true;
        chunks.length = 0;
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      if (tooLarge) {
        reject(new Error("body too large"));
        return;
      }
      resolve(Buffer.concat(chunks).toString("utf8"));
    });
    req.on("error", reject);
  });

const isAuthed = (req) => {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return token.length > 0 && tokens.has(token);
};

const isThrottled = (ip) => {
  const now = Date.now();
  const recent = (hitLog.get(ip) ?? []).filter((ts) => now - ts < 60_000);
  recent.push(now);
  hitLog.set(ip, recent);
  return recent.length > LEADS_PER_MINUTE;
};

const readLeads = async () => {
  try {
    const data = JSON.parse(await readFile(LEADS_FILE, "utf8"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

const readDataJson = async (filePath) => {
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return null;
  }
};

const serveFile = async (res, filePath, noCache = false) => {
  let body;
  try {
    body = await readFile(filePath);
  } catch {
    return false;
  }
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, {
    "Content-Type": MIME[ext] ?? "application/octet-stream",
    "Cache-Control": noCache ? "no-cache" : "public, max-age=3600",
  });
  res.end(body);
  return true;
};

const serveStatic = async (res, pathname) => {
  const relative = pathname.startsWith(BASE_PATH)
    ? pathname.slice(BASE_PATH.length)
    : pathname;
  let decoded;
  try {
    decoded = decodeURIComponent(relative);
  } catch {
    return false;
  }
  const target = path.normalize(
    path.join(
      DIST_DIR,
      decoded === "/" || decoded === "\\" ? "index.html" : decoded,
    ),
  );
  if (target !== DIST_DIR && !target.startsWith(DIST_DIR + path.sep))
    return false;
  return serveFile(res, target);
};

const server = createServer(async (req, res) => {
  const url = new URL(
    req.url ?? "/",
    `http://${req.headers.host ?? "localhost"}`,
  );
  const pathname = url.pathname;
  const forwarded = req.headers["x-forwarded-for"];
  const ip = String(
    Array.isArray(forwarded)
      ? forwarded[0]
      : (forwarded ?? req.socket.remoteAddress ?? "unknown"),
  )
    .split(",")[0]
    .trim();

  try {
    if (req.method === "GET" && pathname === "/api/health") {
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "POST" && pathname === "/api/login") {
      const body = JSON.parse((await readBody(req)) || "{}");
      if (body.password === ADMIN_PASSWORD) {
        const token = crypto.randomBytes(24).toString("hex");
        tokens.add(token);
        sendJson(res, 200, { token });
      } else {
        sendJson(res, 401, { error: "invalid password" });
      }
      return;
    }

    if (pathname === "/api/leads") {
      if (req.method === "GET") {
        if (!isAuthed(req)) {
          sendJson(res, 401, { error: "unauthorized" });
          return;
        }
        sendJson(res, 200, await readLeads());
        return;
      }
      if (req.method === "POST") {
        if (isThrottled(ip)) {
          sendJson(res, 429, { error: "too many requests" });
          return;
        }
        const raw = JSON.parse((await readBody(req)) || "{}");
        const lead = {
          id: `lead-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
          ts: Date.now(),
          locale: String(raw.locale ?? "uk").slice(0, 8),
          name: String(raw.name ?? "")
            .trim()
            .slice(0, 120),
          contact: String(raw.contact ?? "")
            .trim()
            .slice(0, 160),
          interest: String(raw.interest ?? "").slice(0, 160),
          messenger: String(raw.messenger ?? "").slice(0, 40),
        };
        if (!lead.name || !lead.contact) {
          sendJson(res, 400, { error: "name and contact are required" });
          return;
        }
        const leads = await readLeads();
        leads.unshift(lead);
        await mkdir(DATA_DIR, { recursive: true });
        await writeFile(
          LEADS_FILE,
          `${JSON.stringify(leads.slice(0, MAX_LEADS), null, 2)}\n`,
        );
        sendJson(res, 200, { ok: true });
        return;
      }
    }

    if (req.method === "POST" && pathname === "/api/content") {
      if (!isAuthed(req)) {
        sendJson(res, 401, { error: "unauthorized" });
        return;
      }
      const raw = (await readBody(req)).replace(/^\uFEFF/, "");
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || !parsed.uk || !parsed.en) {
        sendJson(res, 400, {
          error: "content must contain uk and en sections",
        });
        return;
      }
      await mkdir(DATA_DIR, { recursive: true });
      await writeFile(CONTENT_FILE, `${JSON.stringify(parsed, null, 2)}\n`);
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "POST" && pathname === "/api/upload") {
      if (!isAuthed(req)) {
        sendJson(res, 401, { error: "unauthorized" });
        return;
      }
      const body = JSON.parse((await readBody(req)).replace(/^\uFEFF/, ""));
      const dataUrl = String(body.data ?? "");
      const match =
        /^data:image\/(png|jpeg|webp|gif|svg\+xml|avif);base64,(.+)$/s.exec(
          dataUrl,
        );
      if (!match) {
        sendJson(res, 400, { error: "unsupported image format" });
        return;
      }
      const rawExt =
        String(body.name ?? "")
          .split(".")
          .pop() ?? "";
      const ext = ALLOWED_IMAGE_EXT.includes(rawExt.toLowerCase())
        ? rawExt.toLowerCase()
        : match[1] === "jpeg"
          ? "jpg"
          : match[1] === "svg+xml"
            ? "svg"
            : match[1];
      const safeBase =
        String(body.name ?? "photo")
          .replace(/\.[^.]*$/, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .slice(0, 60) || "photo";
      const filename = `${Date.now()}-${safeBase}.${ext}`;
      await mkdir(MEDIA_DIR, { recursive: true });
      await writeFile(
        path.join(MEDIA_DIR, filename),
        Buffer.from(match[2], "base64"),
      );
      sendJson(res, 200, { url: `${BASE_PATH}/media/${filename}` });
      return;
    }

    if (req.method === "GET" && pathname.endsWith("/content.json")) {
      const custom = await readDataJson(CONTENT_FILE);
      if (custom !== null) {
        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-cache",
        });
        res.end(custom);
        return;
      }
    }

    if (req.method === "GET" && pathname.startsWith(`${BASE_PATH}/media/`)) {
      const filename = path.basename(decodeURIComponent(pathname));
      if (!/\.[a-z0-9]{2,5}$/i.test(filename)) {
        sendJson(res, 404, { error: "not found" });
        return;
      }
      const mediaPath = path.normalize(path.join(MEDIA_DIR, filename));
      if (!mediaPath.startsWith(MEDIA_DIR + path.sep)) {
        sendJson(res, 404, { error: "not found" });
        return;
      }
      if (await serveFile(res, mediaPath)) return;
      sendJson(res, 404, { error: "not found" });
      return;
    }

    if (req.method === "GET" && (pathname === "/" || pathname === BASE_PATH)) {
      res.writeHead(302, { Location: `${BASE_PATH}/` });
      res.end();
      return;
    }

    if (req.method === "GET" && (await serveStatic(res, pathname))) return;

    sendJson(res, 404, { error: "not found" });
  } catch (error) {
    console.error("Request failed:", error);
    const tooLarge =
      error instanceof Error && error.message === "body too large";
    sendJson(res, tooLarge ? 413 : 500, {
      error: tooLarge ? "body too large" : "server error",
    });
  }
});

server.listen(PORT, () => {
  console.log(`eLITstroy server: http://localhost:${PORT}${BASE_PATH}/`);
  if (ADMIN_PASSWORD === "wow-admin") {
    console.log(
      "Warning: default admin password in use. Set ADMIN_PASSWORD env variable.",
    );
  }
});
