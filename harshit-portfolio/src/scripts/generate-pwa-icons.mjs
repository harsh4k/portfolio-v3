/**
 * Brand icons from the site HC monogram (header SVG paths, 280×280).
 * Writes browser favicons + PWA/Android PNGs. The Wodniack icon sync copies
 * the old AW mark; build.mjs overlays this folder afterward.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const outDir = path.join(appRoot, "public", "pwa-icons");

const hcMark = `
  <path d="M0 0v280h39.755V158.4h59.65V280h39.756V0H99.411v118.8H39.755V0H0Z"/>
  <path d="M160.734 0v280H280V240.245h-79.51V39.755H280V0H160.734Z"/>
`;

function iconSvg({ size, pad, fill = "#160000", background = "#F40C3F" }) {
  const inner = size * (1 - pad * 2);
  const scale = inner / 280;
  const x = (size - 280 * scale) / 2;
  const y = x;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${background}"/>
  <g transform="translate(${x} ${y}) scale(${scale})" fill="${fill}">${hcMark}</g>
</svg>`;
}

async function writePng(dir, name, svg) {
  const dest = path.join(dir, name);
  await sharp(Buffer.from(svg)).png().toFile(dest);
  console.log("wrote", dest);
  return dest;
}

fs.mkdirSync(outDir, { recursive: true });

const faviconSvg = iconSvg({ size: 512, pad: 0.1 });
fs.writeFileSync(path.join(outDir, "favicon.svg"), faviconSvg);

await writePng(outDir, "favicon-32x32.png", iconSvg({ size: 32, pad: 0.08 }));
await writePng(outDir, "favicon-48x48.png", iconSvg({ size: 48, pad: 0.08 }));
await writePng(outDir, "apple-touch-icon.png", iconSvg({ size: 180, pad: 0.12 }));
await writePng(outDir, "icon-192.png", iconSvg({ size: 192, pad: 0.08 }));
await writePng(outDir, "icon-512.png", iconSvg({ size: 512, pad: 0.08 }));
await writePng(outDir, "icon-maskable-192.png", iconSvg({ size: 192, pad: 0.2 }));
await writePng(outDir, "icon-maskable-512.png", iconSvg({ size: 512, pad: 0.2 }));
await writePng(outDir, "shortcut-192.png", iconSvg({ size: 192, pad: 0.12 }));

const ico = await pngToIco([
  path.join(outDir, "favicon-32x32.png"),
  path.join(outDir, "favicon-48x48.png"),
]);
fs.writeFileSync(path.join(outDir, "favicon.ico"), ico);
console.log("wrote", path.join(outDir, "favicon.ico"));
console.log("HC brand icons generated.");
