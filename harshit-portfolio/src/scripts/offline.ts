/**
 * Registers the offline worker (public/sw.js), then once the page has settled
 * asks it to cache the resume and other downloads too. Skipped on data-saver
 * connections, where only what the site draws with is cached.
 */
function whenIdle(fn: () => void) {
  if ("requestIdleCallback" in window) requestIdleCallback(fn, { timeout: 10_000 });
  else setTimeout(fn, 3_000);
}

async function register() {
  const registration = await navigator.serviceWorker.register("/sw.js");
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  if (saveData) return;
  await navigator.serviceWorker.ready;
  whenIdle(() => registration.active?.postMessage({ type: "offline-warm" }));
}

// Production only: a worker in `astro dev` would serve stale files while editing.
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  const start = () => register().catch(() => {});
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
}
