/**
 * The hero's stardust scene, in the band the wave lines used to fill. Drawn
 * from the "Stardust Stage Preloader" React component's final act, without its
 * loading parts: a stippled night with a moonlit proscenium stage in the
 * middle (moon and halo, arch, curtains, clouds, a lone figure, the wordmark in
 * the reflection) and stippled planets hung in the sky on either side, clear
 * of the arch. When the hero comes in, the stage draws itself in once; after
 * that it only breathes. The pointer parts the dust and leans the camera.
 *
 * Plain TypeScript, no framework: an Astro island would need an inline script,
 * which the site's CSP (public/_headers) blocks. Every texture is painted
 * procedurally onto canvas, seeded so it comes out the same every time, in the
 * page's own --color-primary (the night) and --color-secondary (the ink), and
 * repainted when the theme switch changes them. The dots live on one canvas
 * driven by one requestAnimationFrame loop that only runs while the scene is
 * on screen; everything else is styled in StardustStage.astro.
 */

interface Palette {
  stage: string;
  ink: string;
}

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

// Sparkles over the stage: [x %, y % of the stage box, size, delay s].
const STAGE_SPARKS = [
  [36, 14, 0.026, 0],
  [67, 25, 0.018, 1.4],
  [57, 9, 0.014, 2.3],
  [28, 31, 0.012, 0.7],
  [74, 12, 0.012, 3.1],
] as const;

