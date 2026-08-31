/**
 * patch-intro.mjs — gate the portfolio's site intro behind the 3D hand pull,
 * and silence benign GSAP warnings for elements removed in Harshit's branding.
 *
 * 1. Defers `intro()` until bridge.js dispatches `startPortfolioIntro`, which
 *    it does once the intro layer has been torn down. When no intro layer is
 *    present the engine keeps its original behaviour.
 * 2. Adds null check to `ec.intro()` when querying `.js-qr-code` to prevent
 *    "GSAP target null not found" warnings on startup.
 *
 * Idempotent: safe to re-run after restoring the file from references/.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const enginePath = path.resolve(appRoot, "public", "_astro", "hoisted.BvNyQ0G_.js");

const ORIGINAL_INIT =
  "init(){this.initLenis(),xe.init(),this.onResize(),xe.nextTick(this.intro,this)}";
const GATED_INIT =
  'init(){this.initLenis(),xe.init(),this.onResize(),document.getElementById("intro-layer")' +
  '?window.addEventListener("startPortfolioIntro",()=>{xe.nextTick(this.intro,this)},{once:!0})' +
  ":xe.nextTick(this.intro,this)}";

const ORIGINAL_QR_ANIM =
  'r.fromTo(i,{"--bg-p":"0%"},{"--bg-p":"100%",duration:1.5,ease:"expo.out"},1.75)';
const PATCHED_QR_ANIM =
  'i&&r.fromTo(i,{"--bg-p":"0%"},{"--bg-p":"100%",duration:1.5,ease:"expo.out"},1.75)';

let js = fs.readFileSync(enginePath, "utf8");
let modified = false;

// 1. Gate intro
if (js.includes(GATED_INIT)) {
  console.log("patch-intro: site intro already gated — nothing to do");
} else if (js.includes(ORIGINAL_INIT)) {
  js = js.replace(ORIGINAL_INIT, GATED_INIT);
  modified = true;
  console.log("patch-intro: site intro gated behind startPortfolioIntro");
} else {
  console.error(
    "patch-intro: FAILED — init() signature not found in hoisted.BvNyQ0G_.js.\n" +
      "The site intro will play under the 3D layer and never be seen."
  );
  process.exitCode = 1;
}

// 2. Silence QR null target warning
if (js.includes(PATCHED_QR_ANIM)) {
  console.log("patch-intro: QR code null check already applied");
} else if (js.includes(ORIGINAL_QR_ANIM)) {
  js = js.replace(ORIGINAL_QR_ANIM, PATCHED_QR_ANIM);
  modified = true;
  console.log("patch-intro: QR code null check applied to silence GSAP warnings");
} else {
  console.log("patch-intro: QR anim signature not found (may already be patched)");
}

if (modified) {
  fs.writeFileSync(enginePath, js, "utf8");
}
