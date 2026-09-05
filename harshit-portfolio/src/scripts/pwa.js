/**
 * Register the PWA service worker and ask it to finish going offline.
 *
 * The worker precaches only the shell during install so it does not compete
 * with first paint. The rest of the site — images, WebGL textures, video, the
 * resume — is warmed from here, once the page is loaded and idle.
 */

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("message", (event) => {
    const data = event.data;
    if (!data || typeof data.type !== "string") return;
    if (data.type !== "precache-complete" && data.type !== "precache-progress") return;

    // Exposed for the offline smoke test, which cannot otherwise tell when the
    // warm has finished.
    if (data.type === "precache-complete") window.__precacheComplete = data;
    window.dispatchEvent(new CustomEvent(data.type, { detail: data }));
  });

  window.addEventListener("load", async () => {
    let registration;
    try {
      // updateViaCache "none" keeps sw.js itself out of the HTTP cache. The
      // engine bundles have fixed filenames and patched contents, so a stale
      // worker would pin a visitor to old code with no way to notice.
      registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });
      registration.update().catch(() => {});
    } catch {
      // Offline, unsupported, or blocked. The site still works as a plain page.
      return;
    }

    const connection = navigator.connection;
    if (connection && (connection.saveData || /(^|-)2g$/.test(connection.effectiveType || ""))) {
      return;
    }

    // The timeout is not optional. A bare requestIdleCallback never fires in a
    // background tab, so a visitor who opened the site in one and left it there
    // would never finish caching — which is exactly the visitor this is for.
    const whenIdle = window.requestIdleCallback
      ? (fn) => window.requestIdleCallback(fn, { timeout: 3000 })
      : (fn) => window.setTimeout(fn, 2000);

    whenIdle(async () => {
      const ready = await navigator.serviceWorker.ready.catch(() => null);
      const worker = (ready && ready.active) || navigator.serviceWorker.controller;
      if (worker) worker.postMessage({ type: "precache-warm" });
    });
  });
}
