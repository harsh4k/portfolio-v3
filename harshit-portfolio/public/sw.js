/**
 * Offline-first service worker.
 *
 * The precache list is not written by hand — `src/scripts/generate-precache.mjs`
 * walks the assembled dist/ after every build and rewrites the block below with
 * every shipped file and its content hash. Editing that block here is pointless;
 * the build overwrites it.
 *
 * Two tiers, because precaching 11 MB while the page is still painting is a
 * hostile way to treat a phone:
 *
 *   shell — fetched during install. HTML, CSS, the engine bundles, fonts. The
 *           minimum needed to render the site with the network unplugged.
 *   bulk  — images, WebGL textures, video, the resume and its pdf.js viewer.
 *           Warmed only when the page asks (see scripts/pwa.js), which it does
 *           at idle after load, and never on a save-data connection.
 *
 * The cache name carries a hash of the whole manifest, so any changed asset
 * produces a new cache. Unchanged files are copied across from the previous
 * cache instead of being re-downloaded — a deploy that only touches index.html
 * costs one request, not eleven megabytes.
 */

/* precache:start */
const PRECACHE_MANIFEST = { version: "dev", shell: [], bulk: [] };
/* precache:end */

const CACHE_PREFIX = "hc-precache-";
const CACHE = `${CACHE_PREFIX}${PRECACHE_MANIFEST.version}`;

// Where the url -> hash map of a cache's contents is stored, so a later version
// can tell which of its entries are still current and adopt them. Not a real
// route; the fetch handler never serves it.
const META_URL = "/__precache-meta__";

const ALL_ENTRIES = [...PRECACHE_MANIFEST.shell, ...PRECACHE_MANIFEST.bulk];

/** Pull every still-current entry out of previous caches. Returns what it took. */
async function adoptUnchanged(cache) {
  const adopted = new Set();
  const names = (await caches.keys()).filter(
    (name) => name.startsWith(CACHE_PREFIX) && name !== CACHE
  );

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
 * Fetch entries into the cache, a few at a time. `no-cache` forces a
 * revalidation so a stale HTTP-cached copy cannot be promoted into the
 * precache. Individual failures are swallowed: a warm interrupted halfway
 * leaves what it managed to store and picks the rest up on the next load.
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
          if (response.ok) await cache.put(url, response);
        }
      } catch {
        // Offline mid-fill. Nothing to do but leave the gap for next time.
      }
      done += 1;
      if (onProgress) onProgress(done, total);
    }
  };

  await Promise.all(Array.from({ length: 6 }, worker));
}

function writeMeta(cache) {
  const meta = Object.fromEntries(ALL_ENTRIES);
  return cache.put(
    META_URL,
    new Response(JSON.stringify(meta), {
      headers: { "Content-Type": "application/json" },
    })
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      const adopted = await adoptUnchanged(cache);
      const shell = PRECACHE_MANIFEST.shell
        .map(([url]) => url)
        .filter((url) => !adopted.has(url));

      await fillCache(cache, shell);
      await writeMeta(cache);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.filter((name) => name !== CACHE).map((name) => caches.delete(name))
      );
      await self.clients.claim();
    })()
  );
});

/** Warm the bulk tier. Driven by the page so it lands after first paint. */
async function warm() {
  const cache = await caches.open(CACHE);
  const pending = PRECACHE_MANIFEST.bulk.map(([url]) => url);

  const notify = async (message) => {
    const clients = await self.clients.matchAll({ includeUncontrolled: true });
    for (const client of clients) client.postMessage(message);
  };

  let lastReported = 0;
  await fillCache(cache, pending, (done, total) => {
    // Every file would be ~150 messages. Report in 10% steps instead.
    const step = Math.floor((done / total) * 10);
    if (step === lastReported) return;
    lastReported = step;
    notify({ type: "precache-progress", done, total });
  });

  await notify({
    type: "precache-complete",
    version: PRECACHE_MANIFEST.version,
    total: ALL_ENTRIES.length,
  });
}

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "precache-warm") {
    event.waitUntil(warm());
  }
});

/**
 * Safari will not play a video from a plain 200 pulled out of the Cache API —
 * media elements ask for byte ranges and expect a 206 back. Cache.match ignores
 * the Range header, so build the partial response by hand.
 */
async function rangeResponse(request, cached) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get("range") || "");
  if (!match) return cached;

  const body = await cached.arrayBuffer();
  const size = body.byteLength;
  const start = match[1] ? Number(match[1]) : 0;
  const end = match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;

  if (!Number.isFinite(start) || start > end || start >= size) {
    return new Response(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${size}` },
    });
  }

  const headers = new Headers(cached.headers);
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  headers.set("Accept-Ranges", "bytes");

  return new Response(body.slice(start, end + 1), {
    status: 206,
    statusText: "Partial Content",
    headers,
  });
}

async function handleNavigate(request, url) {
  const cache = await caches.open(CACHE);
  const path = url.pathname === "/index.html" ? "/" : url.pathname;

  // A navigation aimed at a file rather than the site — the resume dock's PDF
  // and DOCX download links, or a bookmarked /resume.pdf — has to hand back
  // that file. Serving the document here would download index.html named
  // "Harshit_Chauhan_Resume.pdf".
  if (path !== "/") {
    const direct = await cache.match(path);
    if (direct) return direct;
    try {
      return await fetch(request);
    } catch {
      const fallback = await cache.match("/offline.html");
      return fallback || Response.error();
    }
  }

  // Everything else is the one document — "/?source=pwa" from the installed
  // app, "/#work" from a shortcut — and resolves to the one precached entry.
  const cached = await cache.match("/");
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) await cache.put("/", response.clone());
    return response;
  } catch {
    const fallback = await cache.match("/offline.html");
    return fallback || Response.error();
  }
}

async function handleAsset(request, url) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(url.pathname);

  if (cached) {
    return request.headers.has("range") ? rangeResponse(request, cached) : cached;
  }

  try {
    const response = await fetch(request);
    // Anything reachable but outside the manifest still gets kept, so an asset
    // the generator did not know about is available offline after one visit.
    if (response.ok && response.type === "basic" && !request.headers.has("range")) {
      await cache.put(url.pathname, response.clone());
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
  if (url.pathname === META_URL || url.pathname === "/sw.js") return;

  if (request.mode === "navigate") {
    event.respondWith(handleNavigate(request, url));
    return;
  }

  event.respondWith(handleAsset(request, url));
});
