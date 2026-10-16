/**
 * Registers the offline service worker (public/sw.js) and, once the page is
 * idle, asks it to cache the images and textures too. Skipped on save-data and
 * 2G connections, where downloading the whole site would cost the visitor.
 * When everything is cached, <html> gets data-offline-ready.
 */

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

function cheapConnection(): boolean {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (!connection) return true;
  return !connection.saveData && !/2g/.test(connection.effectiveType ?? "");
}

function whenIdle(run: () => void) {
  // Without a timeout, requestIdleCallback never fires in a background tab.
  if ("requestIdleCallback" in window) requestIdleCallback(run, { timeout: 5000 });
  else setTimeout(run, 2000);
}

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("message", (event: MessageEvent<{ type?: string }>) => {
    if (event.data?.type === "precache-complete") document.documentElement.dataset.offlineReady = "";
  });

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => navigator.serviceWorker.ready)
      .then((registration) => {
        if (!cheapConnection()) return;
        whenIdle(() => registration.active?.postMessage({ type: "precache-warm" }));
      })
      .catch(() => {
        // No worker (private mode, blocked storage): the site still works online.
      });
  });
}
