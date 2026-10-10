/**
 * The hero's stardust scene, where the wave lines used to be. Adapted from
 * the "Stardust Stage Preloader" React component with its loading gate taken
 * out, so it is a scene instead of a screen in front of the page.
 *
 * A star burns in a stippled cosmos while a dotted orbit fills around it.
 * When the orbit closes, every dot takes flight: the core folds into a moon,
 * the orbit spreads into its halo, the warp lines trace a proscenium arch and
 * clouds and curtains rise into a moonlit stage. Pressing the scene rushes the
 * star while it charges and rewinds the stage back into the cosmos once it is
 * up. The pointer parts the dust and leans the camera.
 *
 * Plain TypeScript, no framework: an Astro island would need an inline script,
 * which the site's CSP (public/_headers) blocks. Every texture is painted
 * procedurally onto canvas, seeded so it comes out the same every time, in the
 * page's own --color-primary (the stage) and --color-secondary (the ink), and
 * repainted when the theme switch changes them. The dots live on one canvas
 * driven by one requestAnimationFrame loop that only runs while the scene is
 * on screen; everything else moves with the .ssp- styles in StardustStage.astro.
 */

interface Palette {
  stage: string;
  ink: string;
}

type Phase = "load" | "morph" | "reveal";

const ACTS = ["Gathering starlight", "Charting the orbit", "Waking the moon", "Raising the curtain"];

const DURATION_MS = 5200;
const RUSH_MS = 700;
const MORPH_MS = 3000;
const REWIND_MS = 800;

// A four-point star in a 2 × 2 box centred on the origin.
const SPARK = "M0-1C.07-.24.24-.07 1 0 .24.07.07.24 0 1-.07.24-.24.07-1 0-.24-.07-.07-.24 0-1Z";

const SVG_NS = "http://www.w3.org/2000/svg";

const clamp01 = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x);

// Seeded so every visit paints the same sky.
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Speed lines streaming out of the star, in a 200 × 200 box around it.
interface Ray {
  ang: number;
  from: number;
  to: number;
  dash: number;
  dur: number;
}
const RAYS: Ray[] = (() => {
  const out: Ray[] = [];
  let s = 9;
  const r = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  for (let i = 0; i < 44; i++) {
    const ang = (i / 44) * Math.PI * 2 + (r() - 0.5) * 0.08;
    out.push({ ang, from: 22 + r() * 6, to: 52 + r() * 48, dash: 0.6 + r() * 1.6, dur: 0.6 + r() * 1.2 });
  }
  return out;
})();

// Pixel planets around the star: [x, y in units of the short side, size, texture, float s].
const PLANETS = [
  [-0.66, 0.3, 0.2, 0, 9],
  [0.78, -0.42, 0.4, 1, 13],
  [-0.44, -0.34, 0.075, 2, 7],
  [0.42, 0.32, 0.11, 3, 11],
] as const;

// Sparkles over the stage: [x %, y % of the stage box, size, delay s].
const STAGE_SPARKS = [
  [36, 14, 0.026, 0],
  [67, 25, 0.018, 1.4],
  [57, 9, 0.014, 2.3],
  [28, 31, 0.012, 0.7],
  [74, 12, 0.012, 3.1],
] as const;

// Sky sparkles, in both acts: [x %, y % of the root, size, delay s].
const SKY_SPARKS = [
  [9, 18, 0.03, 0.4],
  [88, 64, 0.036, 1.8],
  [16, 78, 0.022, 2.9],
  [93, 14, 0.018, 1.1],
] as const;

// Where the painted pieces sit in the stage box, as fractions of its width
// and height: [left, top-from-floor, width, height, rise delay s, drift s].
const CLOUDS = [
  [0.02, 0.6, 0.46, 0.6, 0.75, 13],
  [0.52, 0.6, 0.46, 0.6, 0.9, 15],
  [0.14, 0.3, 0.72, 0.3, 0.5, 17],
  [0.06, 0.13, 0.88, 0.15, 1.1, 11],
] as const;
const CURTAIN_W = 0.15;
const FIGURE_H = 0.16;

// ---- timeline -------------------------------------------------------------------

// Surges and stalls like a real load instead of a linear tween. [time, progress] knots.
const KNOTS = [
  [0, 0],
  [0.2, 0.27],
  [0.31, 0.3],
  [0.58, 0.66],
  [0.7, 0.7],
  [1, 1],
] as const;

function simulated(t: number) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  for (let i = 0; i < KNOTS.length - 1; i++) {
    const a = KNOTS[i];
    const b = KNOTS[i + 1];
    if (a && b && t <= b[0]) {
      const local = (t - a[0]) / (b[0] - a[0]);
      return a[1] + (b[1] - a[1]) * (1 - Math.pow(1 - local, 3));
    }
  }
  return 1;
}

function ease(t: number) {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

// Where one dot is in its flight at global morph progress m. Each dot waits
// out its own delay (at most 0.4), then flies for the remaining 0.6.
const morphAt = (m: number, delay: number) => clamp01((m - delay) / 0.6);

// How lit the orbit dot at position a (0–1, clockwise from twelve) is at progress p.
// Overshoots by one ramp width, so the last dot is fully lit at exactly 100%.
const ringLit = (a: number, p: number) => clamp01((p * (31 / 30) - a) * 30);

// The stage box and everything placed in it, in root pixels.
function layout(w: number, h: number) {
  const a = Math.min(1.45, Math.max(0.9, w / Math.max(1, h)));
  const H = Math.min(h * 0.74, (w * 0.94) / a);
  const W = H * a;
  const x0 = (w - W) / 2;
  const y0 = (h - H) / 2 - h * 0.015;
  return {
    w,
    h,
    u: Math.min(w, h),
    cx: w / 2,
    cy: h * 0.47,
    x0,
    y0,
    W,
    H,
    left: x0 + W * 0.075,
    right: x0 + W * 0.925,
    spring: y0 + H * 0.36,
    crown: y0 + H * 0.02,
    floor: y0 + H * 0.86,
    moonX: w / 2,
    moonY: y0 + H * 0.22,
    moonR: Math.min(W, H) * 0.066,
  };
}
type Stage = ReturnType<typeof layout>;

// A point s (0–1) along the proscenium: up the left column, over the arch,
// down the right column. inset pulls the line inward, for the inner moulding.
function archPoint(st: Stage, s: number, inset: number) {
  const left = st.left + inset;
  const right = st.right - inset;
  const rx = (right - left) / 2;
  const ry = st.spring - st.crown - inset;
  const cx = left + rx;
  const col = st.floor - st.spring;
  const arc = (Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)))) / 2;
  const d = clamp01(s) * (col * 2 + arc);
  if (d <= col) return { x: left, y: st.floor - d };
  if (d <= col + arc) {
    const phi = Math.PI - ((d - col) / arc) * Math.PI;
    return { x: cx + rx * Math.cos(phi), y: st.spring - ry * Math.sin(phi) };
  }
  return { x: right, y: st.spring + (d - col - arc) };
}

