/**
 * Offline worker: after one visit, the whole site works with no connection.
 *
 * The list of files below is not written by hand. The build
 * (src/integrations/offline-precache.ts) walks dist/ and rewrites the block
 * between the markers with every shipped file and a hash of its contents, so
 * editing it here is pointless.
 *
 *   shell — fetched while the worker installs: every page, style, script,
 *           font, image and WebGL texture the site draws with.
 *   bulk  — the resume, its PDF viewer and other downloads. Fetched once the
 *           page asks for it at idle (src/scripts/offline.ts), never on a
 *           data-saver connection.
 *
 * The cache name carries a hash of the whole list, so every deploy that changes
 * a file gets a fresh cache. Files whose hash did not change are copied over
 * from the previous cache rather than downloaded again.
 *
 * Pages are network first, so a new deploy shows up on the next visit; files
 * are cache first, since the cache is replaced whenever any of them changes.
 */

/* precache:start */
const MANIFEST = { version: "dev", shell: [], bulk: [] };
/* precache:end */

const PREFIX = "hc-offline-";
const CACHE = `${PREFIX}${MANIFEST.version}`;
const OFFLINE_PAGE = "/offline/";

// Where a cache keeps the url -> hash list of what it holds, so the next
// version can tell which entries are still current. Never served.
const META_URL = "/__offline-meta__";

const ENTRIES = [...MANIFEST.shell, ...MANIFEST.bulk];

/**
 * Cloudflare Pages redirects /work/x to /work/x/, so a response may arrive with
 * its redirected flag set. Handing such a response to a navigation fails it
 * with a network error, so copy the body into a fresh Response, which drops it.
 */
async function cacheable(response) {
  if (!response.redirected) return response;
  return new Response(await response.blob(), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

/** Copies every entry whose hash is unchanged out of older caches. */
async function adoptUnchanged(cache) {
  const adopted = new Set();
  const older = (await caches.keys()).filter((name) => name.startsWith(PREFIX) && name !== CACHE);
  for (const name of older) {
    const previous = await caches.open(name);
    let meta;
    try {
      meta = await (await previous.match(META_URL))?.json();
    } catch {
      continue;
    }
    if (!meta) continue;
    for (const [url, hash] of ENTRIES) {
      if (adopted.has(url) || meta[url] !== hash) continue;
      const hit = await previous.match(url);
      if (!hit) continue;
      await cache.put(url, hit);
      adopted.add(url);
    }
  }
  return adopted;
}

/**
 * Fetches the urls the cache does not have yet, a few at a time. `no-cache`
 * revalidates against the server, so a stale HTTP-cached copy never ends up in
 * the precache, and a file the page already loaded costs only a 304.
 * With `required`, any failure rejects, so a half-filled shell never activates.
 */
async function fill(cache, urls, required) {
  const queue = [...urls];
  const worker = async () => {
    for (let url = queue.shift(); url !== undefined; url = queue.shift()) {
      try {
        if (await cache.match(url)) continue;
        const response = await fetch(url, { cache: "no-cache" });
        if (!response.ok) throw new Error(`${response.status} ${url}`);
        await cache.put(url, await cacheable(response));
      } catch (error) {
        if (required) throw error;
        // Offline mid-fill: leave the gap for the next visit.
      }
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await adoptUnchanged(cache);
      await fill(
        cache,
        MANIFEST.shell.map(([url]) => url),
        true,
      );
      await cache.put(
        META_URL,
        new Response(JSON.stringify(Object.fromEntries(ENTRIES)), {
          headers: { "Content-Type": "application/json" },
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const stale = (await caches.keys()).filter((name) => name !== CACHE);
      await Promise.all(stale.map((name) => caches.delete(name)));
      if (self.registration.navigationPreload) await self.registration.navigationPreload.enable();
      await self.clients.claim();
      // A cache under another name is the previous site's offline copy. Reload
      // its tabs so nobody stays on the old site.
      if (stale.some((name) => !name.startsWith(PREFIX))) {
        const clients = await self.clients.matchAll({ type: "window" });
        for (const client of clients) client.navigate(client.url);
      }
    })(),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type !== "offline-warm") return;
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      fill(
        cache,
        MANIFEST.bulk.map(([url]) => url),
        false,
      ),
    ),
  );
});

/** The cache key for a page: "/work/x", "/work/x/index.html" and "/work/x/" are one page. */
function pageKey(pathname) {
  if (pathname.startsWith("/via/")) return "/"; // _redirects serves the home page there.
  const path = pathname.replace(/index\.html$/, "");
  return path.endsWith("/") || /\.[a-z0-9]+$/i.test(path) ? path : `${path}/`;
}

async function navigate(event) {
  try {
    const preloaded = await event.preloadResponse;
    if (preloaded) return preloaded;
    return await fetch(event.request);
  } catch {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(pageKey(new URL(event.request.url).pathname));
    return cached ?? (await cache.match(OFFLINE_PAGE)) ?? Response.error();
  }
}

/**
 * Media and the PDF viewer ask for byte ranges and expect a 206 back, but
 * Cache.match ignores the Range header, so cut the partial response by hand.
 */
async function rangeOf(request, cached) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get("range") ?? "");
  if (!match) return cached;
  const body = await cached.arrayBuffer();
  const size = body.byteLength;
  const start = match[1] ? Number(match[1]) : match[2] ? Math.max(0, size - Number(match[2])) : 0;
  const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  if (start > end || start >= size) {
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
  }
  const headers = new Headers(cached.headers);
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  return new Response(body.slice(start, end + 1), { status: 206, statusText: "Partial Content", headers });
}

async function asset(request) {
  const cache = await caches.open(CACHE);
  // ignoreVary: hosts send "Vary: Origin", and fonts and module scripts are
  // requested with an Origin header the precache fetch did not send.
  const cached = await cache.match(request, { ignoreSearch: true, ignoreVary: true });
  if (cached) return request.headers.has("range") ? rangeOf(request, cached) : cached;
  const response = await fetch(request);
  // Keep anything else the site loads too, so it is there next time offline.
  if (response.ok && response.type === "basic" && response.status === 200 && !request.headers.has("range")) {
    await cache.put(request, await cacheable(response.clone()));
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  // Analytics and anything else off-site go straight to the network and fail
  // on their own when offline. /cdn-cgi/ is Cloudflare's, never cached.
  if (request.method !== "GET" || url.origin !== self.location.origin || url.pathname.startsWith("/cdn-cgi/")) return;
  if (request.mode === "navigate") event.respondWith(navigate(event));
  else event.respondWith(asset(request));
});
