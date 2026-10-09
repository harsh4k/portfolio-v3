/**
 * Renders public/og-image.png, the 1200x630 social preview card, in the site's
 * own fonts and colours. Run `npm run og` after changing the name or role in
 * src/data/profile.ts; the PNG is committed so builds stay deterministic.
 */
import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";

const root = new URL("..", import.meta.url);
const font = (name) => new URL(`public/fonts/${name}`, root).href;
const out = fileURLToPath(new URL("public/og-image.png", root));

// Seeded, so re-running produces the same card.
let seed = 7;
const random = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};
const stars = Array.from({ length: 110 }, () => {
  const x = (random() * 1200).toFixed(0);
  const y = (random() * 630).toFixed(0);
  const r = (random() * 1.2 + 0.5).toFixed(1);
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#15130f" opacity="${(0.15 + random() * 0.45).toFixed(2)}"/>`;
}).join("");

const html = `<!doctype html><html><head><style>
  @font-face { font-family: Fraunces; src: url("${font("Fraunces-Light.woff2")}"); font-weight: 300; }
  @font-face { font-family: Plex; src: url("${font("IBMPlexMono-Regular.woff2")}"); }
  body { margin: 0; width: 1200px; height: 630px; background: #f3efe7; color: #15130f; position: relative; overflow: hidden; }
  svg { position: absolute; inset: 0; }
  .label { font: 18px/1 Plex, monospace; letter-spacing: 0.12em; text-transform: uppercase; position: absolute; }
  .role { top: 56px; left: 72px; color: #c8281d; }
  .city { top: 56px; right: 72px; }
  .site { bottom: 56px; left: 72px; }
  h1 { position: absolute; left: 66px; top: 150px; margin: 0; font: 300 168px/0.86 Fraunces, serif; letter-spacing: -0.03em; }
  h1 span { display: block; padding-left: 0.5em; }
  b { color: #c8281d; font-weight: 300; }
</style></head><body>
  <svg width="1200" height="630">${stars}
    <path d="M1110 330 880 490" stroke="#c8281d" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
    <circle cx="1110" cy="330" r="4" fill="#c8281d"/></svg>
  <p class="label role">● Software Developer</p>
  <p class="label city">Mumbai, India</p>
  <h1>Harshit<span>Chauhan<b>.</b></span></h1>
  <p class="label site">harshh.pages.dev</p>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: out });
await browser.close();
console.log(`og-image: wrote ${out}`);
