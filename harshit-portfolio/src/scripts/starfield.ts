/**
 * A lightweight night sky on a 2D canvas: twinkling stars, occasional shooting
 * stars, a little parallax under the pointer, and a shooting star wherever the
 * visitor clicks or taps the sky.
 *
 * Cost control, because this sits behind the hero:
 *   - draws only while the canvas is on screen and the tab is visible
 *   - device pixel ratio capped at 2, star count capped by area
 *   - prefers-reduced-motion gets one static frame and nothing else
 */

interface Star {
  x: number;
  y: number;
  r: number;
  depth: number;
  phase: number;
  speed: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  ttl: number;
  length: number;
}

export interface StarfieldOptions {
  /** Pixels of canvas area per star. Lower is denser. */
  areaPerStar?: number;
  maxStars?: number;
  /** Mean seconds between ambient shooting stars; 0 disables them. */
  meteorEvery?: number;
  /** Element that listens for clicks/taps to launch a shooting star. */
  interactiveArea?: HTMLElement | null;
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

export function createStarfield(canvas: HTMLCanvasElement, options: StarfieldOptions = {}) {
  const { areaPerStar = 5200, maxStars = 240, meteorEvery = 4.5, interactiveArea = null } = options;
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  let width = 0;
  let height = 0;
  let dpr = 1;
  let stars: Star[] = [];
  const meteors: Meteor[] = [];
  let starColor = "#fff";
  let accentColor = "#ffb547";
  let accentClear = "rgba(255, 181, 71, 0)";
  let running = false;
  let onScreen = false;
  let frame = 0;
  let last = 0;
  let nextMeteor = 0;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

  const readColors = () => {
    const styles = getComputedStyle(canvas);
    starColor = styles.getPropertyValue("--star").trim() || starColor;
    accentColor = styles.getPropertyValue("--accent").trim() || accentColor;
    // Fade the tail to the accent at zero alpha. Fading to "transparent" would
    // pass through black and leave a grey smear on the light theme.
    const hex = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(accentColor);
    if (hex) {
      const [r, g, b] = hex.slice(1).map((part) => parseInt(part, 16));
      accentClear = `rgba(${r}, ${g}, ${b}, 0)`;
    }
  };

  const seed = () => {
    const count = Math.min(maxStars, Math.round((width * height) / areaPerStar));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.1 + 0.35,
      depth: Math.random() * 0.8 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 1.2 + 0.4,
    }));
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
    if (!running) draw(performance.now());
  };

  const launch = (x: number, y: number) => {
    // Mostly down and to the left, like the classic streak across a sky.
    const angle = Math.PI * (0.72 + Math.random() * 0.1);
    const speed = 520 + Math.random() * 260;
    meteors.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      ttl: 0.9 + Math.random() * 0.5,
      length: 90 + Math.random() * 80,
    });
    if (meteors.length > 6) meteors.shift();
  };

  const scheduleMeteor = (now: number) => {
    nextMeteor = now + (meteorEvery * 0.5 + Math.random() * meteorEvery) * 1000;
  };

  const draw = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000 || 0);
    last = now;
    const t = now / 1000;
    const still = reducedMotion.matches;

    pointer.x += (pointer.tx - pointer.x) * 0.06;
    pointer.y += (pointer.ty - pointer.y) * 0.06;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = starColor;
    for (const star of stars) {
      const twinkle = still ? 0.8 : 0.55 + 0.45 * Math.sin(t * star.speed + star.phase);
      const x = star.x + pointer.x * 14 * star.depth;
      const y = star.y + pointer.y * 10 * star.depth;
      ctx.globalAlpha = twinkle * (0.35 + star.depth * 0.65);
      ctx.beginPath();
      ctx.arc(x, y, star.r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!still) {
      if (meteorEvery > 0 && now >= nextMeteor) {
        launch(width * (0.35 + Math.random() * 0.65), height * Math.random() * 0.35);
        scheduleMeteor(now);
      }
      for (const m of [...meteors]) {
        m.life += dt;
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        const progress = m.life / m.ttl;
        if (progress >= 1) {
          meteors.splice(meteors.indexOf(m), 1);
          continue;
        }
        const fade = Math.sin(progress * Math.PI);
        const norm = Math.hypot(m.vx, m.vy);
        const tailX = m.x - (m.vx / norm) * m.length;
        const tailY = m.y - (m.vy / norm) * m.length;
        const gradient = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        gradient.addColorStop(0, accentColor);
        gradient.addColorStop(1, accentClear);
        ctx.globalAlpha = fade;
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = starColor;
      }
    }
    ctx.globalAlpha = 1;
  };

  const loop = (now: number) => {
    draw(now);
    frame = requestAnimationFrame(loop);
  };

  const sync = () => {
    const shouldRun = onScreen && !document.hidden && !reducedMotion.matches;
    if (shouldRun && !running) {
      running = true;
      last = performance.now();
      if (!nextMeteor) scheduleMeteor(last - meteorEvery * 600);
      frame = requestAnimationFrame(loop);
    } else if (!shouldRun && running) {
      running = false;
      cancelAnimationFrame(frame);
      draw(performance.now());
    }
  };

  const visibility = new IntersectionObserver(([entry]) => {
    onScreen = entry?.isIntersecting ?? false;
    sync();
  });
  visibility.observe(canvas);

  const sizeObserver = new ResizeObserver(resize);
  sizeObserver.observe(canvas);

  // Stars take their colours from the theme, which can change from the toggle
  // (data-theme) or from the OS setting.
  const onThemeChange = () => {
    readColors();
    if (!running) draw(performance.now());
  };
  const themeObserver = new MutationObserver(onThemeChange);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  systemTheme.addEventListener("change", onThemeChange);

  const onPointerMove = (event: PointerEvent) => {
    if (!finePointer.matches || reducedMotion.matches) return;
    pointer.tx = event.clientX / window.innerWidth - 0.5;
    pointer.ty = event.clientY / window.innerHeight - 0.5;
  };

  // Primary button only, and never on a link or control: a middle or right
  // click, or a click on a real link, must behave exactly as the browser intends.
  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 || reducedMotion.matches) return;
    if (event.target instanceof Element && event.target.closest("a, button, input, label, [data-no-sky]")) return;
    const rect = canvas.getBoundingClientRect();
    launch(event.clientX - rect.left, event.clientY - rect.top);
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  interactiveArea?.addEventListener("pointerdown", onPointerDown, { passive: true });
  document.addEventListener("visibilitychange", sync);
  reducedMotion.addEventListener("change", sync);

  readColors();
  resize();

  return () => {
    running = false;
    cancelAnimationFrame(frame);
    visibility.disconnect();
    sizeObserver.disconnect();
    themeObserver.disconnect();
    systemTheme.removeEventListener("change", onThemeChange);
    window.removeEventListener("pointermove", onPointerMove);
    interactiveArea?.removeEventListener("pointerdown", onPointerDown);
    document.removeEventListener("visibilitychange", sync);
    reducedMotion.removeEventListener("change", sync);
  };
}
