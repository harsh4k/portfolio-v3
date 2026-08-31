/**
 * patch-intro.mjs — gate the portfolio's site intro behind the 3D hand pull,
 * ensure ScrollTrigger refreshes when scroll unlocks, and fix Work section resize handling.
 *
 * 1. Restores clean hoisted.BvNyQ0G_.js from references/ if available.
 * 2. Defers `intro()` until bridge.js dispatches `startPortfolioIntro`.
 * 3. Patches `intro()` completion to call `ScrollTrigger.refresh()` (j.refresh())
 *    and `lenis.resize()` once scroll lock is removed.
 * 4. Patches Work section controller (`vc`):
 *    - Listens to `updateViewport` event to recompute dimensions & GSAP timeline.
 *    - Ensures `onResize()` always runs and calls `j.refresh()`.
 * 5. Adds null check to `ec.intro()` when querying `.js-qr-code` to prevent
 *    "GSAP target null not found" warnings.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const repoRoot = path.resolve(appRoot, "..");
const referenceJsPath = path.resolve(repoRoot, "references", "wodniack", "_astro", "hoisted.BvNyQ0G_.js");
const enginePath = path.resolve(appRoot, "public", "_astro", "hoisted.BvNyQ0G_.js");

// 0. Restore clean unpatched reference if present
if (fs.existsSync(referenceJsPath)) {
  fs.copyFileSync(referenceJsPath, enginePath);
}

let js = fs.readFileSync(enginePath, "utf8");

// 1. Gate site intro behind startPortfolioIntro event
const ORIGINAL_INIT =
  "init(){this.initLenis(),xe.init(),this.onResize(),xe.nextTick(this.intro,this)}";
const GATED_INIT =
  'init(){this.initLenis(),xe.init(),this.onResize(),document.getElementById("intro-layer")' +
  '?window.addEventListener("startPortfolioIntro",()=>{xe.nextTick(this.intro,this)},{once:!0})' +
  ":xe.nextTick(this.intro,this)}";

if (js.includes(ORIGINAL_INIT)) {
  js = js.replace(ORIGINAL_INIT, GATED_INIT);
  console.log("patch-intro: site intro gated behind startPortfolioIntro");
}

// 2. Patch intro() completion to refresh ScrollTrigger and Lenis when scroll lock is released
const ORIGINAL_INTRO_END =
  'l.call(()=>{i.style.opacity="1",e.remove(),document.documentElement.classList.remove("is-scroll-blocked"),xe.nextTick(()=>{$.emit("updateViewport")})},null,5)';
const PATCHED_INTRO_END =
  'l.call(()=>{i.style.opacity="1",e.remove(),document.documentElement.classList.remove("is-scroll-blocked"),xe.nextTick(()=>{$.emit("updateViewport"),j.refresh(),window.lenis&&window.lenis.resize()})},null,5)';

if (js.includes(ORIGINAL_INTRO_END)) {
  js = js.replace(ORIGINAL_INTRO_END, PATCHED_INTRO_END);
  console.log("patch-intro: ScrollTrigger & Lenis refresh attached to intro unlock");
}

// 3. Patch Work section controller (vc): listen to updateViewport and always recalculate on resize
const ORIGINAL_VC_BIND =
  '$.on("contrastchange",this.setCtxStyle,this),$.on("resize",this.onResize,this),this.el.addEventListener("intersect",this.onIntersect.bind(this),{passive:!0})';
const PATCHED_VC_BIND =
  '$.on("contrastchange",this.setCtxStyle,this),$.on("resize",this.onResize,this),$.on("updateViewport",()=>{this.onResize(!0)},this,!0),this.el.addEventListener("intersect",this.onIntersect.bind(this),{passive:!0})';

if (js.includes(ORIGINAL_VC_BIND)) {
  js = js.replace(ORIGINAL_VC_BIND, PATCHED_VC_BIND);
  console.log("patch-intro: Work controller subscribed to updateViewport");
}

const ORIGINAL_VC_RESIZE =
  'onResize(t){t&&(this.setCtxStyle(),this.setSize(),this.setMask(),this.setPoints(),this.setLetters(),this.setWorks(),this.setTimeline())}';
const PATCHED_VC_RESIZE =
  'onResize(t){this.setCtxStyle(),this.setSize(),this.setMask(),this.setPoints(),this.setLetters(),this.setWorks(),this.setTimeline(),j.refresh()}';

if (js.includes(ORIGINAL_VC_RESIZE)) {
  js = js.replace(ORIGINAL_VC_RESIZE, PATCHED_VC_RESIZE);
  console.log("patch-intro: Work controller onResize made resilient with ScrollTrigger.refresh");
}

// 4. Silence QR null target warning in header animation
const ORIGINAL_QR_ANIM =
  'r.fromTo(i,{"--bg-p":"0%"},{"--bg-p":"100%",duration:1.5,ease:"expo.out"},1.75)';
const PATCHED_QR_ANIM =
  'i&&r.fromTo(i,{"--bg-p":"0%"},{"--bg-p":"100%",duration:1.5,ease:"expo.out"},1.75)';

if (js.includes(ORIGINAL_QR_ANIM)) {
  js = js.replace(ORIGINAL_QR_ANIM, PATCHED_QR_ANIM);
  console.log("patch-intro: QR code null check applied to silence GSAP warnings");
}

fs.writeFileSync(enginePath, js, "utf8");
console.log("patch-intro: hoisted.BvNyQ0G_.js updated successfully.");
