/**
 * patch-intro.mjs — gate the portfolio's site intro behind the 3D hand pull.
 *
 * The GSAP engine plays its site intro (logo lines + border draw) from `init()`,
 * which runs on DOMContentLoaded. With the 3D intro layer stacked on top, that
 * animation runs and finishes underneath an opaque layer — by the time the hand
 * is pulled the transition is long over and the portfolio just appears.
 *
 * This defers `intro()` until bridge.js dispatches `startPortfolioIntro`, which
 * it does once the intro layer has been torn down. When no intro layer is
 * present the engine keeps its original behaviour.
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

let js = fs.readFileSync(enginePath, "utf8");

if (js.includes(GATED_INIT)) {
  console.log("patch-intro: site intro already gated — nothing to do");
} else if (js.includes(ORIGINAL_INIT)) {
  js = js.replace(ORIGINAL_INIT, GATED_INIT);
  fs.writeFileSync(enginePath, js, "utf8");
  console.log("patch-intro: site intro gated behind startPortfolioIntro");
} else {
  console.error(
    "patch-intro: FAILED — init() signature not found in hoisted.BvNyQ0G_.js.\n" +
      "The site intro will play under the 3D layer and never be seen."
  );
  process.exitCode = 1;
}
