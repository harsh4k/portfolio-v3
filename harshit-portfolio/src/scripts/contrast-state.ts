/**
 * The design's contrast button flips a class on <html> but never says so to
 * assistive tech. Mirror that class into aria-pressed so it announces on/off.
 */
const root = document.documentElement;
const button = document.querySelector<HTMLButtonElement>(".js-contrast");

function sync() {
  button?.setAttribute("aria-pressed", String(root.classList.contains("theme-contrasted")));
}

sync();
new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ["class"] });
