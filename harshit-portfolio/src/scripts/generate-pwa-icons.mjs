/**
 * Rasterize public/icons/logo.svg into favicons + PWA PNGs.
 * Browser favicon uses the SVG itself.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const outDir = path.join(appRoot, "public", "icons");
const logoPath = path.join(outDir, "logo.svg");

fs.mkdirSync(outDir, { recursive: true });

if (!fs.existsSync(logoPath)) {
  console.error("generate-pwa-icons: missing", logoPath);
  process.exit(1);
}

const logo = fs.readFileSync(logoPath);
fs.copyFileSync(logoPath, path.join(outDir, "favicon.svg"));

/** Figma SVG uses foreignObject; Sharp may fail, so keep a matching red square fallback. */
const rasterFallback = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
<rect width="120" height="120" fill="#FF0606"/>
<rect x="0.5" y="0.5" width="119" height="119" fill="none" stroke="#000"/>
</svg>`
);

async function raster(size) {
  try {
    return await sharp(logo, { density: 384 }).resize(size, size).png().toBuffer();
  } catch (error) {
    console.warn("generate-pwa-icons: Sharp could not rasterize logo.svg, using square fallback:", error.message);
    return sharp(rasterFallback, { density: 384 }).resize(size, size).png().toBuffer();
  }
}

async function writePng(name, size) {
  const dest = path.join(outDir, name);
  fs.writeFileSync(dest, await raster(size));
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
console.log("icons generated from logo.svg");
