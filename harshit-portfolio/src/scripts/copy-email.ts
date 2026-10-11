import { profile } from "../data/profile";

/**
 * Copies the email address and says so in the page's toast
 * (.js-sn-toast in src/components/SiteNav.astro, a polite live region).
 * Where the clipboard is refused, the toast shows the address to copy by hand.
 */
let hideTimer = 0;

export function toast(message: string) {
  const el = document.querySelector<HTMLElement>(".js-sn-toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("is-shown");
  clearTimeout(hideTimer);
  hideTimer = window.setTimeout(() => el.classList.remove("is-shown"), 2600);
}

export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email);
    toast("Email copied");
  } catch {
    toast(profile.email);
  }
}
