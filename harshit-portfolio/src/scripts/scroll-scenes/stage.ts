import type * as ThreeModule from "three";

/**
 * The shared stage for the full-screen WebGL sections in the scroll page
 * (src/components/ScrollScene.astro). Each section is a tall block with a
 * sticky, screen-high stage inside; scrolling through the block moves its
 * camera from start (progress 0) to end (progress 1).
 *
 * three.js is loaded only when a section comes near the screen, and a section
 * only draws while it is on screen. The scenes draw in the page's colours
 * (--color-primary for the ground, --color-secondary for the wires) and redraw
 * in the same task when the theme switch changes them, so the theme wipe
 * (scripts/theme-wipe.ts) snapshots the new colours. Reduced Motion keeps the
 * scroll-driven camera (the visitor moves it) but drops the easing and any
 * motion of its own. Without WebGL the section keeps its plain HTML content.
 */

export type Three = typeof ThreeModule;

export interface Palette {
  ground: string;
  wire: string;
}

export interface SceneContext {
  three: Three;
  scene: ThreeModule.Scene;
  camera: ThreeModule.PerspectiveCamera;
  section: HTMLElement;
  palette: Palette;
  /** A phone-sized stage: build lighter geometry. */
  compact: boolean;
  still: boolean;
}

export interface SceneHandle {
  /** Places the camera for scroll progress 0–1; `time` is seconds since the stage started. */
  update(progress: number, time: number): void;
  recolor(palette: Palette): void;
  /** True when the scene moves on its own, so it keeps drawing while the scroll is still. */
  animated?: boolean;
}

export type SceneBuilder = (context: SceneContext) => SceneHandle;

const FALLBACK: Palette = { ground: "#f40c3f", wire: "#160000" };

const still = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

function readPalette(el: Element): Palette {
  const css = getComputedStyle(el);
  const read = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
  return { ground: read("--color-primary", FALLBACK.ground), wire: read("--color-secondary", FALLBACK.wire) };
}

/** How far the visitor has scrolled through the section's tall block, 0–1. */
function scrollProgress(section: HTMLElement) {
  const box = section.getBoundingClientRect();
  const travel = box.height - window.innerHeight;
  if (travel <= 0) return 0;
  return Math.min(1, Math.max(0, -box.top / travel));
}

let threeModule: Promise<Three> | undefined;
const loadThree = () => (threeModule ??= import("three"));

async function start(section: HTMLElement, host: HTMLElement, build: SceneBuilder) {
  const three = await loadThree();

  let renderer: ThreeModule.WebGLRenderer;
  try {
    renderer = new three.WebGLRenderer({ antialias: true, powerPreference: "low-power" });
  } catch {
    section.dataset["s3d"] = "off";
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = three.SRGBColorSpace;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.append(renderer.domElement);

  const palette = readPalette(section);
  const scene = new three.Scene();
  const fog = new three.Fog(palette.ground, 10, 46);
  scene.fog = fog;
  const camera = new three.PerspectiveCamera(55, 1, 0.1, 200);
  const handle = build({
    three,
    scene,
    camera,
    section,
    palette,
    compact: host.clientWidth < 700,
    still: still(),
  });

  const paint = (next: Palette) => {
    renderer.setClearColor(next.ground, 1);
    fog.color.set(next.ground);
    handle.recolor(next);
  };
  paint(palette);

  // The step the camera is passing: step i owns the slice of progress around (i + 0.5) / count.
  const steps = [...section.querySelectorAll<HTMLElement>(".js-s3d-step")];
  const ticks = [...section.querySelectorAll<HTMLElement>(".js-s3d-tick")];
  let active = -1;
  const mark = (progress: number) => {
    const next = Math.min(steps.length - 1, Math.floor(progress * steps.length));
    if (next === active) return;
    active = next;
    [steps, ticks].forEach((list) => list.forEach((el, index) => el.toggleAttribute("data-active", index === next)));
  };

  let shown = scrollProgress(section);
  const began = performance.now();
  const draw = (now: number) => {
    const target = scrollProgress(section);
    // Ease towards the scroll position so wheel steps glide; Reduced Motion follows it exactly.
    shown = still() ? target : shown + (target - shown) * 0.14;
    if (Math.abs(target - shown) < 0.0005) shown = target;
    handle.update(shown, still() ? 0 : (now - began) / 1000);
    mark(shown);
    renderer.render(scene, camera);
    return shown !== target;
  };

  const resize = () => {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Keep at least ~50° across on a tall phone screen, where a fixed vertical lens crops the sides.
    const across = 2 * Math.atan(Math.tan((25 * Math.PI) / 180) / camera.aspect);
    camera.fov = Math.min(80, Math.max(55, (across * 180) / Math.PI));
    camera.updateProjectionMatrix();
    draw(performance.now());
  };
  new ResizeObserver(resize).observe(host);

  // Draw only while on screen, and only while something is moving.
  let visible = false;
  let frame = 0;
  const loop = (now: number) => {
    frame = 0;
    const moving = draw(now);
    if (visible && (moving || (handle.animated && !still()))) frame = requestAnimationFrame(loop);
  };
  const wake = () => {
    if (visible && !frame) frame = requestAnimationFrame(loop);
  };
  new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting);
    if (visible) wake();
  }).observe(section);
  window.addEventListener("scroll", wake, { passive: true });

  // The theme switch swaps the colour variables through a class on <html>.
  new MutationObserver(() => {
    paint(readPalette(section));
    draw(performance.now());
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  resize();
}

const webgl = (() => {
  try {
    return Boolean(document.createElement("canvas").getContext("webgl2"));
  } catch {
    return false;
  }
})();

/**
 * Lays the section out as a tall block with a sticky stage at once, so the
 * page doesn't change length under the visitor later, and starts the stage
 * once it comes within a screen of the viewport.
 */
export function mountScrollScene(section: HTMLElement, build: SceneBuilder) {
  const host = section.querySelector<HTMLElement>(".js-s3d-canvas");
  if (!host || !webgl) return;
  section.dataset["s3d"] = "live";
  const near = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      near.disconnect();
      void start(section, host, build);
    },
    { rootMargin: "100% 0px" },
  );
  near.observe(section);
}

/**
 * A text label drawn into a canvas texture, as a sprite that always faces the
 * camera. `height` is its height in world units; the width follows the text.
 */
export function makeLabel(three: Three, text: string, height: number, font = '700 96px "Bigger Display", sans-serif') {
  const canvas = document.createElement("canvas");
  const texture = new three.CanvasTexture(canvas);
  texture.colorSpace = three.SRGBColorSpace;
  const material = new three.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  const sprite = new three.Sprite(material);

  let color = "#000";
  const paint = () => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.font = font;
    const width = Math.ceil(ctx.measureText(text).width) + 24;
    canvas.width = width;
    canvas.height = 128;
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 2, 68);
    texture.needsUpdate = true;
    sprite.scale.set((height * width) / 128, height, 1);
  };

  // The page's fonts may still be loading; draw again once they are in.
  void document.fonts.load(font, text).then(paint, () => undefined);

  return {
    sprite,
    setColor(next: string) {
      color = next;
      paint();
    },
  };
}
