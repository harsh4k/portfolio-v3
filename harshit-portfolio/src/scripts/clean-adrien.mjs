/**
 * clean-adrien.mjs — adapt the 3D intro bundle for use as a portfolio intro.
 *
 * The bundle was authored as a standalone site where pulling the hand opens an
 * about panel. Here the pull is only a doorway into the portfolio, so:
 *
 *   1. showUI() retracts the hand off-screen and announces the pull, instead of
 *      opening the panel. Without this the finger keeps the stretch it had when
 *      released, the palm stays frozen mid-screen, and the hand slides to the
 *      centre where the (never hidden) CLOSE placard becomes visible.
 *   2. the UI background plane never renders — nothing sits behind the panel.
 *   3. the render loop can be stopped — removing the layer detaches the canvas
 *      but leaves the engine rendering every frame for the rest of the session.
 *   4. the hand stays pinned to the screen edge while it is pulled.
 *   5. the document title belongs to this site, not the original author's.
 *
 * Idempotent: safe to re-run after restoring the file from references/.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const repoRoot = path.resolve(appRoot, "..");
const referenceBundlePath = path.resolve(repoRoot, "references", "adrienlamy", "assets", "index-wQJ6Ws5X.js");
const bundlePath = path.resolve(appRoot, "public", "assets", "index-wQJ6Ws5X.js");

if (fs.existsSync(referenceBundlePath)) {
  fs.copyFileSync(referenceBundlePath, bundlePath);
}

let js = fs.readFileSync(bundlePath, "utf8");
const fail = (message) => {
  console.error(`clean-adrien: FAILED — ${message}`);
  process.exitCode = 1;
};

// 1. Hand pull ends the intro instead of opening the about panel.
//    hideUIOutside() hides every hand part and slides the group off the right
//    edge, which also unwinds the finger's drag stretch.
//    Crucial: Do NOT trigger Fe.UI_SHOW, so the Vue about panel / project list texts never open!
const PULLED_SHOW_UI =
  'showUI(){this.hideUIOutside(),window.dispatchEvent(new CustomEvent("intro:pull"))}';
const showUiPattern = /(?<![A-Za-z])showUI\(\)\{[^{}]*\}/;

if (js.includes(PULLED_SHOW_UI)) {
  console.log("clean-adrien: showUI already patched");
} else if (showUiPattern.test(js)) {
  js = js.replace(showUiPattern, PULLED_SHOW_UI);
  console.log("clean-adrien: showUI now retracts the hand and emits intro:pull without opening side panel");
} else {
  fail("showUI() not found");
}

// 2. Keep the UI background plane (class XL) out of the scene entirely.
const XL_ORIGINAL =
  "this.group.add(this.mesh),this.parent.add(this.group),this.isActive=!0}show(){this.isActive=!0,this.isHidden=!1,this.animateShow()}";
const XL_HIDDEN =
  "this.mesh.visible=!1,this.group.add(this.mesh),this.parent.add(this.group),this.isActive=!1}show(){this.isActive=!1,this.isHidden=!0,this.mesh.visible=!1}";

if (js.includes(XL_HIDDEN)) {
  console.log("clean-adrien: UI background already hidden");
} else if (js.includes(XL_ORIGINAL)) {
  js = js.replace(XL_ORIGINAL, XL_HIDDEN);
  console.log("clean-adrien: UI background plane hidden");
} else {
  fail("UI background (class XL) mesh setup not found");
}

// 3. Give the render loop a kill switch.
//    Removing #intro-layer detaches the canvas but does not stop the engine: the
//    RAF manager keeps updating the whole scene and re-rendering into a detached
//    canvas for the rest of the session, roughly doubling per-frame work and
//    making the portfolio's scroll and transitions stutter.
const RAF_ORIGINAL =
  "update(e=0){this.rafId=requestAnimationFrame(this.update.bind(this)),this.isActive&&this.isVisible&&(";
const RAF_STOPPABLE =
  "update(e=0){if(window.__introTornDown){this.isActive=!1;return}" +
  "this.rafId=requestAnimationFrame(this.update.bind(this)),this.isActive&&this.isVisible&&(";

if (js.includes(RAF_STOPPABLE)) {
  console.log("clean-adrien: render loop already stoppable");
} else if (js.includes(RAF_ORIGINAL)) {
  js = js.replace(RAF_ORIGINAL, RAF_STOPPABLE);
  console.log("clean-adrien: render loop can now be stopped via window.__introTornDown");
} else {
  fail("RAF manager update() not found");
}

// 4. Keep the hand pinned to the screen edge while it is being pulled.
//    The hand group drifted left as drag intensity rose, so the fist floated in
//    from the edge instead of staying anchored with only the finger stretching.
const HAND_DRIFT = "const a=YL(.3,.75,this.dragFinger.dragIntensity);i.x+=a*-.25,";
const HAND_PINNED = "const a=YL(.3,.75,this.dragFinger.dragIntensity);";

if (js.includes(HAND_DRIFT)) {
  js = js.replace(HAND_DRIFT, HAND_PINNED);
  console.log("clean-adrien: hand pinned to the edge while dragging");
} else if (js.includes(HAND_PINNED)) {
  console.log("clean-adrien: hand already pinned");
} else {
  fail("hand drift term not found");
}

// 5. Expose hand reset function for runtime initialization
//    The hand may initialize in a 'loaded' state; reset dragIntensity to 0 so it starts fresh.
//    Capture hand controller instance (this) for correct context when called from window
const HAND_RESET_FN = 
  'window.__introHandController=this,window.__resetIntroHand=function(){try{const a=window.__introHandController?.dragFinger;a&&(a.dragIntensity=0)}catch{}}';

if (js.includes('window.__resetIntroHand')) {
  console.log('clean-adrien: hand reset function already exposed');
} else {
  // Inject after dragFinger initialization: this.dragFinger=new GL({...})
  const injectPattern = /(this\.dragFinger=new GL\([^)]+\))/;
  if (injectPattern.test(js)) {
    js = js.replace(injectPattern, '$1,' + HAND_RESET_FN);
    console.log('clean-adrien: hand reset function exposed');
  } else {
    console.warn('clean-adrien: could not find dragFinger init to inject reset');
  }
}

// 6. Treat narrow viewports as mobile even when DevTools keeps a desktop UA.
//    Otherwise the desktop hand + DRAG scribbles appear and the Vue switch never scales in.
const DEVICE_ORIGINAL =
  'this.isMobile=this.device.type==="mobile",this.isTablet=this.device.type==="tablet",this.isDesktop=!this.isMobile&&!this.isTablet';
const DEVICE_NARROW =
  'this.isMobile=this.device.type==="mobile"||window.innerWidth<768,this.isTablet=this.device.type==="tablet"&&window.innerWidth>=768,this.isDesktop=!this.isMobile&&!this.isTablet';

if (js.includes(DEVICE_NARROW)) {
  console.log("clean-adrien: narrow viewports already treated as mobile");
} else if (js.includes(DEVICE_ORIGINAL)) {
  js = js.replace(DEVICE_ORIGINAL, DEVICE_NARROW);
  console.log("clean-adrien: narrow viewports use the mobile intro (switch, no hand)");
} else {
  fail("device flags (class vL) not found");
}

// 7. Replace all references to Adrien / Adrien Lamy with Harshit / Harshit Chauhan
const TITLES = [
  ["Adrien Lamy :D", "Harshit Chauhan :D"],
  ["Adrien Lamy :o", "Harshit Chauhan :o"],
  ["Adrien Lamy x/", "Harshit Chauhan x/"],
  ["Who am I? Adrien Lamy", "Who am I? Harshit Chauhan"],
  ["Sup, I'm Adrien Lamy,", "Sup, I'm Harshit Chauhan,"],
  ["Adrien Lamy", "Harshit Chauhan"],
  ["Adrien", "Harshit"],
  ["adrienlamy.fr", "harshitchauhan.dev"],
  ["adrienlamy", "harshitchauhan"],
];

for (const [from, to] of TITLES) {
  if (js.includes(from)) {
    js = js.replaceAll(from, to);
  }
}

fs.writeFileSync(bundlePath, js, "utf8");
console.log("clean-adrien: Adrien references replaced with Harshit Chauhan and index-wQJ6Ws5X.js written successfully.");
