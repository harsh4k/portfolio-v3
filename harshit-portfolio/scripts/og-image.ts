/**
 * Renders public/images/og-image.png, the 1200x630 preview card that LinkedIn,
 * X, WhatsApp, Slack and Discord show when the site's link is shared.
 *
 * Run `npm run og-image` after changing the name, role or location in
 * src/data/profile.ts. Uses the site's own fonts and colours, and the
 * Chromium that Playwright already installs for the tests
 * (PLAYWRIGHT_CHROMIUM_PATH overrides it).
 */
import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { profile } from "../src/data/profile.ts";

const root = new URL("../", import.meta.url);
// Inlined: a page made with setContent() is about:blank and cannot load file: URLs.
const font = (file: string) =>
  `data:font/woff2;base64,${readFileSync(new URL(`public/fonts/${file}`, root)).toString("base64")}`;
const out = fileURLToPath(new URL("public/images/og-image.png", root));
const host = new URL("https://harshh.pages.dev").host;

/** What the work is, one line each, under the hero words' right edge. */
const focus = ["Web applications", "3D & WebGL", "Local AI tools"];

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  @font-face { font-family: Display; src: url(${font("Bigger-Display.woff2")}); }
  @font-face { font-family: Mono; src: url(${font("PPFraktionMono-Regular.woff2")}); }
  @font-face { font-family: MonoBold; src: url(${font("PPFraktionMono-Bold.woff2")}); }
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 56px 64px; background: #f40c3f; color: #160000;
    font: 20px/1.4 Mono; letter-spacing: 0.14em; text-transform: uppercase;
  }
  .row { display: flex; justify-content: space-between; align-items: baseline; }
  .name { font-family: MonoBold; }
  .middle { display: flex; justify-content: space-between; align-items: flex-end; }
  .middle ul { list-style: none; padding: 0; text-align: right; line-height: 1.9; }
  h1 {
    font: 400 200px/0.86 Display; letter-spacing: -0.01em; text-transform: uppercase;
  }
  .rule { height: 2px; background: #160000; margin-bottom: 22px; }
</style>
</head>
<body>
  <div class="row"><span class="name">${profile.name}</span><span>Since ${profile.since}</span></div>
  <div class="middle">
    <h1>${profile.heroTitle.join("<br />")}</h1>
    <ul>${focus.map((line) => `<li>${line}</li>`).join("")}</ul>
  </div>
  <div>
    <div class="rule"></div>
    <div class="row"><span>${host}</span><span>${profile.location}</span><span>github.com/${profile.socials[0].handle}</span></div>
  </div>
</body>
</html>`;

const executablePath = process.env["PLAYWRIGHT_CHROMIUM_PATH"];
const browser = await chromium.launch(executablePath ? { executablePath } : {});
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out });
  console.log(`Wrote ${out}`);
} finally {
  await browser.close();
}
