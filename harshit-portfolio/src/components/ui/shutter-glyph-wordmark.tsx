import * as React from "react";

/**
 * The giant wordmark from the Shutter Glyph Footer (a pasted 21st.dev-style
 * component), without the rest of that footer: no signup, links or copyright.
 *
 * The word is SVG drawn here: every letter is built from rectangles, slanted
 * strokes and elliptical bands, so it looks the same on any page and no font is
 * loaded. A "*" in a line becomes the "shutter": three blades that meet at a
 * pivot, and the pivot turns to follow the pointer.
 *
 * Letters rise into place the first time the mark is on screen. Hover a letter
 * and it slices along its waist; click one and it flips; click the shutter and
 * its blades rotate a quarter turn. Reduced Motion keeps it all still.
 *
 * Colour comes from --sgf-ink (set it on an ancestor); React is the only import.
 */

// #region glyphs
// Pure: the alphabet, the shutter, layout and small helpers, as in the original.

export const clamp = (v: number, lo: number, hi: number): number => (v < lo ? lo : v > hi ? hi : v);

/** Cap height of every glyph, in SVG units. */
export const CAP = 100;
const S = 19; // stem
const B = 17; // bar

const f = (n: number): string => String(Math.round(n * 100) / 100);

/** Axis-aligned box. */
export const rect = (x: number, y: number, w: number, h: number): string =>
  "M" + f(x) + " " + f(y) + "H" + f(x + w) + "V" + f(y + h) + "H" + f(x) + "Z";

/** A slanted stroke `t` wide measured horizontally, from (x1, y1) at the top to (x2, y2) at the bottom. */
export const slant = (x1: number, y1: number, x2: number, y2: number, t: number): string =>
  "M" + f(x1) + " " + f(y1) + "H" + f(x1 + t) + "L" + f(x2 + t) + " " + f(y2) + "H" + f(x2) + "Z";

const at = (cx: number, cy: number, rx: number, ry: number, deg: number): string => {
  const a = (deg * Math.PI) / 180;
  return f(cx + rx * Math.cos(a)) + " " + f(cy + ry * Math.sin(a));
};

/**
 * A band between an outer ellipse (rx, ry) and an inner one (rx - tx, ry - ty),
 * from angle a0 to a1 in degrees. Angles grow clockwise on screen (0 = right,
 * 90 = bottom); a1 < a0 runs the other way.
 */
export const band = (
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  tx: number,
  ty: number,
  a0: number,
  a1: number,
): string => {
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const cw = a1 > a0 ? 1 : 0;
  const irx = rx - tx;
  const iry = ry - ty;
  return (
    "M" +
    at(cx, cy, rx, ry, a0) +
    "A" +
    f(rx) +
    " " +
    f(ry) +
    " 0 " +
    large +
    " " +
    cw +
    " " +
    at(cx, cy, rx, ry, a1) +
    "L" +
    at(cx, cy, irx, iry, a1) +
    "A" +
    f(irx) +
    " " +
    f(iry) +
    " 0 " +
    large +
    " " +
    (1 - cw) +
    " " +
    at(cx, cy, irx, iry, a0) +
    "Z"
  );
};

/** A full elliptical ring (needs fill-rule evenodd). */
export const ring = (cx: number, cy: number, rx: number, ry: number, tx: number, ty: number): string => {
  const e = (r1: number, r2: number) =>
    "M" +
    f(cx - r1) +
    " " +
    f(cy) +
    "A" +
    f(r1) +
    " " +
    f(r2) +
    " 0 1 1 " +
    f(cx + r1) +
    " " +
    f(cy) +
    "A" +
    f(r1) +
    " " +
    f(r2) +
    " 0 1 1 " +
    f(cx - r1) +
    " " +
    f(cy) +
    "Z";
  return e(rx, ry) + e(rx - tx, ry - ty);
};

