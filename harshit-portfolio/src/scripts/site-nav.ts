import { copyEmail } from "./copy-email";

/**
 * The section index and the command menu (src/components/SiteNav.astro).
 */

declare global {
  interface Window {
    lenis?: { scrollTo(target: Element | number, options?: { duration?: number; immediate?: boolean }): void };
  }
}

const still = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Scrolls to a section through the design's smooth scroller when it is there. */
function jumpTo(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (window.lenis) window.lenis.scrollTo(target, still() ? { immediate: true } : { duration: 1.2 });
  else target.scrollIntoView({ behavior: still() ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}

/** Same-page section links go through jumpTo; the resume link is left to the resume dock. */
document.addEventListener("click", (event) => {
  const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a.js-sn-jump") : null;
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  closeMenu();
  jumpTo(link.hash.slice(1));
});

// Section index: mark the section that holds the middle of the screen.
const indexLinks = [...document.querySelectorAll<HTMLAnchorElement>(".js-sn-index .js-sn-jump")];
const indexed = indexLinks
  .map((link) => document.getElementById(link.dataset["section"] ?? ""))
  .filter((el): el is HTMLElement => el !== null);
let queued = false;
const markCurrent = () => {
  queued = false;
  const middle = window.innerHeight / 2;
  let current = indexed[0]?.id;
  for (const section of indexed) if (section.getBoundingClientRect().top <= middle) current = section.id;
  indexLinks.forEach((link) => link.setAttribute("aria-current", String(link.dataset["section"] === current)));
};
window.addEventListener(
  "scroll",
  () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(markCurrent);
  },
  { passive: true },
);
markCurrent();

// Command menu.
const menu = document.querySelector<HTMLDialogElement>(".js-sn-menu");
const search = menu?.querySelector<HTMLInputElement>(".js-sn-search");
const items = [...(menu?.querySelectorAll<HTMLElement>(".js-sn-item") ?? [])];
const empty = menu?.querySelector<HTMLElement>(".js-sn-empty");
const opener = document.querySelector<HTMLButtonElement>(".js-sn-open");
let selected = -1;

const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
const keys = document.querySelector(".js-sn-keys");
if (keys && isMac) keys.textContent = "⌘ K";

const visible = () => items.filter((item) => !item.hidden);

function select(index: number) {
  const shown = visible();
  if (!shown.length) {
    selected = -1;
    search?.removeAttribute("aria-activedescendant");
    return;
  }
  selected = (index + shown.length) % shown.length;
  items.forEach((item) => item.setAttribute("aria-selected", "false"));
  const item = shown[selected];
  if (!item) return;
  item.setAttribute("aria-selected", "true");
  search?.setAttribute("aria-activedescendant", item.id);
  item.scrollIntoView({ block: "nearest" });
}

function filter() {
  const words = (search?.value ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  items.forEach((item) => {
    const text = item.dataset["search"] ?? "";
    item.hidden = !words.every((word) => text.includes(word));
  });
  if (empty) empty.hidden = visible().length > 0;
  select(0);
}

function openMenu() {
  if (!menu || menu.open) return;
  if (search) search.value = "";
  filter();
  menu.showModal();
  search?.focus();
}

function closeMenu() {
  if (menu?.open) menu.close();
}

function run(item: HTMLElement | undefined) {
  const action = item?.querySelector<HTMLElement>(".sn-menu__action");
  if (!action) return;
  if (action instanceof HTMLButtonElement) {
    closeMenu();
    if (action.dataset["action"] === "copy-email") void copyEmail();
    // The header's contrast button runs the design's switch and the theme wipe.
    if (action.dataset["action"] === "theme") document.querySelector<HTMLButtonElement>(".js-contrast")?.click();
    return;
  }
  // Links: section jumps, the resume dock and project pages handle their own clicks.
  if (action.classList.contains("js-resume-open")) closeMenu();
  action.click();
}

opener?.addEventListener("click", openMenu);
search?.addEventListener("input", filter);
search?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    select(selected + (event.key === "ArrowDown" ? 1 : -1));
  } else if (event.key === "Enter") {
    event.preventDefault();
    run(visible()[selected]);
  }
});
menu?.addEventListener("click", (event) => {
  // A click on the backdrop lands on the dialog itself.
  if (event.target === menu) closeMenu();
  const item = event.target instanceof Element ? event.target.closest<HTMLElement>(".js-sn-item") : null;
  if (item?.querySelector("button")) {
    event.preventDefault();
    run(item);
  } else if (item?.querySelector(".js-resume-open")) {
    // The resume dock opens under this modal menu unless the menu closes first.
    closeMenu();
  }
});
menu?.addEventListener("close", () => opener?.focus({ preventScroll: true }));

document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() !== "k" || !(event.metaKey || event.ctrlKey) || event.altKey) return;
  if (document.documentElement.classList.contains("is-scroll-blocked")) return;
  event.preventDefault();
  if (menu?.open) closeMenu();
  else openMenu();
});
