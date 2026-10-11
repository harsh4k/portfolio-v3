import * as React from "react";

/**
 * The wordmark from the Shutter Glyph Footer (a pasted 21st.dev-style
 * component), without the rest of that footer: no signup, links or copyright.
 * The original draws its own geometric letters; here they are set in a web
 * font (whatever `font-family` the mark inherits), and keep its animations.
 *
 * A "*" in the text becomes the "shutter": three blades that meet at a pivot,
 * and the pivot turns to follow the pointer. Letters rise into place the first
 * time the mark is on screen. Hover a letter and it slices along its waist;
 * click one and it flips; click the shutter and its blades rotate a quarter
 * turn. Reduced Motion keeps it all still.
 *
 * Colour comes from --sgf-ink (set it on an ancestor); React is the only import.
 */

// #region shutter
// Pure: the shutter and small helpers, as in the original.

export const clamp = (v: number, lo: number, hi: number): number => (v < lo ? lo : v > hi ? hi : v);

const f = (n: number): string => String(Math.round(n * 100) / 100);

/** The shutter is a square, drawn in a 100-unit box. */
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

/** Frame-rate independent ease toward a target: `k` is the fraction closed per 1/60s. */
export const approach = (from: number, to: number, k: number, dt: number): number =>
  to + (from - to) * Math.pow(1 - clamp(k, 0, 1), clamp(dt, 0, 0.1) * 60);

// #endregion

// Scoped to .sgf. The reveal is armed from script (data-in="false"), so the
// letters are simply there when JS never runs. Each letter is set twice and
// clipped at its waist; hover slides the halves apart.
const CSS =
  ".sgf{position:relative;color:var(--sgf-ink);line-height:1;white-space:nowrap}" +
  ".sgf .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}" +
  ".sgf-line{display:flex;align-items:center;justify-content:center;user-select:none;-webkit-user-select:none}" +
  ".sgf-ch{display:inline-block;overflow:hidden;padding:.06em .01em}" +
  ".sgf-gap{display:inline-block;width:.35em}" +
  ".sgf-rise{display:inline-block;transition:transform 1.15s cubic-bezier(.16,.84,.2,1) var(--sgf-d,0ms)}" +
  ".sgf[data-in='false'] .sgf-rise{transform:translateY(115%)}" +
  ".sgf-g{position:relative;display:inline-block;cursor:pointer}" +
  ".sgf-flip.is-flip{animation:sgf-flip .7s cubic-bezier(.2,.8,.2,1)}" +
  "@keyframes sgf-flip{0%{transform:scaleY(1)}45%{transform:scaleY(-1)}100%{transform:scaleY(1)}}" +
  ".sgf-half{display:block;transition:transform .45s cubic-bezier(.2,.9,.25,1.15)}" +
  ".sgf-up{clip-path:inset(0 0 47.4% 0)}" +
  ".sgf-dn{position:absolute;inset:0;clip-path:inset(51.4% 0 0 0)}" +
  ".sgf-g:hover .sgf-up{transform:translate(.06em,-.02em)}" +
  ".sgf-g:hover .sgf-dn{transform:translate(-.06em,.02em)}" +
  ".sgf-sh{display:block;width:.68em;height:.68em;margin:0 .14em;fill:currentColor;overflow:visible}" +
  "@media (prefers-reduced-motion: reduce){.sgf .sgf-rise,.sgf .sgf-half{transition:none!important}.sgf .sgf-flip{animation:none!important}.sgf[data-in='false'] .sgf-rise{transform:none}}";

export type ShutterGlyphWordmarkProps = {
  /** The word to set; a "*" becomes the shutter (the first one only), a space a gap. */
  text: string;
  /** Read by screen readers instead of the letters. */
  label: string;
  /** `false` holds the shutter still and skips the reveal. */
  animate?: boolean;
  className?: string;
};

export default function ShutterGlyphWordmark({
  text,
  label,
  animate = true,
  className = "",
}: ShutterGlyphWordmarkProps) {
  const chars = Array.from(text);
  const shutterAt = chars.indexOf("*");

  const rootRef = React.useRef<HTMLDivElement>(null);
  const shutterRef = React.useRef<SVGSVGElement>(null);
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
    if (shutterAt < 0) return;
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
  }, [shutterAt, still, visible, turns]);

  const onPointer = (e: React.PointerEvent<HTMLElement>) => {
    const p = ptr.current;
    p.inside = e.type !== "pointerleave";
    const svg = shutterRef.current;
    if (!svg) return;
    // Pointer in the shutter's own units, from its on-screen box.
    const r = svg.getBoundingClientRect();
    const scale = r.width / SHUTTER || 1;
    p.x = (e.clientX - r.left) / scale;
    p.y = (e.clientY - r.top) / scale;
  };

  const flip = (e: React.MouseEvent<HTMLElement>) => {
    if (still) return;
    const el = e.currentTarget;
    el.classList.remove("is-flip");
    void el.getBoundingClientRect();
    el.classList.add("is-flip");
  };

  const rest = restPivot(turns);
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
      <div className="sgf-line" aria-hidden="true">
        {chars.map((ch, i) => {
          if (ch.trim() === "") return <span key={i} className="sgf-gap" />;
          const rise = { "--sgf-d": 200 + n++ * 70 + "ms" } as React.CSSProperties;
          if (i === shutterAt) {
            return (
              <span key={i} className="sgf-ch">
                <span className="sgf-rise" style={rise}>
                  <svg
                    ref={shutterRef}
                    className="sgf-sh sgf-g"
                    viewBox={"0 0 " + SHUTTER + " " + SHUTTER}
                    focusable="false"
                    onClick={() => setTurns((t) => t + 1)}
                  >
                    {blades(rest[0], rest[1], turns).map((pts, b) => (
                      <polygon
                        key={b}
                        ref={(el) => {
                          bladeRefs.current[b] = el;
                        }}
                        points={pts.map(f).join(" ")}
                      />
                    ))}
                  </svg>
                </span>
              </span>
            );
          }
          return (
            <span key={i} className="sgf-ch">
              <span className="sgf-rise" style={rise}>
                <span
                  className="sgf-g sgf-flip"
                  onClick={flip}
                  onAnimationEnd={(e) => e.currentTarget.classList.remove("is-flip")}
                >
                  <span className="sgf-half sgf-up">{ch}</span>
                  <span className="sgf-half sgf-dn">{ch}</span>
                </span>
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
