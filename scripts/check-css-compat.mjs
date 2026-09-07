import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const assetsDir = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "dist",
  "assets",
);
const cssFiles = readdirSync(assetsDir).filter((file) => file.endsWith(".css"));
const offenders = [];

for (const file of cssFiles) {
  const css = readFileSync(join(assetsDir, file), "utf8");
  if (/@media[^{]*width\s*[<>]=?\s*\d/.test(css)) offenders.push(file);
}

if (offenders.length > 0) {
  console.error(
    `Media Queries Level 4 range syntax found in: ${offenders.join(", ")}`,
  );
  console.error(
    "Older iOS/Android browsers drop these rules entirely. Check build.cssTarget in vite.config.ts.",
  );
  process.exit(1);
}

console.log(
  `CSS media queries are legacy-compatible (${cssFiles.length} file(s) checked)`,
);