/** A D-shaped bowl: flat on the left, half an ellipse on the right (needs evenodd). */
export const bowl = (x: number, y: number, w: number, h: number, t: number, tb: number): string => {
  const ry = h / 2;
  const rx = Math.min(w - t, ry * 0.95);
  const sx = x + w - rx;
  return (
    "M" +
    f(x) +
    " " +
    f(y) +
    "H" +
    f(sx) +
    "A" +
    f(rx) +
    " " +
    f(ry) +
    " 0 0 1 " +
    f(sx) +
    " " +
    f(y + h) +
    "H" +
    f(x) +
    "Z" +
    "M" +
    f(x + t) +
    " " +
    f(y + tb) +
    "H" +
    f(sx) +
    "A" +
    f(rx - t) +
    " " +
    f(ry - tb) +
    " 0 0 1 " +
    f(sx) +
    " " +
    f(y + h - tb) +
    "H" +
    f(x + t) +
    "Z"
  );
};

export type Glyph = { w: number; d: string[] };

const SPACE: Glyph = { w: 42, d: [] };

/** The display alphabet, A–Z. Each glyph is CAP tall; its shapes overlap into one letter. */
export const GLYPHS: Record<string, Glyph> = {
  A: { w: 96, d: [slant(37, 0, 0, 100, 23), slant(37, 0, 73, 100, 23), rect(18, 60, 60, 16)] },
  B: { w: 84, d: [rect(0, 0, S, 100), bowl(0, 0, 78, 52, S, B), bowl(0, 52 - B, 84, 100 - 52 + B, S, B)] },
  C: { w: 90, d: [band(45, 50, 45, 50, S + 2, B, -40, -320)] },
  D: { w: 90, d: [rect(0, 0, S + 1, 100), bowl(0, 0, 90, 100, S + 2, B)] },
  E: { w: 72, d: [rect(0, 0, S, 100), rect(0, 0, 72, B), rect(0, 41.5, 64, B), rect(0, 100 - B, 72, B)] },
  F: { w: 70, d: [rect(0, 0, S, 100), rect(0, 0, 70, B), rect(0, 43, 62, B)] },
  G: { w: 94, d: [band(47, 50, 47, 50, S + 2, B, -38, -360), rect(48, 46, 46, B)] },
  H: { w: 86, d: [rect(0, 0, S, 100), rect(86 - S, 0, S, 100), rect(0, 42, 86, B)] },
  I: { w: S + 2, d: [rect(0, 0, S + 2, 100)] },
  J: { w: 72, d: [rect(72 - S, 0, S, 64), band(36, 62, 36, 38, S, B, 0, 180)] },
  K: { w: 86, d: [rect(0, 0, S, 100), slant(62, 0, 10, 62, 24), slant(30, 42, 62, 100, 24)] },
  L: { w: 68, d: [rect(0, 0, S, 100), rect(0, 100 - B, 68, B)] },
  M: {
    w: 112,
    d: [rect(0, 0, S + 3, 100), slant(0, 0, 46, 100, 9), slant(68, 0, 40, 100, 22), rect(112 - S - 3, 0, S + 3, 100)],
  },
  N: { w: 88, d: [rect(0, 0, S, 100), rect(88 - S, 0, S, 100), slant(0, 0, 63, 100, 25)] },
  O: { w: 100, d: [ring(50, 50, 50, 50, S + 2, B)] },
  P: { w: 80, d: [rect(0, 0, S, 100), bowl(0, 0, 80, 60, S, B)] },
  Q: { w: 100, d: [ring(50, 50, 50, 50, S + 2, B), slant(50, 62, 78, 100, 22)] },
  R: { w: 84, d: [rect(0, 0, S, 100), bowl(0, 0, 82, 58, S, B), slant(34, 50, 62, 100, 22)] },
  // Two bands that meet on the spine: r = (CAP + B) / 4 makes it exactly B thick.
  S: { w: 80, d: [band(40, 29.25, 40, 29.25, S, B, -22, -273), band(40, 70.75, 40, 29.25, S, B, -93, 158)] },
  T: { w: 82, d: [rect(0, 0, 82, B), rect(41 - S / 2 - 1, 0, S + 2, 100)] },
  // Stems run 2 past the band so the joins never show a hairline.
  U: { w: 86, d: [rect(0, 0, S, 60), rect(86 - S, 0, S, 60), band(43, 58, 43, 42, S, B, 0, 180)] },
  V: { w: 94, d: [slant(0, 0, 36, 100, 22), slant(72, 0, 36, 100, 22)] },
  W: {
    w: 132,
    d: [slant(0, 0, 26, 100, 20), slant(56, 0, 26, 100, 20), slant(56, 0, 86, 100, 20), slant(112, 0, 86, 100, 20)],
  },
  X: { w: 92, d: [slant(0, 0, 68, 100, 24), slant(68, 0, 0, 100, 24)] },
  Y: { w: 92, d: [slant(0, 0, 35, 56, 22), slant(70, 0, 35, 56, 22), rect(35, 50, 22, 50)] },
  Z: { w: 80, d: [rect(0, 0, 80, B), rect(0, 100 - B, 80, B), slant(56, B - 1, 0, 100 - B + 1, 24)] },
};