// ---- procedural textures --------------------------------------------------------

interface Textures {
  stars: string;
  nebula: string;
  planets: string[];
  moon: string;
  clouds: string[];
  curtain: string;
  figure: string;
  rain: string;
  grain: string;
}

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

function ctx(c: HTMLCanvasElement) {
  const g = c.getContext("2d", { willReadFrequently: true });
  if (!g) throw new Error("no 2d context");
  return g;
}

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const bayer = (x: number, y: number) => BAYER[(y % 4) * 4 + (x % 4)] ?? 0.5;

// Smooth value noise on a wrapping grid, summed over octaves.
function makeNoise(seed: number) {
  const rnd = rng(seed);
  const N = 64;
  const grid = Array.from({ length: N * N }, rnd);
  const at = (x: number, y: number) => grid[(((y % N) + N) % N) * N + (((x % N) + N) % N)] ?? 0;
  const smooth = (t: number) => t * t * (3 - 2 * t);
  const value = (x: number, y: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = smooth(x - xi);
    const fy = smooth(y - yi);
    const a = at(xi, yi) + (at(xi + 1, yi) - at(xi, yi)) * fx;
    const b = at(xi, yi + 1) + (at(xi + 1, yi + 1) - at(xi, yi + 1)) * fx;
    return a + (b - a) * fy;
  };
  return (x: number, y: number) => {
    let sum = 0;
    let amp = 0.5;
    let f = 1;
    for (let o = 0; o < 5; o++) {
      sum += value(x * f, y * f) * amp;
      f *= 2;
      amp *= 0.5;
    }
    return sum / 0.97;
  };
}

// Scatter dots wherever a shape is, more of them where tone is high. The
// shape is drawn in white onto a mask; tone gets (x, y, coverage), all 0–1.
function stipple(
  w: number,
  h: number,
  shape: (g: CanvasRenderingContext2D) => void,
  tone: (x: number, y: number, a: number) => number,
  ink: string,
  density: number,
  seed: number,
  under?: string,
) {
  const mask = canvas(w, h);
  const mg = ctx(mask);
  shape(mg);
  const alpha = mg.getImageData(0, 0, w, h).data;
  const c = canvas(w, h);
  const g = ctx(c);
  if (under) {
    // a solid backing so the shape hides the stars behind it
    g.drawImage(mask, 0, 0);
    g.globalCompositeOperation = "source-in";
    g.fillStyle = under;
    g.fillRect(0, 0, w, h);
    g.globalCompositeOperation = "source-over";
  }
  const rnd = rng(seed);
  g.fillStyle = ink;
  const count = Math.round(w * h * density);
  for (let k = 0; k < count; k++) {
    const x = rnd() * w;
    const y = rnd() * h;
    const a = (alpha[((y | 0) * w + (x | 0)) * 4 + 3] ?? 0) / 255;
    const b = rnd();
    if (a <= 0.004) continue;
    if (b > tone(x / w, y / h, a)) continue;
    g.globalAlpha = 0.5 + rnd() * 0.5;
    const s = rnd() > 0.93 ? 1.6 : 1;
    g.fillRect(x, y, s, s);
  }
  g.globalAlpha = 1;
  return c;
}

function paintStars(ink: string) {
  const n = 512;
  const c = canvas(n, n);
  const g = ctx(c);
  const rnd = rng(3);
  g.fillStyle = ink;
  for (let k = 0; k < 520; k++) {
    const b = rnd();
    g.globalAlpha = 0.15 + b * b * 0.85;
    const s = b > 0.985 ? 2 : b > 0.9 ? 1.4 : 1;
    const x = rnd() * n;
    const y = rnd() * n;
    g.fillRect(x, y, s, s);
    if (b > 0.993) {
      g.globalAlpha = 0.5;
      g.fillRect(x - 4, y + 0.5, 9, 1);
      g.fillRect(x + 0.5, y - 4, 1, 9);
    }
  }
  return c;
}

// A pixel-art nebula: fractal noise, ordered-dithered into four levels.
function paintNebula(ink: string) {
  const w = 320;
  const h = 180;
  const c = canvas(w, h);
  const g = ctx(c);
  const noise = makeNoise(19);
  const warp = makeNoise(41);
  const rnd = rng(23);
  g.fillStyle = ink;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const nx = x / 60;
      const ny = y / 60;
      const q = noise(nx + warp(nx, ny) * 1.6, ny + warp(nx + 5, ny + 3) * 1.6);
      // a diagonal river of cloud, thinning toward the corners
      const band = 1 - Math.min(1, Math.abs(y / h - 0.5 - (x / w - 0.5) * 0.55) * 2.3);
      const v = clamp01((q - 0.42) * 2.4 * (0.35 + band * 0.9));
      const level = Math.min(3, Math.floor(v * 3 + bayer(x, y)));
      if (level <= 0) continue;
      g.globalAlpha = level === 1 ? 0.22 : level === 2 ? 0.5 : 0.85;
      g.fillRect(x, y, 1, 1);
    }
  }
  // pixel stars and a few plus-shaped glints
  for (let k = 0; k < 110; k++) {
    const x = Math.floor(rnd() * w);
    const y = Math.floor(rnd() * h);
    const b = rnd();
    g.globalAlpha = 0.4 + b * 0.6;
    g.fillRect(x, y, 1, 1);
    if (b > 0.95) {
      g.globalAlpha = 0.55;
      g.fillRect(x - 2, y, 5, 1);
      g.fillRect(x, y - 2, 1, 5);
    }
  }
  g.globalAlpha = 1;
  return c;
}