// Sky sparkles: [x %, y % of the root, size, delay s].
const SKY_SPARKS = [
  [6, 82, 0.03, 0.4],
  [94, 86, 0.036, 1.8],
  [3, 12, 0.022, 2.9],
  [97, 10, 0.018, 1.1],
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

/** The planet kinds: 0 cratered, 1 banded giant, 2 small plain, 3 ringed. */
type PlanetKind = 0 | 1 | 2 | 3;
interface Planet {
  kind: PlanetKind;
  /** Centre, in root pixels. */
  x: number;
  y: number;
  /** Disc radius, in root pixels. A ringed planet's ring reaches 1.9 times as far. */
  r: number;
  /** Seconds per float cycle. */
  float: number;
}

// How far a ringed planet's ring reaches, in disc radii, across and up.
const RING_X = 1.9;
const RING_Y = 0.62;

// The stage box and everything placed in it, in root pixels. The stage
// widens with the band and fills most of its height; the wordmark sits in the
// reflection under the floor.
function layout(w: number, h: number) {
  const a = Math.min(1.75, Math.max(0.9, w / Math.max(1, h)));
  let H = h * 0.86;
  let W = H * a;
  if (W > w * 0.94) {
    W = w * 0.94;
    H = W / a;
  }
  const x0 = (w - W) / 2;
  // When the band is taller than the stage needs (phones), sit the stage low
  // so the wordmark ends near the bottom and the room above is sky.
  const y0 = Math.max(h * 0.03, h * 0.97 - H * 1.04);
  const st = {
    w,
    h,
    u: Math.min(w, h),
    cx: w / 2,
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
    moonR: Math.min(W, H) * 0.075,
    /** Room left and right of the stage box, for the planets and cloud banks. */
    side: x0,
    planets: [] as Planet[],
  };
  st.planets = placePlanets(st);
  return st;
}
type Stage = ReturnType<typeof layout>;

// Hangs the planets in the sky around the stage, never over it or each other.
// With room either side (desktop) they fill the side skies; on a narrow band
// two small ones sit in the arch's upper corners, outside its curve.
function placePlanets(st: Omit<Stage, "planets"> & { planets: Planet[] }): Planet[] {
  const { w, h, side } = st;
  if (side > h * 0.32) {
    const giant = Math.min(side * 0.28, h * 0.19);
    return [
      { kind: 1, x: side * 0.44, y: h * 0.32, r: giant, float: 13 },
      { kind: 2, x: side * 0.86, y: h * 0.12, r: Math.min(side * 0.05, h * 0.035), float: 7 },
      { kind: 0, x: w - side * 0.74, y: h * 0.2, r: Math.min(side * 0.11, h * 0.09), float: 9 },
      { kind: 3, x: w - side * 0.42, y: h * 0.44, r: Math.min(side * 0.15, h * 0.1), float: 11 },
    ];
  }
  // Above the arch's shoulders, outside its curve: e is how far out, in arch radii.
  const rx = (st.right - st.left) / 2;
  const ry = st.spring - st.crown;
  const corner = (fx: number, fy: number, kind: PlanetKind, float: number): Planet => {
    const x = st.left + rx * fx;
    const y = st.crown + ry * fy;
    const e = Math.hypot((x - st.cx) / rx, (st.spring - y) / ry);
    const room = Math.min((e - 1) * ry, y - st.y0 * 0.2, Math.min(x - st.x0, st.x0 + st.W - x) + rx * 0.08);
    return { kind, x, y, r: Math.max(4, Math.min(rx * 0.16, room * 0.62)), float };
  };
  return [corner(0.12, -0.12, 1, 13), corner(1.86, 0.04, 0, 9)];
}

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
  planets: string[];
  moon: string;
  clouds: string[];
  banks: string[];
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

// A stippled planet, shaded like the moon so it reads as part of the same
// drawing: lit from the upper left, dense where the light catches. The canvas
// is the planet's box, or for a ringed planet the ring's.
function paintPlanet(kind: PlanetKind, r: number, ink: string, stage: string) {
  const ringed = kind === 3;
  const w = Math.ceil(r * 2 * (ringed ? RING_X : 1)) + 4;
  const h = Math.ceil(r * 2 * (ringed ? RING_Y * 1.9 : 1)) + 4;
  const cx = w / 2;
  const cy = h / 2;
  const rnd = rng(61 + kind * 13);
  const craters = Array.from({ length: kind === 0 ? 9 : kind === 2 ? 3 : 0 }, () => ({
    x: (rnd() - 0.5) * 1.4,
    y: (rnd() - 0.5) * 1.4,
    r: 0.08 + rnd() * rnd() * 0.24,
  }));
  const tilt = -0.28;
  // where (px, py) falls on the ring: 0 off it, 1 on its front half, -1 on its back
  const ringAt = (px: number, py: number) => {
    const dx = (px - cx) / r;
    const dy = (py - cy) / r;
    const rx = dx * Math.cos(tilt) + dy * Math.sin(tilt);
    const ry = dy * Math.cos(tilt) - dx * Math.sin(tilt);
    const e = Math.hypot(rx / RING_X, ry / (RING_X * 0.3));
    return e > 0.66 && e < 0.98 ? (ry > 0 ? 1 : -1) : 0;
  };
  return stipple(
    w,
    h,
    (g) => {
      g.fillStyle = "#fff";
      g.beginPath();
      g.arc(cx, cy, r - 1, 0, Math.PI * 2);
      g.fill();
      if (!ringed) return;
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (ringAt(x + 0.5, y + 0.5)) g.fillRect(x, y, 1, 1);
    },
    (x, y) => {
      const px = x * w;
      const py = y * h;
      const ring = ringed ? ringAt(px, py) : 0;
      const nx = (px - cx) / r;
      const ny = (py - cy) / r;
      const d2 = nx * nx + ny * ny;
      if (ring > 0 || (ring < 0 && d2 > 1)) return 0.5 + 0.25 * Math.sin(Math.hypot(nx, ny * 3.3) * 9);
      const nz = Math.sqrt(Math.max(0, 1 - d2));
      let lam = Math.max(0, -0.42 * nx - 0.46 * ny + 0.78 * nz);
      if (kind === 1) lam *= 0.62 + 0.38 * Math.sin(ny * 10 + Math.sin(nx * 3) * 1.3);
      if (ringed) lam *= 0.8 + 0.2 * Math.sin(ny * 7);
      for (const cr of craters) {
        const d = Math.hypot(nx - cr.x, ny - cr.y) / cr.r;
        if (d < 1) lam *= d < 0.8 ? 0.55 : 1.2;
      }
      // a thin rim of dots keeps the dark side's edge readable
      const rim = d2 > 0.86 ? 0.3 : 0;
      return 0.05 + 0.95 * Math.pow(lam, 1.1) + rim;
    },
    ink,
    0.95,
    71 + kind,
    stage,
  );
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
  const bank = bankBox(st);
  return {
    stars: toUrl(paintStars(ink)),
    planets: st.planets.map((p) => toUrl(paintPlanet(p.kind, p.r * q, ink, stage))),
    moon: toUrl(paintMoon(px(st.moonR * 2), ink, stage)),
    clouds: CLOUDS.map(([, , w, h], k) =>
      toUrl(paintCloud(401 + k * 31, px(st.W * w), px(st.H * h), profiles[k] ?? (() => 0.4), ink, stage)),
    ),
    // the cloud sea carries on past the gate, rising toward it
    banks: bank
      ? [
          toUrl(paintCloud(521, px(bank.w), px(bank.h), (x) => 0.25 + 0.75 * x, ink, stage)),
          toUrl(paintCloud(557, px(bank.w), px(bank.h), (x) => 1 - 0.75 * x, ink, stage)),
        ]
      : [],
    curtain: toUrl(paintCurtain(px(st.W * CURTAIN_W), px(st.floor - st.spring + st.H * 0.02), ink, stage)),
    figure: toUrl(paintFigure(px(figH / 2), px(figH), ink, stage)),
    rain: toUrl(paintRain(ink)),
    grain: toUrl(paintGrain()),
  };
}

// The cloud banks either side of the gate, when there is room for them.
function bankBox(st: Stage) {
  if (st.side < st.h * 0.32) return null;
  return { w: st.side + st.W * 0.12, h: st.H * 0.26 };
}

// ---- the dot field --------------------------------------------------------------
// The live dust drawn over the painted scene. Roles: 0 the moon's face,
// 1 its halo, 2 the arch's mouldings, 3 the floor's glint (it runs the width
// of the band, as a horizon), 4 stars.

interface Dot {
  role: 0 | 1 | 2 | 3 | 4;
  r3: number;
  r4: number;
  x: number;
  y: number;
  alpha: number;
  /** When it fades in, 0–1 of the entrance. */
  delay: number;
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
    const role = q < 0.18 ? 0 : q < 0.38 ? 1 : q < 0.66 ? 2 : q < 0.82 ? 3 : 4;
    const r1 = rnd();
    const r2 = rnd();
    const r3 = rnd();
    const r4 = rnd();
    let x;
    let y;
    let a;
    let delay;
    if (role === 0) {
      const rr = Math.sqrt(r1) * 0.97;
      const ang = r2 * Math.PI * 2;
      const nx = Math.cos(ang) * rr;
      const ny = Math.sin(ang) * rr;
      const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
      const lam = Math.max(0, nx * L[0] + ny * L[1] + nz * L[2]);
      x = st.moonX + nx * st.moonR;
      y = st.moonY + ny * st.moonR;
      a = 0.12 + 0.88 * lam;
      delay = 0.3 + r4 * 0.2;
    } else if (role === 1) {
      const g = r1 + r4 - 1;
      const rad = r3 < 0.55 ? st.moonR * (1.5 + g * 0.16) : st.moonR * (2.15 + g * 0.3);
      x = st.moonX + Math.cos(r2 * Math.PI * 2) * rad;
      y = st.moonY + Math.sin(r2 * Math.PI * 2) * rad;
      a = r3 < 0.55 ? 0.55 : 0.3;
      delay = 0.4 + r4 * 0.2;
    } else if (role === 2) {
      const pt = archPoint(st, r1, r2 < 0.55 ? 0 : inner);
      x = pt.x + (r3 - 0.5) * 2.2;
      y = pt.y + (r4 - 0.5) * 2.2;
      a = 0.55 + 0.45 * r3;
      // traced from the left column round to the right
      delay = 0.1 + r1 * 0.4;
    } else if (role === 3) {
      const dx = (r1 - 0.5) * 2;
      x = st.cx + dx * st.w * 0.5;
      y = st.floor + (r2 - 0.35) * st.H * 0.025 * (0.4 + Math.abs(dx));
      a = 0.12 + 0.7 * Math.pow(1 - Math.abs(dx), 1.5);
      delay = 0.2 + Math.abs(dx) * 0.4;
    } else {
      x = r1 * st.w;
      y = r2 * st.floor;
      a = 0.1 + 0.55 * Math.pow(r4, 3);
      delay = r4 * 0.6;
    }
    dots.push({
      role,
      r3,
      r4,
      x,
      y,
      alpha: a,
      delay,
      size: 0.9 + Math.pow(r4, 5) * 1.3,
      depth: st.u * (role === 4 ? 0.012 + r4 * 0.014 : 0.008),
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

/** The pieces of the scene that are sized off the root: rebuilt on resize and repaint. */
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

  // The cloud sea past the gate, behind its columns.
  const box = bankBox(st);
  const banks = box
    ? [0, 1].map((k) =>
        el(
          "div",
          "ssp-cloud ssp-bank",
          {
            left: px(k === 0 ? 0 : st.w - box.w),
            top: px(st.floor - box.h),
            width: px(box.w),
            height: px(box.h),
            "--bg": url(tex?.banks[k]),
            "--w": `${0.6 + k * 0.2}s`,
          },
          [el("div", "ssp-cloud-drift", { "--f": `${19 + k * 4}s` })],
        ),
      )
    : [];

  const planets = st.planets.map((p, i) => {
    const w = p.r * 2 * (p.kind === 3 ? RING_X : 1) + 4;
    const h = p.r * 2 * (p.kind === 3 ? RING_Y * 1.9 : 1) + 4;
    return el("div", "ssp-planet-par", { left: px(p.x), top: px(p.y), "--d": Math.round(6 + (p.r / st.u) * 60) }, [
      el("div", "ssp-planet", {
        left: px(-w / 2),
        top: px(-h / 2),
        width: px(w),
        height: px(h),
        "background-image": url(tex?.planets[i]),
        "--f": `${p.float}s`,
        "--w": `${0.4 + i * 0.25}s`,
      }),
    ]);
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

  return [el("div", "ssp-par ssp-par-far", {}, banks), ...planets, stage];
}

// ---- the scene ------------------------------------------------------------------

/** How long the dust takes to settle in when the hero arrives. */
const ENTER_MS = 2600;

class StardustStage {
  private readonly root: HTMLElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly scene: HTMLElement;
  private readonly sky: HTMLElement;
  private readonly title: HTMLElement | null;
  private readonly still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** When the scene came in, or null while it waits for the hero's entrance. */
  private shownAt: number | null = null;

  private st: Stage;
  private dots: Dot[] = [];
  private tex: Textures | null = null;
  private look = "";
  private palette: Palette = { stage: "#f40c3f", ink: "#160000" };

  private pointer: { x: number; y: number; px: number; py: number; touch: boolean } | null = null;
  private raf = 0;
  private readonly t0 = performance.now();
  private visible = false;
  private mx = 0;
  private my = 0;

  constructor(root: HTMLElement) {
    this.root = root;
    const canvasEl = root.querySelector(".ssp-dots");
    const sceneEl = root.querySelector<HTMLElement>(".js-ssp-scene");
    const skyEl = root.querySelector<HTMLElement>(".js-ssp-sparks");
    if (!(canvasEl instanceof HTMLCanvasElement) || !sceneEl || !skyEl) throw new Error("stardust markup missing");
    this.canvas = canvasEl;
    this.scene = sceneEl;
    this.sky = skyEl;
    this.title = root.querySelector<HTMLElement>(".ssp-title");
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

    // The stage draws itself in as the hero plays its own entrance, so that is
    // seen rather than spent behind the 3D intro.
    const waves = this.root.closest("a-waves");
    waves?.addEventListener("introend", () => this.show(), { once: true });
    window.addEventListener("portfolio:entered", () => window.setTimeout(() => this.show(), 2500), { once: true });
    if (this.still || document.documentElement.classList.contains("intro-done")) this.show();
  }

  private show() {
    if (this.shownAt !== null) return;
    this.shownAt = performance.now();
    this.root.dataset["shown"] = "true";
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
    const n = Math.round(Math.min(3600, Math.max(1300, (w * h) / 260)) * (w < 768 ? 0.7 : 1));
    this.dots = buildField(this.st, n);
    this.root.style.setProperty("--ssp-u", px(this.st.u));
    if (this.title) this.title.style.top = px(this.st.floor + this.st.H * 0.035);
    this.repaint();
  }

  /** Paints the textures for the current colours and size, at most once per look. */
  private repaint() {
    const q = Math.min(2, window.devicePixelRatio || 1);
    const { st } = this;
    const look = JSON.stringify([this.palette, Math.round(st.w / 60), Math.round(st.h / 60), q]);
    if (look !== this.look) {
      this.look = look;
      try {
        this.tex = paintAll(this.palette, st, q);
      } catch {
        /* no canvas: the dots still play */
        this.tex = null;
      }
      const s = this.root.style;
      s.setProperty("--ssp-stars", url(this.tex?.stars));
      s.setProperty("--ssp-rain", url(this.tex?.rain));
      s.setProperty("--ssp-grain", url(this.tex?.grain));
    }
    this.render();
  }

  /** Rebuilds the sized pieces: the cloud banks, the planets and the stage. */
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
      this.raf = requestAnimationFrame((now) => this.tick(now));
    } else if (!run && this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
  }

  // One loop draws every dot.
  private tick(now: number) {
    const { still, st: s, dots } = this;
    const t = still ? 0 : (now - this.t0) / 1000;
    const ptr = this.pointer;
    const g = this.canvas.getContext("2d");
    if (!g) return;
    const enter = this.shownAt === null ? 0 : still ? 1 : clamp01((now - this.shownAt) / ENTER_MS);

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

    const haloA = Math.cos(t * 0.05);
    const haloB = Math.sin(t * 0.05);
    const reach = s.u * 0.12;
    const ppx = ptr ? ptr.px : -1e5;
    const ppy = ptr ? ptr.py : -1e5;

    for (const d of dots) {
      // each dot fades in at its own moment of the entrance
      const fade = clamp01((enter - d.delay * 0.6) / 0.4);
      if (fade <= 0) continue;
      let { x, y } = d;
      // the halo turns slowly about the moon
      if (d.role === 1) {
        const dx = x - s.moonX;
        const dy = y - s.moonY;
        const dir = d.r3 < 0.55 ? 1 : -1;
        x = s.moonX + dx * haloA - dy * haloB * dir;
        y = s.moonY + dx * haloB * dir + dy * haloA;
      }
      let a = d.alpha * fade;
      if (!still) a *= 0.8 + 0.2 * Math.sin(t * (1.4 + d.r3 * 3) + d.r4 * 40);

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
        a += push * 0.5 * fade;
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