/** Any character outside A–Z is a gap. */
export const glyphOf = (ch: string): Glyph => GLYPHS[ch.toUpperCase()] ?? SPACE;

/** The shutter is a square, one cap tall. */
export const SHUTTER = 100;
/** Blade width along the edges it touches. */
const K = 21;
/** Where the pivot rests, in the shutter's own (unrotated) frame. */
export const REST = 77;

/** Rotate (x, y) by `turns` quarter turns clockwise about the shutter's centre. */
export const turn = (x: number, y: number, turns: number): [number, number] => {
  const n = ((turns % 4) + 4) % 4;
  let a = x;
  let b = y;
  for (let i = 0; i < n; i++) {
    const t = a;
    a = SHUTTER - b;
    b = t;
  }
  return [a, b];
};

/** Where the pivot rests for a given rotation. */
export const restPivot = (turns: number): [number, number] => turn(REST, REST, turns);

/**
 * The shutter's three blades for a pivot at (px, py), rotated `turns` quarter
 * turns. Built in the unrotated frame — one thin wedge from the top-left
 * corner, two wide ones along the top and left edges — then turned.
 */
export const blades = (px: number, py: number, turns: number): number[][] => {
  const [qx, qy] = turn(clamp(px, 8, 92), clamp(py, 8, 92), -turns);
  const shapes: [number, number][][] = [
    [
      [0, 0],
      [K, 0],
      [qx, qy],
      [0, K],
    ],
    [
      [qx, 0],
      [SHUTTER, 0],
      [SHUTTER, K],
      [qx, qy],
    ],
    [
      [0, qy],
      [qx, qy],
      [K, SHUTTER],
      [0, SHUTTER],
    ],
  ];
  return shapes.map((s) => s.flatMap(([x, y]) => turn(x, y, turns)));
};

export type Placed = { ch: string; x: number; w: number; shutter: boolean };

/** Lay the word out left to right with a fixed gap. `shutterAt` swaps that letter for the shutter. */
export const layout = (word: string, shutterAt: number, gap: number = 12): { items: Placed[]; width: number } => {
  const items: Placed[] = [];
  let x = 0;
  Array.from(word).forEach((ch, i) => {
    const shutter = i === shutterAt && ch.trim() !== "";
    const w = shutter ? SHUTTER : glyphOf(ch).w;
    items.push({ ch, x, w, shutter });
    x += w + gap;
  });
  return { items, width: Math.max(1, x - (items.length ? gap : 0)) };
};

/** Frame-rate independent ease toward a target: `k` is the fraction closed per 1/60s. */
export const approach = (from: number, to: number, k: number, dt: number): number =>
  to + (from - to) * Math.pow(1 - clamp(k, 0, 1), clamp(dt, 0, 0.1) * 60);

// #endregion

/** Gap between stacked lines, in SVG units. */
const LINE_GAP = 22;

