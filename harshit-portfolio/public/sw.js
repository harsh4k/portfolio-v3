/*
 * Offline service worker.
 *
 * The precache list is not written by hand: scripts/precache.ts walks the built
 * dist/ after every `npm run build` and rewrites the block below with every
 * shipped file and its content hash. Editing that block here does nothing.
 *
 * Two tiers, so a phone is not made to download the whole site during first paint:
 *   shell: fetched during install. Every page, the CSS, the scripts, the fonts
 *          and icons. Enough to render every page with the network gone.
 *   bulk:  images, WebGL textures, the resume and its PDF viewer. Fetched when
 *          the page asks (src/scripts/offline.ts), at idle after load, and never
 *          on a save-data or 2G connection.
 *
 * Pages are network-first, so online visitors always get the current deploy,
 * and fall back to the cache when the network fails or stalls. Everything else
 * is cache-first: the cache name carries a hash of the whole manifest, so a
 * changed file always lands in a new cache.
 */

/* precache:start */
const PRECACHE_MANIFEST = { version: "dev", shell: [], bulk: [] };
/* precache:end */

const CACHE_PREFIX = "hc-precache-";
const CACHE = `${CACHE_PREFIX}${PRECACHE_MANIFEST.version}`;

// The url -> hash map of what a cache holds, so the next version can adopt the
// files that did not change instead of downloading them again. Never served.
const META_URL = "/__precache-meta__";

// How long a page request may take before the cached copy is shown instead.
const NAVIGATION_TIMEOUT_MS = 3000;

const ALL_ENTRIES = [...PRECACHE_MANIFEST.shell, ...PRECACHE_MANIFEST.bulk];

/** Copy every still-current entry out of older caches. Returns the urls it took. */
async function adoptUnchanged(cache) {
  const adopted = new Set();
  const names = (await caches.keys()).filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE);

  for (const name of names) {
    const previous = await caches.open(name);
    const metaResponse = await previous.match(META_URL);
    if (!metaResponse) continue;

    let meta;
    try {
      meta = await metaResponse.json();
    } catch {
      continue;
    }

    for (const [url, hash] of ALL_ENTRIES) {
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
 * Drop the redirect flag before a response goes in the cache.
 *
 * Cloudflare Pages redirects /work/x to /work/x/ and /404.html to /404, so
 * those responses arrive marked as redirected. A navigation is made with
 * redirect mode "manual", and handing it a redirected response fails the whole
 * navigation with a network error. A fresh Response with the same body has no flag.
 */
async function cacheable(response) {
  if (!response.redirected) return response;
  return new Response(await response.blob(), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

/**
 * Fetch entries into the cache, six at a time. `no-cache` revalidates, so a
 * stale HTTP-cached copy is never promoted into the precache. A failure leaves
 * a gap that the next load fills.
 */
async function fillCache(cache, urls, onProgress) {
  const queue = urls.slice();
  const total = urls.length;
  let done = 0;

  const worker = async () => {
    for (let url = queue.shift(); url !== undefined; url = queue.shift()) {
      try {
        if (!(await cache.match(url))) {
          const response = await fetch(url, { cache: "no-cache" });
          // The 404 page is the one entry that is meant to come back as a 404.
          if (response.ok || (url === "/404" && response.status === 404)) {
            await cache.put(url, await cacheable(response));
          }
        }
      } catch {
        // Offline mid-fill: leave the gap for next time.
      }
      done += 1;
      if (onProgress) onProgress(done, total);
    }
  };

  await Promise.all(Array.from({ length: 6 }, worker));
}

function writeMeta(cache) {
  return cache.put(
    META_URL,
    new Response(JSON.stringify(Object.fromEntries(ALL_ENTRIES)), {
      headers: { "Content-Type": "application/json" },
    }),
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      const adopted = await adoptUnchanged(cache);
      const shell = PRECACHE_MANIFEST.shell.map(([url]) => url).filter((url) => !adopted.has(url));
      await fillCache(cache, shell);
      await writeMeta(cache);
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Also clears whatever the previous site's worker left behind.
      const names = await caches.keys();
      await Promise.all(names.filter((name) => name !== CACHE).map((name) => caches.delete(name)));
      await self.clients.claim();
    })(),
  );
});

/** Fill the bulk tier. The page asks for this once it has loaded and gone idle. */
async function warm() {
  const cache = await caches.open(CACHE);
  await fillCache(
    cache,
    PRECACHE_MANIFEST.bulk.map(([url]) => url),
  );
  const clients = await self.clients.matchAll({ includeUncontrolled: true });
  for (const client of clients) {
    client.postMessage({ type: "precache-complete", version: PRECACHE_MANIFEST.version });
  }
}

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "precache-warm") event.waitUntil(warm());
});

