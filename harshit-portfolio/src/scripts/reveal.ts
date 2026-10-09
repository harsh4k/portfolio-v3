/**
 * Fades sections in as they enter the viewport. The hidden starting state only
 * applies under `.js` with motion allowed (see global.css), so content is never
 * stuck invisible if this script fails or motion is reduced.
 */
const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

if (!("IntersectionObserver" in window)) {
  targets.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  targets.forEach((el) => observer.observe(el));
}
