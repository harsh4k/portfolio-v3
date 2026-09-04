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

// 1. Gate init() behind startPortfolioIntro when #intro-layer is present
const ORIGINAL_INIT =
  'init(){this.initLenis(),xe.init(),this.onResize(),xe.nextTick(this.intro,this)}';
const GATED_INIT =
  'init(){this.initLenis(),xe.init(),this.onResize(),document.getElementById("intro-layer")?window.addEventListener("startPortfolioIntro",()=>this.intro(),{once:!0}):xe.nextTick(this.intro,this)}';

if (js.includes(ORIGINAL_INIT)) {
  js = js.replace(ORIGINAL_INIT, GATED_INIT);
  console.log("patch-intro: site init now waits for startPortfolioIntro when #intro-layer is present");
} else if (js.includes(GATED_INIT)) {
  console.log("patch-intro: site init already gated behind startPortfolioIntro");
}

// 2. Keep Wodniack's overlay teardown at t=5. An earlier cut (3.2s) ran
//    while the home intro still had .js-border at scaleY .025 and a-waves
//    at y 100%, which froze the hero in the collapsed 3-band frame.
const ORIGINAL_INTRO_END =
  'l.call(()=>{i.style.opacity="1",e.remove(),document.documentElement.classList.remove("is-scroll-blocked"),xe.nextTick(()=>{$.emit("updateViewport")})},null,5)';

if (js.includes(ORIGINAL_INTRO_END)) {
  console.log("patch-intro: leaving intro() teardown at 5s (Wodniack)");
} else if (js.includes("null,3.2)")) {
  console.warn("patch-intro: unexpected 3.2s intro teardown still in bundle");
} else if (js.includes('classList.add("intro-done")')) {
  js = js.replace(
    'document.documentElement.classList.remove("is-scroll-blocked"),document.documentElement.classList.add("intro-done"),xe.nextTick(()=>{$.emit("updateViewport")})},null,5)',
    'document.documentElement.classList.remove("is-scroll-blocked"),xe.nextTick(()=>{$.emit("updateViewport")})},null,5)',
  );
  console.log("patch-intro: removed extra intro-done from overlay teardown");
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

// ORIGINAL_QR_ANIM is a substring of PATCHED_QR_ANIM — the patch only prepends
// a guard — so testing for the original still matches an already-patched file.
// Locally that went unnoticed because build.mjs re-syncs a pristine engine from
// references/ first; without references/ (CI, or any clone) every run prepended
// another `i&&`, so the engine grew and builds were not reproducible.
if (js.includes(PATCHED_QR_ANIM)) {
  console.log("patch-intro: QR null check already applied");
} else if (js.includes(ORIGINAL_QR_ANIM)) {
  js = js.replace(ORIGINAL_QR_ANIM, PATCHED_QR_ANIM);
  console.log("patch-intro: QR code null check applied to silence GSAP warnings");
}

// Collapse any `i&&i&&...` left behind by earlier non-idempotent runs.
const doubledQrGuard = "i&&" + PATCHED_QR_ANIM;
while (js.includes(doubledQrGuard)) {
  js = js.replace(doubledQrGuard, PATCHED_QR_ANIM);
  console.log("patch-intro: collapsed a duplicated QR guard from a previous run");
}

// 5. Do not rebuild a-waves mid-intro. Wodniack's home intro animates
//    .js-border (scaleY .025) and a-waves (y 100% → 0). Recreating SVG
//    paths on introend/updateViewport samples those transforms and freezes
//    the collapsed hero. Geometry already refreshes via the site's resize bus.

fs.writeFileSync(enginePath, js, "utf8");
console.log("patch-intro: hoisted.BvNyQ0G_.js updated successfully.");

// build.mjs copies public/ → dist/ *before* this patch and clean-adrien run.
// Refresh the patched engines so Cloudflare/Pages dist matches local public/.
const copyIfPresent = (from, to) => {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
};

const distCopies = [path.resolve(repoRoot, "dist")];
const patchedFiles = [
  ["public/_astro/hoisted.BvNyQ0G_.js", "_astro/hoisted.BvNyQ0G_.js"],
  ["public/assets/index-wQJ6Ws5X.js", "assets/index-wQJ6Ws5X.js"],
  ["src/scripts/bridge.js", "scripts/bridge.js"],
  ["src/scripts/pwa.js", "scripts/pwa.js"],
  ["src/scripts/resume-dock.js", "scripts/resume-dock.js"],
  ["src/scripts/img-media.js", "scripts/img-media.js"],
  ["src/styles/integration.css", "styles/integration.css"],
  ["public/sw.js", "sw.js"],
  ["public/_headers", "_headers"],
];

for (const distDir of distCopies) {
  for (const [fromRel, toRel] of patchedFiles) {
    copyIfPresent(path.resolve(appRoot, fromRel), path.join(distDir, toRel));
  }
}
console.log("patch-intro: patched engines copied into dist/");
