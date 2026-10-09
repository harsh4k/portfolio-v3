/**
 * The project cards and archive photos sit in scroll-driven scenes, so the
 * browser's lazy loading only starts fetching them once they are almost on
 * screen, and they pop in a second or two late. Once the 3D intro has
 * loaded (so they never slow it down), fetch them in the background in page
 * order; and if a visitor scrolls
 * faster than that, fetch a section's images as soon as it gets near.
 */
const SECTIONS = ["#work", ".s-my-way"];

function loadNow(images: Iterable<HTMLImageElement>) {
  for (const img of images) img.loading = "eager";
}

function lazyImages(root: ParentNode = document) {
  return [...root.querySelectorAll<HTMLImageElement>('img[loading="lazy"]')];
}

/** Starts one image every STAGGER_MS, in page order, so they don't all compete at once. */
const STAGGER_MS = 150;

function warmInBackground() {
  lazyImages().forEach((img, index) => {
    setTimeout(() => {
      img.loading = "eager";
    }, index * STAGGER_MS);
  });
}

function schedule(fn: () => void) {
  if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(fn, { timeout: 1000 });
  else setTimeout(fn, 50);
}

const nearby = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      loadNow(lazyImages(entry.target));
      nearby.unobserve(entry.target);
    }
  },
  { rootMargin: "200% 0px" },
);

for (const selector of SECTIONS) {
  const section = document.querySelector(selector);
  if (section) nearby.observe(section);
}

// intro:ready: the 3D scene has drawn. portfolio:entered: the visitor is in the
// site (also fired straight after load under Reduced Motion, or if the intro fails).
let warmed = false;
const start = () => {
  if (warmed) return;
  warmed = true;
  schedule(warmInBackground);
};
window.addEventListener("intro:ready", start, { once: true });
window.addEventListener("portfolio:entered", start, { once: true });
