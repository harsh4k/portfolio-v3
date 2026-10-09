/**
 * Each Highlights tile starts under a black panel with a star that wipes
 * away. The design's engine starts the wipe only once a tile is half on
 * screen, so on a phone you scroll past half-covered black blocks that
 * look like a glitch. Uncover every tile a screen before the section
 * arrives instead, so the wipes have finished by the time they are seen.
 * (The tiles sit in a clipped, transformed block, so they are watched
 * through the section, which is in normal flow.) The engine's own
 * `is-revealed` styles are unchanged.
 */
const section = document.querySelector("#about");
const tiles = document.querySelectorAll(".js-award");

if (section) {
  const reveal = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      tiles.forEach((tile) => tile.classList.add("is-revealed"));
      reveal.disconnect();
    },
    { rootMargin: "0px 0px 100% 0px" },
  );
  reveal.observe(section);
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