// Scoped to .sgf. The reveal is armed from script (data-in="false"), so the
// letters are simply there when JS never runs.
const CSS =
  ".sgf{position:relative;color:var(--sgf-ink)}" +
  ".sgf .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}" +
  ".sgf-svg{display:block;width:100%;height:auto;max-width:none;overflow:hidden;fill:var(--sgf-ink)}" +
  ".sgf-rise{transition:transform 1.15s cubic-bezier(.16,.84,.2,1) var(--sgf-d,0ms)}" +
  ".sgf[data-in='false'] .sgf-rise{transform:translateY(112px)}" +
  ".sgf-g{cursor:pointer}" +
  ".sgf-flip{transform-box:fill-box;transform-origin:50% 50%}" +
  ".sgf-flip.is-flip{animation:sgf-flip .7s cubic-bezier(.2,.8,.2,1)}" +
  "@keyframes sgf-flip{0%{transform:scaleY(1)}45%{transform:scaleY(-1)}100%{transform:scaleY(1)}}" +
  ".sgf-half{transition:transform .45s cubic-bezier(.2,.9,.25,1.15)}" +
  ".sgf-g:hover .sgf-up{transform:translate(5px,-1.5px)}" +
  ".sgf-g:hover .sgf-dn{transform:translate(-5px,1.5px)}" +
  "@media (prefers-reduced-motion: reduce){.sgf .sgf-rise,.sgf .sgf-half{transition:none!important}.sgf .sgf-flip{animation:none!important}.sgf[data-in='false'] .sgf-rise{transform:none}}";

export type ShutterGlyphWordmarkProps = {
  /** One entry per line, letters A–Z; a "*" becomes the shutter (the first one only). */
  lines: string[];
  /** Unique per wordmark on the page: it prefixes the SVG clip-path ids. */
  uid: string;
  /** Read by screen readers instead of the drawing. */
  label: string;
  /** `false` holds the shutter still and skips the reveal. */
  animate?: boolean;
  className?: string;
};

