/**
 * Each Highlights tile starts under a black panel with a star that wipes
 * away. The design's engine starts the wipe only once a tile is half on
 * screen, so on a phone you scroll past half-covered black blocks that
 * look like a glitch. Start it as soon as a tile comes on screen instead;
 * the engine's own `is-revealed` styles and timing are unchanged.
 */
const tiles = document.querySelectorAll(".js-award");

const reveal = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-revealed");
      reveal.unobserve(entry.target);
    }
  },
  { rootMargin: "0px 0px 10% 0px" },
);

tiles.forEach((tile) => reveal.observe(tile));
