/**
 * Rasterize public/icons/logo.png into favicons + PWA PNGs.
 * Browser favicon uses logo.png itself.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const outDir = path.join(appRoot, "public", "icons");
const logoPath = path.join(outDir, "logo.png");

fs.mkdirSync(outDir, { recursive: true });

if (!fs.existsSync(logoPath)) {
  console.error("generate-pwa-icons: missing", logoPath);
  process.exit(1);
}

async function writePng(name, size) {
  const dest = path.join(outDir, name);
  await sharp(logoPath).resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(dest);
  console.log("wrote", dest);
  return dest;
}

await writePng("favicon-32x32.png", 32);
await writePng("favicon-48x48.png", 48);
await writePng("apple-touch-icon.png", 180);
await writePng("icon-192.png", 192);
await writePng("icon-512.png", 512);
await writePng("icon-maskable-192.png", 192);
await writePng("icon-maskable-512.png", 512);
await writePng("shortcut-192.png", 192);

const ico = await pngToIco([
  path.join(outDir, "favicon-32x32.png"),
  path.join(outDir, "favicon-48x48.png"),
]);
fs.writeFileSync(path.join(outDir, "favicon.ico"), ico);
console.log("wrote", path.join(outDir, "favicon.ico"));
console.log("icons generated from logo.png");