/**
 * Media elements ask for byte ranges and Safari will not play a plain 200 from
 * the Cache API, which ignores the Range header. Build the 206 by hand.
 */
async function rangeResponse(request, cached) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get("range") || "");
  if (!match) return cached;

  const body = await cached.arrayBuffer();
  const size = body.byteLength;
  const start = match[1] ? Number(match[1]) : 0;
  const end = match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;

  if (start > end || start >= size) {
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
  }

  const headers = new Headers(cached.headers);
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  headers.set("Accept-Ranges", "bytes");
  return new Response(body.slice(start, end + 1), { status: 206, statusText: "Partial Content", headers });
}

/**
 * The cache key of the page a path shows: "/" for the home page and the /via/
 * links that serve it, "/work/x" for /work/x, /work/x/ and /work/x/index.html.
 * Null for a path to a file, such as the resume dock's /resume.pdf link.
 */
function pageKey(pathname) {
  if (pathname.startsWith("/via/")) return "/";
  let path = pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return /\.[a-z0-9]+$/i.test(path) ? null : path;
}

async function handleNavigate(event, request, url) {
  const cache = await caches.open(CACHE);
  const key = pageKey(url.pathname);

  // A navigation to a file (a download link, a bookmarked /resume.pdf) must get
  // that file back, never a page saved under its name.
  if (key === null) {
    const direct = await cache.match(url.pathname);
    if (direct) return direct;
    return fetch(request).catch(() => cache.match("/404").then((page) => page || Response.error()));
  }

  const network = fetch(request).then(async (response) => {
    // Opaque redirects (Pages adding a trailing slash) pass through uncached.
    if (response.ok && response.type === "basic") await cache.put(key, await cacheable(response.clone()));
    return response;
  });
  event.waitUntil(network.catch(() => {}));

  const cached = await cache.match(key);
  if (!cached) {
    return network.catch(async () => (await cache.match("/404")) || Response.error());
  }

  const timeout = new Promise((resolve) => setTimeout(() => resolve(cached), NAVIGATION_TIMEOUT_MS));
  // A server error gets the saved copy too; a 404 or a redirect passes through.
  return Promise.race([
    network.then(
      (response) => (response.status >= 500 ? cached : response),
      () => cached,
    ),
    timeout,
  ]);
}

async function handleAsset(request, url) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(url.pathname);
  if (cached) return request.headers.has("range") ? rangeResponse(request, cached) : cached;

  try {
    const response = await fetch(request);
    // A file the manifest left out is still kept, so it works offline after one visit.
    if (response.ok && response.type === "basic" && !request.headers.has("range")) {
      await cache.put(url.pathname, await cacheable(response.clone()));
    }
    return response;
  } catch {
    return Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // The worker's own script, its metadata and Cloudflare's analytics endpoints.
  if (url.pathname === "/sw.js" || url.pathname === META_URL || url.pathname.startsWith("/cdn-cgi/")) return;

  event.respondWith(request.mode === "navigate" ? handleNavigate(event, request, url) : handleAsset(request, url));
});
