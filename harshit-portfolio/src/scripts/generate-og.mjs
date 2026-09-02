import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const dest = path.join(appRoot, "public", "images", "og-image.png");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F40C3F"/>
  <g transform="translate(460 175) scale(0.9)" fill="#160000">
    <path d="M0 0v280h39.755V158.4h59.65V280h39.756V0H99.411v118.8H39.755V0H0Z"/>
    <path d="M160.734 0v280H280V240.245h-79.51V39.755H280V0H160.734Z"/>
  </g>
</svg>`;

fs.mkdirSync(path.dirname(dest), { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(dest);
console.log("wrote", dest);
