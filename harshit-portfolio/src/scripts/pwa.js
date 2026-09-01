/**
 * Register the PWA service worker. Replaces the previous cache-busting
 * unregister loop so Chrome can install the site as a standalone app.
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
      // Offline or unsupported — the site still works as a normal page.
    });
  });
}