export default function ShutterGlyphWordmark({
  lines,
  uid,
  label,
  animate = true,
  className = "",
}: ShutterGlyphWordmarkProps) {
  const rows = React.useMemo(
    () =>
      lines.map((line, i) => ({
        y: i * (CAP + LINE_GAP),
        ...layout(line.toUpperCase(), line.indexOf("*")),
      })),
    [lines],
  );
  const width = Math.max(1, ...rows.map((r) => r.width));
  const height = rows.length * CAP + Math.max(0, rows.length - 1) * LINE_GAP;
  const shutterRow = rows.find((r) => r.items.some((it) => it.shutter));
  const shutter = shutterRow?.items.find((it) => it.shutter);

  const upId = "sgf-up-" + uid;
  const dnId = "sgf-dn-" + uid;

  const rootRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const bladeRefs = React.useRef<(SVGPolygonElement | null)[]>([]);
  const ptr = React.useRef({ x: 0, y: 0, inside: false });
  const [turns, setTurns] = React.useState(0);
  const pivot = React.useRef<[number, number]>(restPivot(0));

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReduced(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);
  const still = reduced || !animate;

  // Reveal once, the first time the mark is on screen; the shutter only
  // tracks while it is. data-in is written here rather than rendered, so the
  // server-rendered letters show without script.
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (still) {
      root.dataset["in"] = "true";
    } else if (root.dataset["in"] !== "true") {
      root.dataset["in"] = "false";
    }
    const io = new IntersectionObserver(
      ([e]) => {
        const on = Boolean(e?.isIntersecting);
        setVisible(on);
        if (on) root.dataset["in"] = "true";
      },
      { threshold: 0.1 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [still]);

  // The shutter's pivot eases toward the pointer, written straight to the
  // polygons so tracking never re-renders React.
  React.useEffect(() => {
    if (!shutter) return;
    const paint = (x: number, y: number) => {
      blades(x, y, turns).forEach((pts, i) => {
        bladeRefs.current[i]?.setAttribute("points", pts.map(f).join(" "));
      });
    };
    const rest = restPivot(turns);
    if (still || !visible) {
      pivot.current = rest;
      paint(rest[0], rest[1]);
      return;
    }
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const p = ptr.current;
      const tx = p.inside ? clamp(p.x, 8, 92) : rest[0];
      const ty = p.inside ? clamp(p.y, 8, 92) : rest[1];
      const [x, y] = pivot.current;
      pivot.current = [approach(x, tx, 0.12, dt), approach(y, ty, 0.12, dt)];
      paint(pivot.current[0], pivot.current[1]);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shutter, still, visible, turns]);

  const onPointer = (e: React.PointerEvent<HTMLElement>) => {
    const svg = svgRef.current;
    const p = ptr.current;
    p.inside = e.type !== "pointerleave";
    if (!svg || !shutter || !shutterRow) return;
    // Pointer in the shutter's own units, from the SVG's on-screen box.
    const r = svg.getBoundingClientRect();
    const scale = r.width / width || 1;
    p.x = (e.clientX - r.left) / scale - shutter.x;
    p.y = (e.clientY - r.top) / scale - shutterRow.y;
  };

  const flip = (e: React.MouseEvent<SVGGElement>) => {
    if (still) return;
    const el = e.currentTarget;
    el.classList.remove("is-flip");
    void el.getBoundingClientRect();
    el.classList.add("is-flip");
  };

  let n = 0;
  return (
    <div
      ref={rootRef}
      className={"sgf " + className}
      onPointerMove={onPointer}
      onPointerEnter={onPointer}
      onPointerLeave={onPointer}
    >
      <style>{CSS}</style>
      <p className="sr-only">{label}</p>
      <svg
        ref={svgRef}
        className="sgf-svg"
        viewBox={"0 0 " + f(width) + " " + f(height)}
        style={{ aspectRatio: width + " / " + height }}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {/* Every letter is drawn twice, cut at its waist; hover slides the halves apart. */}
          <clipPath id={upId} clipPathUnits="userSpaceOnUse">
            <rect x={-40} y={-200} width={400} height={252.6} />
          </clipPath>
          <clipPath id={dnId} clipPathUnits="userSpaceOnUse">
            <rect x={-40} y={51.4} width={400} height={250} />
          </clipPath>
        </defs>
        {rows.map((row, r) => (
          // A nested svg per line clips the rising letters to their own line.
          <svg key={r} x={0} y={row.y} width={width} height={CAP} overflow="hidden">
            {row.items.map((it, i) => {
              if (it.ch.trim() === "") return null;
              const rise = { "--sgf-d": 200 + n++ * 90 + "ms" } as React.CSSProperties;
              if (it.shutter) {
                const rest = restPivot(turns);
                return (
                  <g key={i} transform={"translate(" + f(it.x) + " 0)"}>
                    <g className="sgf-rise" style={rise}>
                      <g className="sgf-g" onClick={() => setTurns((t) => t + 1)}>
                        <rect width={SHUTTER} height={CAP} fill="transparent" />
                        {blades(rest[0], rest[1], turns).map((pts, b) => (
                          <polygon
                            key={b}
                            ref={(el) => {
                              bladeRefs.current[b] = el;
                            }}
                            points={pts.map(f).join(" ")}
                          />
                        ))}
                      </g>
                    </g>
                  </g>
                );
              }
              const g = glyphOf(it.ch);
              const paths = g.d.map((p, k) => <path key={k} d={p} fillRule="evenodd" />);
              return (
                <g key={i} transform={"translate(" + f(it.x) + " 0)"}>
                  <g className="sgf-rise" style={rise}>
                    <g
                      className="sgf-g sgf-flip"
                      onClick={flip}
                      onAnimationEnd={(e) => e.currentTarget.classList.remove("is-flip")}
                    >
                      <rect width={g.w} height={CAP} fill="transparent" />
                      <g clipPath={"url(#" + upId + ")"}>
                        <g className="sgf-half sgf-up">{paths}</g>
                      </g>
                      <g clipPath={"url(#" + dnId + ")"}>
                        <g className="sgf-half sgf-dn">{paths}</g>
                      </g>
                    </g>
                  </g>
                </g>
              );
            })}
          </svg>
        ))}
      </svg>
    </div>
  );
}