// A dithered pixel planet. kind 0: cratered, 1: banded giant, 2: plain, 3: ringed.
function paintPlanet(kind: number, ink: string, stage: string) {
  const n = kind === 1 ? 72 : kind === 0 ? 44 : 26;
  const pad = kind === 3 ? Math.round(n * 0.45) : 0;
  const W = n + pad * 2;
  const c = canvas(W, W);
  const g = ctx(c);
  const rnd = rng(61 + kind * 13);
  const r = n / 2 - 0.5;
  const craters = Array.from({ length: kind === 0 ? 7 : kind === 2 ? 2 : 0 }, () => ({
    x: (rnd() - 0.5) * 1.3,
    y: (rnd() - 0.5) * 1.3,
    r: 0.1 + rnd() * 0.16,
  }));
  const L = [-0.55, -0.5, 0.67] as const;
  const ring = (x: number, y: number) => {
    // a tilted ring around kind 3, back half hidden behind the disc
    const dx = (x - W / 2) / (n * 0.95);
    const dy = (y - W / 2) / (n * 0.95);
    const ry = dy * Math.cos(0.3) - dx * Math.sin(0.3);
    const rx = dx * Math.cos(0.3) + dy * Math.sin(0.3);
    const e = Math.hypot(rx, ry * 3.6);
    return e > 0.78 && e < 0.98 ? (ry > 0 ? 1 : -1) : 0;
  };
  for (let y = 0; y < W; y++) {
    for (let x = 0; x < W; x++) {
      const nx = (x - W / 2 + 0.5) / r;
      const ny = (y - W / 2 + 0.5) / r;
      const d2 = nx * nx + ny * ny;
      const rg = kind === 3 ? ring(x + 0.5, y + 0.5) : 0;
      const th = bayer(x, y);
      if (d2 > 1) {
        if (rg) {
          g.globalAlpha = 1;
          g.fillStyle = ink;
          if (th < 0.7) g.fillRect(x, y, 1, 1);
        }
        continue;
      }
      const nz = Math.sqrt(1 - d2);
      let lam = Math.max(0, nx * L[0] + ny * L[1] + nz * L[2]);
      if (kind === 1) lam *= 0.75 + 0.25 * Math.sin(ny * 11 + Math.sin(nx * 3) * 1.4);
      for (const cr of craters) {
        const cd = Math.hypot(nx - cr.x, ny - cr.y);
        if (cd < cr.r) lam *= cd < cr.r * 0.75 ? 0.45 : 1.25;
      }
      g.globalAlpha = 1;
      g.fillStyle = stage;
      g.fillRect(x, y, 1, 1);
      if (rg > 0) {
        g.fillStyle = ink;
        if (th < 0.7) g.fillRect(x, y, 1, 1);
        continue;
      }
      const v = Math.min(1, lam * 1.15);
      if (v > th) {
        g.fillStyle = ink;
        g.globalAlpha = v > 0.8 ? 1 : 0.8;
        g.fillRect(x, y, 1, 1);
      }
    }
  }
  g.globalAlpha = 1;
  return c;
}

function paintMoon(n: number, ink: string, stage: string) {
  const rnd = rng(83);
  const craters = Array.from({ length: 16 }, () => ({
    x: (rnd() - 0.5) * 1.5,
    y: (rnd() - 0.5) * 1.5,
    r: 0.05 + rnd() * rnd() * 0.22,
  }));
  return stipple(
    n,
    n,
    (g) => {
      g.fillStyle = "#fff";
      g.beginPath();
      g.arc(n / 2, n / 2, n / 2 - 2, 0, Math.PI * 2);
      g.fill();
    },
    (x, y) => {
      const nx = x * 2 - 1;
      const ny = y * 2 - 1;
      const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
      let lam = Math.max(0, -0.42 * nx - 0.46 * ny + 0.78 * nz);
      for (const cr of craters) {
        const d = Math.hypot(nx - cr.x, ny - cr.y) / cr.r;
        if (d < 1) lam *= d < 0.8 ? 0.6 : 1.15;
      }
      return 0.06 + 0.94 * Math.pow(lam, 1.15);
    },
    ink,
    0.95,
    84,
    stage,
  );
}

// A cumulus bank: overlapping puffs, rim-lit from above, stippled.
// profile maps x (0–1) to puff size, so the bank rises where you want it.
function paintCloud(seed: number, w: number, h: number, profile: (x: number) => number, ink: string, stage: string) {
  const rnd = rng(seed);
  const puffs: { x: number; y: number; r: number }[] = [];
  for (let k = 0; k < 46; k++) {
    const fx = rnd();
    // puffs shrink toward the canvas edges, so the bank tapers instead of clipping
    const r = Math.min(
      w * 0.18,
      fx * w * 0.9,
      (1 - fx) * w * 0.9,
      (0.2 + 0.8 * profile(fx)) * h * (0.14 + rnd() * 0.14),
    );
    if (r < 4) continue;
    const lift = profile(fx) * (h - r * 2.7) * Math.pow(rnd(), 0.8);
    puffs.push({ x: fx * w, y: Math.max(r * 1.04, h - r * 0.75 - lift), r });
  }
  puffs.sort((a, b) => a.y - b.y);
  const light = canvas(w, h);
  const lg = ctx(light);
  for (const p of puffs) {
    const body = lg.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    body.addColorStop(0, "rgba(34,34,34,1)");
    body.addColorStop(0.74, "rgba(30,30,30,1)");
    body.addColorStop(1, "rgba(30,30,30,0)");
    lg.fillStyle = body;
    lg.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
    lg.save();
    lg.beginPath();
    lg.arc(p.x, p.y, p.r * 0.98, 0, Math.PI * 2);
    lg.clip();
    const hi = lg.createRadialGradient(
      p.x - p.r * 0.2,
      p.y - p.r * 0.6,
      0,
      p.x - p.r * 0.2,
      p.y - p.r * 0.6,
      p.r * 0.9,
    );
    hi.addColorStop(0, "rgba(255,255,255,1)");
    hi.addColorStop(0.45, "rgba(230,230,230,0.6)");
    hi.addColorStop(1, "rgba(255,255,255,0)");
    lg.fillStyle = hi;
    lg.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
    lg.restore();
  }
  const lum = lg.getImageData(0, 0, w, h).data;
  return stipple(
    w,
    h,
    (g) => g.drawImage(light, 0, 0),
    (x, y, a) => {
      const i = (Math.min(h - 1, (y * h) | 0) * w + Math.min(w - 1, (x * w) | 0)) * 4;
      const l = (lum[i] ?? 0) / 255;
      // dense where the light catches, a wisp of dots along the soft edges
      return Math.min(1, Math.pow(l, 2) * 1.5 * a + a * (1 - a) * 0.7 + 0.02);
    },
    ink,
    0.85,
    seed + 1,
    stage,
  );
}

// One stage curtain, hanging from the left; the right one is this mirrored.
function paintCurtain(w: number, h: number, ink: string, stage: string) {
  return stipple(
    w,
    h,
    (g) => {
      g.fillStyle = "#fff";
      g.beginPath();
      g.moveTo(0, 0);
      g.lineTo(w * 0.9, 0);
      g.bezierCurveTo(w * 0.84, h * 0.45, w * 0.72, h * 0.8, w * 0.98, h * 0.965);
      g.quadraticCurveTo(w * 0.72, h * 1.0, w * 0.46, h * 0.975);
      g.quadraticCurveTo(w * 0.22, h * 0.995, 0, h * 0.97);
      g.closePath();
      g.fill();
    },
    (x, y) => {
      const gx = x / (0.55 + 0.45 * Math.min(1, y * 1.6));
      const fold = 0.5 + 0.5 * Math.sin(gx * Math.PI * 2 * 2.6 + Math.sin(y * 5) * 0.5);
      const edge = Math.max(0, 1 - Math.abs(x - (0.86 - y * 0.12)) * 6);
      const top = Math.min(1, y * 4);
      return (0.08 + 0.62 * fold * fold + 0.3 * edge) * (0.45 + 0.55 * top);
    },
    ink,
    1.05,
    211,
    stage,
  );
}

