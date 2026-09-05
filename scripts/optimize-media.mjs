import { readdir } from "node:fs/promises";
import { extname, join, parse } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const sourceDirectory = fileURLToPath(
  new URL("../public/images/", import.meta.url),
);
const files = await readdir(sourceDirectory);
const images = files.filter((file) =>
  [".jpg", ".jpeg", ".png"].includes(extname(file).toLowerCase()),
);

await Promise.all(
  images.map(async (file) => {
    const source = join(sourceDirectory, file);
    const target = join(sourceDirectory, `${parse(file).name}.webp`);
    await sharp(source)
      .rotate()
      .resize({
        width: 1600,
        height: 1200,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 80, effort: 5, smartSubsample: true })
      .toFile(target);
  }),
);

console.log(`Optimized ${images.length} images`);
