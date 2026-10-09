/**
 * Each Highlights tile starts under a black panel with a star that wipes
 * away. The design's engine starts a tile's wipe only once half of it is on
 * screen; phone tiles are tall, so you scrolled past half-covered black
 * blocks that looked like a glitch. Start each tile's wipe as soon as its
 * top edge comes on screen instead, so the same animation plays as the tile
 * arrives rather than after it has sat there half black. The tiles sit in a clipped, transformed block that
 * IntersectionObserver can't see into reliably, so this checks their boxes
 * on scroll. The engine's own `is-revealed` styles are unchanged.
 */
let waiting = [...document.querySelectorAll<HTMLElement>(".js-award")];
let queued = false;

function revealArrived() {
  queued = false;
  const line = window.innerHeight;
  waiting = waiting.filter((tile) => {
    const box = tile.getBoundingClientRect();
    if (box.top >= line) return true;
    tile.classList.add("is-revealed");
    return false;
  });
  if (!waiting.length) window.removeEventListener("scroll", onScroll);
}

function onScroll() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(revealArrived);
}

if (waiting.length) {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/*
 * The engine also throws a burst of smileys when a tile is hovered, and on
 * touchstart. On a phone every scroll that starts on a tile is a
 * touchstart, so scrolling sprayed smileys over the text. Keep touchstart
 * from reaching the tiles, and throw them on a tap (a click) instead, unless
 * the phone's own tap mouseenter already did. Desktop hover is unchanged.
 */
window.addEventListener(
  "touchstart",
  (event) => {
    if (event.target instanceof Element && event.target.closest(".js-award")) event.stopPropagation();
  },
  { capture: true, passive: true },
);

document.addEventListener("click", (event) => {
  if (!(event instanceof PointerEvent) || event.pointerType !== "touch") return;
  const tile = event.target instanceof Element && event.target.closest(".js-award");
  // The engine marks a tile is-active for 100ms while it throws.
  if (tile && !tile.classList.contains("is-active")) tile.dispatchEvent(new MouseEvent("mouseenter"));
});