// A lone figure in a long coat, seen from behind, lit from above.
function paintFigure(w: number, h: number, ink: string, stage: string) {
  return stipple(
    w,
    h,
    (g) => {
      g.fillStyle = "#fff";
      g.beginPath();
      g.ellipse(w * 0.5, h * 0.15, w * 0.15, h * 0.085, 0, 0, Math.PI * 2);
      g.fill();
      g.beginPath();
      g.moveTo(w * 0.33, h * 0.25);
      g.quadraticCurveTo(w * 0.5, h * 0.215, w * 0.67, h * 0.25);
      g.quadraticCurveTo(w * 0.8, h * 0.28, w * 0.78, h * 0.42);
      g.lineTo(w * 0.86, h * 0.84);
      g.quadraticCurveTo(w * 0.5, h * 0.88, w * 0.14, h * 0.84);
      g.lineTo(w * 0.22, h * 0.42);
      g.quadraticCurveTo(w * 0.2, h * 0.28, w * 0.33, h * 0.25);
      g.fill();
      g.fillRect(w * 0.38, h * 0.83, w * 0.09, h * 0.15);
      g.fillRect(w * 0.53, h * 0.83, w * 0.09, h * 0.15);
      // hands held out toward the footlights
      g.beginPath();
      g.ellipse(w * 0.17, h * 0.47, w * 0.055, h * 0.03, -0.5, 0, Math.PI * 2);
      g.ellipse(w * 0.83, h * 0.47, w * 0.055, h * 0.03, 0.5, 0, Math.PI * 2);
      g.fill();
    },
    (x, y) => {
      const rim = Math.max(0, 1 - Math.abs(x - 0.5) * 2.4);
      return 0.6 + 0.4 * (1 - y) * (0.5 + rim * 0.5);
    },
    ink,
    2.2,
    307,
    stage,
  );
}

function paintRain(ink: string) {
  const n = 256;
  const c = canvas(n, n);
  const g = ctx(c);
  const rnd = rng(97);
  g.fillStyle = ink;
  for (let k = 0; k < 90; k++) {
    g.globalAlpha = 0.08 + rnd() * 0.3;
    const len = 6 + rnd() * 26;
    g.fillRect(Math.floor(rnd() * n), rnd() * n, 1, len);
  }
  return c;
}

function paintGrain() {
  const n = 160;
  const c = canvas(n, n);
  const g = ctx(c);
  const img = g.createImageData(n, n);
  const rnd = rng(7);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.round(rnd() * 255);
    img.data[i] = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = 30;
  }
  g.putImageData(img, 0, 0);
  return c;
}

// Synchronous on purpose: toBlob is scheduled into idle time, which a page
// this busy rarely has. PNG keeps the single-pixel dots crisp.
const toUrl = (c: HTMLCanvasElement) => c.toDataURL("image/png");

// Each texture is painted at the size it is shown.
function paintAll(pal: Palette, st: Stage, q: number): Textures {
  const { ink, stage } = pal;
  const px = (v: number) => Math.max(8, Math.round(v * q));
  const profiles = [
    (x: number) => Math.pow(1 - Math.abs(x - 0.22) / 0.78, 1.6),
    (x: number) => Math.pow(1 - Math.abs(x - 0.78) / 0.78, 1.6),
    (x: number) => 0.35 + 0.65 * Math.sin(x * Math.PI),
    () => 0.4,
  ];
  const figH = st.H * FIGURE_H;
  return {
    stars: toUrl(paintStars(ink)),
    nebula: toUrl(paintNebula(ink)),
    planets: [0, 1, 2, 3].map((k) => toUrl(paintPlanet(k, ink, stage))),
    moon: toUrl(paintMoon(px(st.moonR * 2), ink, stage)),
    clouds: CLOUDS.map(([, , w, h], k) =>
      toUrl(paintCloud(401 + k * 31, px(st.W * w), px(st.H * h), profiles[k] ?? (() => 0.4), ink, stage)),
    ),
    curtain: toUrl(paintCurtain(px(st.W * CURTAIN_W), px(st.floor - st.spring + st.H * 0.02), ink, stage)),
    figure: toUrl(paintFigure(px(figH / 2), px(figH), ink, stage)),
    rain: toUrl(paintRain(ink)),
    grain: toUrl(paintGrain()),
  };
}

// ---- the dot field --------------------------------------------------------------
// Every dot has a place in the cosmos (computed per frame, since it moves) and
// a place on the stage (computed here, once per size). Roles:
// 0 core → moon, 1 orbit → halo, 2 warp line → arch, 3 star → floor or sky.

interface Dot {
  role: 0 | 1 | 2 | 3;
  r1: number;
  r2: number;
  r3: number;
  r4: number;
  /** Place on the stage, and alpha there. */
  bx: number;
  by: number;
  ba: number;
  delay: number;
  twist: number;
  size: number;
  depth: number;
  /** Current push from the pointer. */
  ox: number;
  oy: number;
}

function buildField(st: Stage, n: number): Dot[] {
  const rnd = rng(5);
  const L = [-0.42, -0.46, 0.78] as const;
  const inner = st.W * 0.028;
  const dots: Dot[] = [];
  for (let i = 0; i < n; i++) {
    const q = i / n;
    const role = q < 0.22 ? 0 : q < 0.46 ? 1 : q < 0.78 ? 2 : 3;
    const r1 = rnd();
    const r2 = rnd();
    const r3 = rnd();
    const r4 = rnd();
    let x;
    let y;
    let a;
    let delay;
    if (role === 0) {
      const rr = st.moonR * Math.sqrt(r1) * 0.97;
      const ang = r2 * Math.PI * 2;
      const nx = (Math.cos(ang) * rr) / st.moonR;
      const ny = (Math.sin(ang) * rr) / st.moonR;
      const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
      const lam = Math.max(0, nx * L[0] + ny * L[1] + nz * L[2]);
      x = st.moonX + nx * st.moonR;
      y = st.moonY + ny * st.moonR;
      a = 0.12 + 0.88 * lam;
      delay = r4 * 0.15;
    } else if (role === 1) {
      const g = r1 + r4 - 1;
      const rad = r3 < 0.55 ? st.moonR * (1.5 + g * 0.16) : st.moonR * (2.15 + g * 0.3);
      x = st.moonX + Math.cos(r2 * Math.PI * 2) * rad;
      y = st.moonY + Math.sin(r2 * Math.PI * 2) * rad;
      a = r3 < 0.55 ? 0.55 : 0.3;
      delay = 0.08 + r4 * 0.2;
    } else if (role === 2) {
      const pt = archPoint(st, r1, r2 < 0.55 ? 0 : inner);
      x = pt.x + (r3 - 0.5) * 2.2;
      y = pt.y + (r4 - 0.5) * 2.2;
      a = 0.55 + 0.45 * r3;
      // the arch is traced from the left column round to the right
      delay = 0.12 + r1 * 0.28;
    } else if (r3 < 0.5) {
      const spread = (st.right - st.left) * 0.5;
      const dx = (r1 - 0.5) * 2;
      x = st.cx + dx * spread;
      y = st.floor + (r2 - 0.35) * st.H * 0.025 * (0.4 + Math.abs(dx));
      a = 0.15 + 0.7 * Math.pow(1 - Math.abs(dx), 1.5);
      delay = 0.2 + r4 * 0.2;
    } else {
      x = r1 * st.w;
      y = r2 * st.h;
      a = 0.1 + 0.55 * Math.pow(r4, 3);
      delay = r4 * 0.4;
    }
    dots.push({
      role,
      r1,
      r2,
      r3,
      r4,
      bx: x,
      by: y,
      ba: a,
      delay,
      twist: (r3 - 0.5) * 0.7,
      size: 0.9 + Math.pow(r4, 5) * 1.3,
      depth: st.u * (role === 3 ? 0.012 + r4 * 0.014 : 0.008),
      ox: 0,
      oy: 0,
    });
  }
  return dots;
}

