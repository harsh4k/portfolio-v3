import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

const copies = [
  ["fraunces/files/fraunces-latin-400-normal.woff2", "Fraunces-Regular.woff2"],
  ["fraunces/files/fraunces-latin-200-normal.woff2", "Fraunces-Light.woff2"],
  ["ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2", "IBMPlexMono-Regular.woff2"],
  ["ibm-plex-mono/files/ibm-plex-mono-latin-700-normal.woff2", "IBMPlexMono-Bold.woff2"],
  ["big-shoulders-display/files/big-shoulders-display-latin-800-normal.woff2", "BigShouldersDisplay-Bold.woff2"],
];

const paidFiles = [
  "PPEditorialNew-Regular.woff2",
  "PPEditorialNew-Ultralight.woff2",
  "PPFraktionMono-Regular.woff2",
  "PPFraktionMono-Bold.woff2",
  "Bigger-Display.woff2",
  "Syne-Bold.woff2",
  "Comic_CAT.woff2",
  "Comic_CAT.woff",
  "Comic_CAT.ttf",
];

const rewrites = [
  ["/fonts/PPEditorialNew-Regular.woff2", "/fonts/Fraunces-Regular.woff2"],
  ["/fonts/PPEditorialNew-Ultralight.woff2", "/fonts/Fraunces-Light.woff2"],
  ["/fonts/PPFraktionMono-Regular.woff2", "/fonts/IBMPlexMono-Regular.woff2"],
  ["/fonts/PPFraktionMono-Bold.woff2", "/fonts/IBMPlexMono-Bold.woff2"],
  ["/fonts/Bigger-Display.woff2", "/fonts/BigShouldersDisplay-Bold.woff2"],
  ["/fonts/Syne-Bold.woff2", "/fonts/BigShouldersDisplay-Bold.woff2"],
];

function rewriteText(filePath) {
  if (!fs.existsSync(filePath)) return;
  let text = fs.readFileSync(filePath, "utf8");
  const before = text;
  for (const [from, to] of rewrites) text = text.replaceAll(from, to);
  if (text !== before) fs.writeFileSync(filePath, text);
}

export function applyFreeFonts() {
  const nm = path.join(appRoot, "node_modules", "@fontsource");
  const fontsDir = path.join(appRoot, "public", "fonts");
  fs.mkdirSync(fontsDir, { recursive: true });

  for (const [from, to] of copies) {
    const src = path.join(nm, from);
    if (!fs.existsSync(src)) {
      console.warn("copy-free-fonts: missing", src);
      continue;
    }
    fs.copyFileSync(src, path.join(fontsDir, to));
  }

  for (const name of paidFiles) {
    fs.rmSync(path.join(fontsDir, name), { force: true });
  }
  fs.rmSync(path.join(fontsDir, "fonts"), { recursive: true, force: true });

  const astroDir = path.join(appRoot, "public", "_astro");
  if (fs.existsSync(astroDir)) {
    for (const name of fs.readdirSync(astroDir)) {
      if (name.endsWith(".css")) rewriteText(path.join(astroDir, name));
    }
  }
  rewriteText(path.join(appRoot, "index.html"));
  console.log("copy-free-fonts: OFL faces installed, paid files removed");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  applyFreeFonts();
}
