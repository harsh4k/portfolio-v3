/*
 * Retires the service worker the previous version of this site installed.
 *
 * Browsers re-check /sw.js on every visit. Returning visitors pick up this file,
 * which deletes every cache the old worker filled, unregisters itself and
 * reloads open tabs, so nobody stays pinned to the old site. The new site never
 * registers a worker, so this runs once per old install and then is inert.
 */
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      for (const client of clients) client.navigate(client.url);
    })(),
  );
});