// ---- DOM helpers ----------------------------------------------------------------

type Styles = Record<string, string | number>;

const px = (v: number) => `${v}px`;
const url = (s: string | undefined) => (s ? `url("${s}")` : "none");

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className: string, style: Styles = {}, kids: Node[] = []) {
  const node = document.createElement(tag);
  node.className = className;
  for (const [k, v] of Object.entries(style)) node.style.setProperty(k, String(v));
  node.append(...kids);
  return node;
}

function svg(tag: string, attrs: Styles = {}, kids: Node[] = []) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  node.append(...kids);
  return node;
}

function sparkle(className: string, style: Styles) {
  const node = svg("svg", { class: `ssp-spark ${className}`, viewBox: "-1 -1 2 2", "aria-hidden": "true" }, [
    svg("path", { d: SPARK }),
  ]);
  for (const [k, v] of Object.entries(style)) (node as SVGElement).style.setProperty(k, String(v));
  return node;
}

/** The pieces of the scene that are sized off the root: rebuilt on resize and on rewind. */
function buildScene(st: Stage, tex: Textures | null): Node[] {
  const lx = (x: number) => x - st.x0;
  const ly = (y: number) => y - st.y0;
  const L = lx(st.left);
  const Rt = lx(st.right);
  const S = ly(st.spring);
  const C = ly(st.crown);
  const F = ly(st.floor);
  const rx = (Rt - L) / 2;
  const ry = S - C;
  const ins = st.W * 0.028;
  const archOuter = `M${L} ${F}V${S}A${rx} ${ry} 0 0 1 ${Rt} ${S}V${F}`;
  const archInner = `M${L + ins} ${F}V${S}A${rx - ins} ${ry - ins} 0 0 1 ${Rt - ins} ${S}V${F}`;
  const col = st.W * 0.022;
  // scallops along the underside of the inner arch
  const scallops = (() => {
    const k = 16;
    const rr = rx - ins * 2.1;
    const rv = ry - ins * 2.1;
    const cx = L + rx;
    let d = "";
    for (let j = 0; j <= k; j++) {
      const phi = Math.PI - (j / k) * Math.PI;
      const x = cx + rr * Math.cos(phi);
      const y = S - rv * Math.sin(phi);
      d +=
        (j === 0 ? "M" : `A${(rr * 0.11).toFixed(1)} ${(rr * 0.11).toFixed(1)} 0 0 0 `) +
        `${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return d;
  })();
  const figH = st.H * FIGURE_H;
  const figW = figH / 2;
  const curtainTop = S - st.H * 0.02;
  const curtainW = st.W * CURTAIN_W;
  const curtainH = F - curtainTop;

  const cloud = (k: number) => {
    const spec = CLOUDS[k];
    if (!spec) return el("div", "");
    const [x, rise, w, h, wait, drift] = spec;
    return el(
      "div",
      "ssp-cloud",
      {
        left: px(st.W * x),
        top: px(F - st.H * rise),
        width: px(st.W * w),
        height: px(st.H * h),
        "--bg": url(tex?.clouds[k]),
        "--w": `${wait}s`,
      },
      [el("div", "ssp-cloud-drift", { "--f": `${drift}s` })],
    );
  };

  const draw = (d: string, width: number, wait: string, extra: Styles = {}) =>
    svg("path", { class: "ssp-draw", pathLength: 1, d, "stroke-width": width, style: `--w: ${wait}`, ...extra });

  const scene = (mirror: boolean) => [
    el("div", "ssp-par ssp-par-far", {}, [
      el("div", "ssp-moonglow", {
        left: px(lx(st.moonX) - st.moonR * 4),
        top: px(ly(st.moonY) - st.moonR * 4),
        width: px(st.moonR * 8),
        height: px(st.moonR * 8),
      }),
      el("div", "ssp-moon", {
        left: px(lx(st.moonX) - st.moonR),
        top: px(ly(st.moonY) - st.moonR),
        width: px(st.moonR * 2),
        height: px(st.moonR * 2),
        "background-image": url(tex?.moon),
      }),
      cloud(2),
    ]),
    el("div", "ssp-par ssp-par-mid", {}, [cloud(0), cloud(1), cloud(3)]),
    el("div", "ssp-par ssp-par-near", {}, [
      svg(
        "svg",
        { class: "ssp-arch", width: st.W, height: st.H, viewBox: `0 0 ${st.W} ${st.H}`, "aria-hidden": "true" },
        [
          draw(archOuter, 2.2, "0.4s"),
          draw(archInner, 1, "0.7s", { opacity: 0.7 }),
          svg("path", { class: "ssp-orn", d: scallops, "stroke-width": 1, "stroke-dasharray": "1.5 3", opacity: 0.65 }),
          ...[L - col, Rt + col].map((x) => draw(`M${x} ${F}V${S + st.H * 0.02}`, 1, "0.9s", { opacity: 0.55 })),
          ...[L, Rt].map((x) =>
            svg("g", { class: "ssp-orn", "stroke-width": 1.2 }, [
              svg("path", { d: `M${x - col * 1.6} ${S + st.H * 0.02}H${x + col * 1.6}` }),
              svg("path", { d: `M${x - col * 1.3} ${S + st.H * 0.035}H${x + col * 1.3}`, opacity: 0.6 }),
              svg("path", { d: `M${x - col * 1.7} ${F - 1}H${x + col * 1.7}` }),
              svg("path", {
                d: `M${x - col * 0.5} ${S + st.H * 0.05}V${F - st.H * 0.01}`,
                "stroke-dasharray": "1 4",
                opacity: 0.5,
              }),
              svg("path", {
                d: `M${x + col * 0.5} ${S + st.H * 0.05}V${F - st.H * 0.01}`,
                "stroke-dasharray": "1 4",
                opacity: 0.5,
              }),
            ]),
          ),
          svg("path", { class: "ssp-orn", d: `M${L - col * 2} ${F}H${Rt + col * 2}`, "stroke-width": 1, opacity: 0.5 }),
        ],
      ),
      el(
        "div",
        "ssp-curtain",
        {
          left: px(L + col * 0.4),
          top: px(curtainTop),
          width: px(curtainW),
          height: px(curtainH),
          "--bg": url(tex?.curtain),
        },
        [el("div", "ssp-curtain-sway")],
      ),
      el(
        "div",
        "ssp-curtain ssp-curtain-r",
        {
          left: px(Rt - col * 0.4 - curtainW),
          top: px(curtainTop),
          width: px(curtainW),
          height: px(curtainH),
          "--bg": url(tex?.curtain),
        },
        [el("div", "ssp-curtain-sway", { "animation-delay": "-3s" })],
      ),
      el("div", "ssp-pool", {
        left: px(st.W / 2 - st.W * 0.2),
        top: px(F - st.H * 0.04),
        width: px(st.W * 0.4),
        height: px(st.H * 0.08),
      }),
      el("div", "ssp-figure", {
        left: px(st.W / 2 - figW / 2),
        top: px(F - figH + 1),
        width: px(figW),
        height: px(figH),
        "background-image": url(tex?.figure),
      }),
      ...(mirror
        ? []
        : STAGE_SPARKS.map(([x, y, size, delay]) =>
            sparkle("ssp-skyspark ssp-stagespark", {
              left: `${x}%`,
              top: `${y}%`,
              width: px(st.u * size),
              height: px(st.u * size),
              "animation-delay": `${delay}s`,
            }),
          )),
    ]),
  ];

  const planets =
    tex === null
      ? []
      : PLANETS.map(([x, y, size, k, fl]) => {
          const side = st.u * size * (k === 3 ? 1.9 : 1);
          const img = el("img", "");
          img.src = tex.planets[k] ?? "";
          img.alt = "";
          img.draggable = false;
          return el(
            "div",
            "ssp-planet-par",
            { left: px(st.cx + x * st.u), top: px(st.cy + y * st.u), "--d": 10 + size * 60 },
            [
              el(
                "div",
                "ssp-planet",
                {
                  left: px(-side / 2),
                  top: px(-side / 2),
                  width: px(side),
                  height: px(side),
                  "--vx": x,
                  "--vy": y,
                  "--f": `${fl}s`,
                },
                [img],
              ),
            ],
          );
        });

  const stage = el("div", "ssp-stage", { left: px(st.x0), top: px(st.y0), width: px(st.W), height: px(st.H) }, [
    ...scene(false),
    el("div", "ssp-mirror", { top: px(F), width: px(st.W), height: px(st.H - F + st.H * 0.16) }, [
      el(
        "div",
        "ssp-mirror-flip",
        { top: px(-F), width: px(st.W), height: px(st.H), "transform-origin": `50% ${F}px`, transform: "scaleY(-1)" },
        scene(true),
      ),
    ]),
  ]);

  const rig = el("div", "ssp-rig", { left: px(st.cx), top: px(st.cy) }, [
    el("div", "ssp-glow"),
    svg(
      "svg",
      { class: "ssp-rays", viewBox: "-100 -100 200 200", "aria-hidden": "true" },
      RAYS.map((r) =>
        svg("line", {
          x1: Math.cos(r.ang) * r.from,
          y1: Math.sin(r.ang) * r.from,
          x2: Math.cos(r.ang) * r.to,
          y2: Math.sin(r.ang) * r.to,
          "stroke-dasharray": `${r.dash} ${12 - r.dash}`,
          style: `animation-duration: ${r.dur}s`,
        }),
      ),
    ),
    el("span", "ssp-flare", { "--a": "-27deg" }),
    el("span", "ssp-flare ssp-flare-b", { "--a": "58deg" }),
    el("div", "ssp-orbit", {}, [
      el("i", "ssp-moonlet", { left: "50%", top: "0%" }),
      el("i", "ssp-moonlet", { left: "93.3%", top: "75%" }),
      el("i", "ssp-moonlet", { left: "6.7%", top: "75%", transform: "scale(0.6)" }),
    ]),
    el("div", "ssp-core", {}, [
      svg("svg", { viewBox: "-1 -1 2 2", "aria-hidden": "true" }, [svg("path", { d: SPARK })]),
    ]),
  ]);

  return [...planets, stage, rig];
}

// ---- the scene ------------------------------------------------------------------

class StardustStage {
  private readonly root: HTMLElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly scene: HTMLElement;
  private readonly sky: HTMLElement;
  private readonly count: HTMLElement | null;
  private act: HTMLElement | null;
  private readonly title: HTMLElement | null;
  private readonly readout: HTMLElement | null;
  private readonly hint: HTMLElement | null;
  private readonly veil: HTMLElement | null;
  private readonly live: HTMLElement | null;
  private readonly still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  private phase: Phase = "load";
  private phaseAt = performance.now();
  private started = false;
  private rush = false;
  private rewinding = false;
  private elapsed = 0;
  private shown = 0;
  private pct = -1;
  private actIndex = -1;
  private timer = 0;

  private st: Stage;
  private dots: Dot[] = [];
  private tex: Textures | null = null;
  private look = "";
  private palette: Palette = { stage: "#f40c3f", ink: "#160000" };

  private pointer: { x: number; y: number; px: number; py: number; touch: boolean } | null = null;
  private raf = 0;
  private last = 0;
  private t0 = performance.now();
  private visible = false;
  private m = 0;
  private warp = 0;
  private mx = 0;
  private my = 0;

  constructor(root: HTMLElement) {
    this.root = root;
    const q = (s: string) => root.querySelector<HTMLElement>(s);
    const canvasEl = root.querySelector(".ssp-dots");
    const sceneEl = q(".js-ssp-scene");
    const skyEl = q(".js-ssp-sparks");
    if (!(canvasEl instanceof HTMLCanvasElement) || !sceneEl || !skyEl) throw new Error("stardust markup missing");
    this.canvas = canvasEl;
    this.scene = sceneEl;
    this.sky = skyEl;
    this.count = q(".ssp-count");
    this.act = q(".ssp-act");
    this.title = q(".ssp-title");
    this.readout = q(".ssp-readout");
    this.hint = q(".ssp-hint");
    this.veil = q(".ssp-veil");
    this.live = q(".ssp-sr");
    this.st = layout(1280, 800);

    this.readPalette();
    this.measure();
    this.bind();
  }

  private bind() {
    if (typeof ResizeObserver !== "undefined") new ResizeObserver(() => this.measure()).observe(this.root);
    new IntersectionObserver(([entry]) => {
      this.visible = Boolean(entry?.isIntersecting);
      this.toggleLoop();
    }).observe(this.root);
    document.addEventListener("visibilitychange", () => this.toggleLoop());
    // The theme switch swaps --color-primary on <html>: repaint in the new colours.
    new MutationObserver(() => {
      if (this.readPalette()) this.repaint();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    this.root.addEventListener("pointermove", (e) => this.onPointer(e));
    this.root.addEventListener("pointerdown", (e) => this.onPointer(e));
    this.root.addEventListener("pointerleave", () => (this.pointer = null));
    this.root.addEventListener("click", () => this.activate());
    this.root.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.activate();
      }
    });

    // The orbit starts filling once the hero has played its own entrance, so
    // the scene's opening is seen rather than spent behind the 3D intro.
    const waves = this.root.closest("a-waves");
    waves?.addEventListener("introend", () => this.start(), { once: true });
    window.addEventListener("portfolio:entered", () => window.setTimeout(() => this.start(), 3500), { once: true });
    if (document.documentElement.classList.contains("intro-done")) window.setTimeout(() => this.start(), 3500);
  }

  private start() {
    this.started = true;
  }

  /** Reads the page's colours. Returns true when they changed. */
  private readPalette() {
    const css = getComputedStyle(this.root);
    const stage = css.getPropertyValue("--color-primary").trim() || this.palette.stage;
    const ink = css.getPropertyValue("--color-secondary").trim() || this.palette.ink;
    if (stage === this.palette.stage && ink === this.palette.ink) return false;
    this.palette = { stage, ink };
    return true;
  }

  private measure() {
    const r = this.root.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return;
    const w = Math.round(r.width);
    const h = Math.round(r.height);
    if (w === this.st.w && h === this.st.h && this.dots.length) return;
    this.st = layout(w, h);
    const n = Math.round(Math.min(3600, Math.max(1300, (w * h) / 300)) * (w < 768 ? 0.7 : 1));
    this.dots = buildField(this.st, n);
    const { st } = this;
    const s = this.root.style;
    s.setProperty("--ssp-u", px(st.u));
    s.setProperty("--ssp-dx", px(st.moonX - st.cx));
    s.setProperty("--ssp-dy", px(st.moonY - st.cy));
    if (this.readout) this.readout.style.top = px(st.cy + st.u * 0.27);
    if (this.title) this.title.style.top = px(st.floor + st.H * 0.045);
    this.repaint();
  }

  /** Paints the textures for the current colours and size, at most once per look. */
  private repaint() {
    const q = Math.min(2, window.devicePixelRatio || 1);
    const { st } = this;
    const look = JSON.stringify([this.palette, Math.round(st.W / 60), Math.round(st.H / 60), q]);
    if (look !== this.look) {
      this.look = look;
      try {
        this.tex = paintAll(this.palette, st, q);
      } catch {
        /* no canvas: the dots and lines still play */
        this.tex = null;
      }
      const s = this.root.style;
      s.setProperty("--ssp-stars", url(this.tex?.stars));
      s.setProperty("--ssp-nebula", url(this.tex?.nebula));
      s.setProperty("--ssp-rain", url(this.tex?.rain));
      s.setProperty("--ssp-grain", url(this.tex?.grain));
    }
    this.render();
  }

  /** Rebuilds the sized pieces: the planets, the stage and the star rig. */
  private render() {
    const { st } = this;
    this.scene.replaceChildren(...buildScene(st, this.tex));
    this.sky.replaceChildren(
      ...SKY_SPARKS.map(([x, y, size, delay]) =>
        sparkle("ssp-skyspark", {
          left: `${x}%`,
          top: `${y}%`,
          width: px(st.u * size),
          height: px(st.u * size),
          "animation-delay": `${delay}s`,
        }),
      ),
    );
  }

  private setPhase(phase: Phase) {
    this.phase = phase;
    this.phaseAt = performance.now();
    this.root.dataset["phase"] = phase;
    window.clearTimeout(this.timer);
    if (phase === "morph") this.timer = window.setTimeout(() => this.setPhase("reveal"), MORPH_MS);
    const label =
      phase === "load" ? "Stardust scene. Press to rush the star." : "Moonlit stage. Press to rewind to the stars.";
    this.root.setAttribute("aria-label", label);
    if (this.hint) this.hint.textContent = phase === "load" ? "" : this.pointerHint();
    if (phase === "reveal" && this.live) this.live.textContent = this.title?.dataset["word"] ?? "";
  }

  private pointerHint() {
    return matchMedia("(hover: hover)").matches ? "Click to rewind" : "Tap to rewind";
  }

  private activate() {
    if (this.rewinding) return;
    this.started = true;
    if (this.phase === "load") this.rush = true;
    else if (this.phase === "morph") this.setPhase("reveal");
    else this.rewind();
  }

  // The veil comes down, the cosmos resets beneath it, the veil goes up.
  private rewind() {
    this.rewinding = true;
    this.veil?.setAttribute("data-on", "true");
    window.setTimeout(() => {
      this.elapsed = 0;
      this.shown = 0;
      this.rush = false;
      this.m = 0;
      this.setPhase("load");
      this.render();
      this.veil?.setAttribute("data-on", "false");
      this.rewinding = false;
    }, REWIND_MS);
  }

  private onPointer(e: PointerEvent) {
    const r = this.root.getBoundingClientRect();
    this.pointer = {
      x: ((e.clientX - r.left) / r.width) * 2 - 1,
      y: ((e.clientY - r.top) / r.height) * 2 - 1,
      px: e.clientX - r.left,
      py: e.clientY - r.top,
      touch: e.pointerType === "touch",
    };
  }

  private toggleLoop() {
    const run = this.visible && document.visibilityState === "visible";
    if (run && !this.raf) {
      this.last = performance.now();
      this.raf = requestAnimationFrame((now) => this.tick(now));
    } else if (!run && this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
  }

  // Drives the orbit from the simulated load, then hands over to the morph.
  private progress(dt: number) {
    if (this.phase !== "load") return;
    if (this.started) this.elapsed += dt;
    // A rush closes the rest of the orbit at a steady pace, on wall time.
    this.shown = this.rush
      ? Math.min(1, this.shown + dt / RUSH_MS)
      : Math.max(this.shown, simulated(this.elapsed / DURATION_MS));
    const p = this.shown;
    this.root.style.setProperty("--ssp-p", p.toFixed(4));
    const pct = Math.round(p * 100);
    if (pct !== this.pct) {
      this.pct = pct;
      if (this.count) this.count.textContent = String(pct).padStart(3, "0");
      const act = Math.max(0, Math.min(ACTS.length - 1, Math.floor(p * ACTS.length)));
      if (act !== this.actIndex && this.act) {
        this.actIndex = act;
        // a fresh node, so its fade-in plays again
        const next = this.act.cloneNode() as HTMLElement;
        next.textContent = ACTS[act] ?? "";
        this.act.replaceWith(next);
        this.act = next;
      }
    }
    if (p >= 1) this.setPhase("morph");
  }

  // One loop draws every dot, wherever it is in its flight.
  private tick(now: number) {
    // The load runs on wall time, so slow frames don't stretch it; the
    // animation steps are capped so one long frame doesn't jump them.
    this.progress(Math.min(250, now - this.last));
    const dt = Math.min(64, now - this.last);
    this.last = now;

    const { still, st: s, dots, phase } = this;
    const t = still ? 0 : (now - this.t0) / 1000;
    const p = this.shown;
    const ptr = this.pointer;
    const g = this.canvas.getContext("2d");
    if (!g) return;

    // the camera leans toward the pointer, or wanders when there is none
    let tx = 0;
    let ty = 0;
    if (ptr && !ptr.touch) {
      tx = ptr.x;
      ty = ptr.y;
    } else if (!still) {
      tx = Math.sin(t * 0.37) * 0.4;
      ty = Math.sin(t * 0.23 + 1.1) * 0.25;
    }
    this.mx += (tx - this.mx) * 0.06;
    this.my += (ty - this.my) * 0.06;
    const { mx, my } = this;
    this.root.style.setProperty("--ssp-mx", mx.toFixed(4));
    this.root.style.setProperty("--ssp-my", my.toFixed(4));

    // how far the flight from cosmos to stage has come
    if (phase === "load") this.m = 0;
    else if (phase === "morph")
      this.m = Math.max(this.m, clamp01((now - this.phaseAt) / (still ? 500 : MORPH_MS * 0.85)));
    else this.m = Math.min(1, this.m + dt / 700);
    const m = this.m;
    this.warp += (dt / 1000) * (0.05 + 0.3 * p) * (still ? 0 : 1);
    const warp = this.warp;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const cw = Math.round(s.w * dpr);
    const ch = Math.round(s.h * dpr);
    const cv = this.canvas;
    if (cv.width !== cw || cv.height !== ch) {
      cv.width = cw;
      cv.height = ch;
      cv.style.width = px(s.w);
      cv.style.height = px(s.h);
    }
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, s.w, s.h);
    g.fillStyle = this.palette.ink;

    const R = s.u * 0.2;
    const TAU = Math.PI * 2;
    const haloA = Math.cos(t * 0.05);
    const haloB = Math.sin(t * 0.05);
    const reach = s.u * 0.12;
    const ppx = ptr ? ptr.px : -1e5;
    const ppy = ptr ? ptr.py : -1e5;

    for (const d of dots) {
      const { role, r1, r2, r3, r4 } = d;

      // place in the cosmos
      let ax = 0;
      let ay = 0;
      let aa = 0;
      if (m < 1) {
        if (role === 0) {
          const rad = s.u * 0.075 * Math.pow(r1, 1.5) * (1 + 0.06 * Math.sin(t * 1.6 + r3 * 9));
          const ang = r2 * TAU + t * 0.14 * (1 - r1);
          ax = s.cx + Math.cos(ang) * rad;
          ay = s.cy + Math.sin(ang) * rad;
          aa = (0.25 + 0.75 * (1 - r1)) * (0.35 + 0.65 * p);
        } else if (role === 1) {
          const ang = -Math.PI / 2 + r1 * TAU + Math.sin(t * 0.6 + r3 * 6) * 0.004;
          const rad = R * (1 + (r2 - 0.5) * 0.045);
          ax = s.cx + Math.cos(ang) * rad;
          ay = s.cy + Math.sin(ang) * rad;
          aa = 0.09 + 0.91 * ringLit(r1, p);
        } else if (role === 2) {
          const ang = (Math.floor(r1 * 64) / 64) * TAU + (r2 - 0.5) * 0.02 + 0.05;
          const trav = (r3 + warp * (0.6 + 0.8 * r4)) % 1;
          const dist = R * 1.18 + Math.pow(trav, 1.7) * s.u * 0.95;
          ax = s.cx + Math.cos(ang) * dist;
          ay = s.cy + Math.sin(ang) * dist;
          aa = Math.sin(Math.PI * trav) * (0.1 + 0.7 * p) * (0.4 + 0.6 * r4);
        } else if (r3 < 0.5) {
          ax = r1 * s.w;
          ay = r4 * s.h;
          aa = 0.1 + 0.45 * r2 * r2;
        } else {
          ax = d.bx;
          ay = d.by;
          aa = d.ba;
        }
      }

      // place on the stage; the halo turns slowly about the moon
      let bx = d.bx;
      let by = d.by;
      if (role === 1) {
        const dx = bx - s.moonX;
        const dy = by - s.moonY;
        const dir = r3 < 0.55 ? 1 : -1;
        bx = s.moonX + dx * haloA - dy * haloB * dir;
        by = s.moonY + dx * haloB * dir + dy * haloA;
      }
      const ba = d.ba;

      let x = ax;
      let y = ay;
      let a = aa;
      if (m >= 1) {
        x = bx;
        y = by;
        a = ba;
      } else if (m > 0) {
        const e = ease(morphAt(m, d.delay));
        if (still) {
          x = e < 0.5 ? ax : bx;
          y = e < 0.5 ? ay : by;
          a = e < 0.5 ? aa * (1 - e * 2) : ba * (e * 2 - 1);
        } else {
          // fly along an arc, not a straight line
          const arc = Math.sin(Math.PI * e) * d.twist;
          const dx = bx - ax;
          const dy = by - ay;
          x = ax + dx * e - dy * arc;
          y = ay + dy * e + dx * arc;
          a = aa + (ba - aa) * e + Math.sin(Math.PI * e) * 0.35;
        }
      }

      if (!still) a *= 0.8 + 0.2 * Math.sin(t * (1.4 + r3 * 3) + r4 * 40);

      // the pointer parts the dust, and it settles back behind it
      let qx = 0;
      let qy = 0;
      const ddx = x - ppx;
      const ddy = y - ppy;
      const d2 = ddx * ddx + ddy * ddy;
      if (d2 < reach * reach && d2 > 0.01) {
        const dist = Math.sqrt(d2);
        const push = 1 - dist / reach;
        const pw = push * push * reach * 0.55;
        qx = (ddx / dist) * pw;
        qy = (ddy / dist) * pw;
        a += push * 0.5;
      }
      d.ox += (qx - d.ox) * 0.12;
      d.oy += (qy - d.oy) * 0.12;
      x += d.ox - mx * d.depth;
      y += d.oy - my * d.depth;

      if (a < 0.02) continue;
      g.globalAlpha = a > 1 ? 1 : a;
      g.fillRect(x - d.size * 0.5, y - d.size * 0.5, d.size, d.size);
    }
    g.globalAlpha = 1;
    this.raf = requestAnimationFrame((next) => this.tick(next));
  }
}

for (const root of document.querySelectorAll<HTMLElement>(".js-stardust")) new StardustStage(root);
