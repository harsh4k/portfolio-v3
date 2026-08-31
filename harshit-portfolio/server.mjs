import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)));
const port = Number(process.env.PORT || 4175);

const types = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function sendFile(request, response, filePath) {
  const info = statSync(filePath);
  const type = types[extname(filePath).toLowerCase()] || "application/octet-stream";
  const baseHeaders = {
    "Accept-Ranges": "bytes",
    "Cache-Control": "no-cache",
    "Content-Type": type,
  };
  const range = request.headers.range;

  if (!range) {
    response.writeHead(200, { ...baseHeaders, "Content-Length": info.size });
    if (request.method === "HEAD") return response.end();
    return createReadStream(filePath).pipe(response);
  }

  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  if (!match) {
    response.writeHead(416, { "Content-Range": `bytes */${info.size}` });
    return response.end();
  }

  const start = match[1] ? Number(match[1]) : 0;
  const end = match[2] ? Math.min(Number(match[2]), info.size - 1) : info.size - 1;
  if (start > end || start >= info.size) {
    response.writeHead(416, { "Content-Range": `bytes */${info.size}` });
    return response.end();
  }

  response.writeHead(206, {
    ...baseHeaders,
    "Content-Length": end - start + 1,
    "Content-Range": `bytes ${start}-${end}/${info.size}`,
  });
  if (request.method === "HEAD") return response.end();
  return createReadStream(filePath, { start, end }).pipe(response);
}

/** Resolve a URL pathname against public/, src/, and root directories */
function resolveFile(pathname) {
  const relative = pathname === "/" ? "index.html" : normalize(pathname).replace(/^[/\\]+/, "");
  
  // Search candidates in order: public/, src/, root
  const candidates = [
    resolve(root, "public", relative),
    resolve(root, "src", relative),
    resolve(root, relative),
  ];

  for (const candidate of candidates) {
    // Security check: Must reside within root directory
    if (!candidate.startsWith(root + sep) && candidate !== resolve(root, "index.html")) {
      continue;
    }
    try {
      if (existsSync(candidate) && statSync(candidate).isFile()) {
        return candidate;
      }
    } catch {
      // Continue to next candidate
    }
  }

  return null;
}

const server = createServer((request, response) => {
  if (!request.url || !["GET", "HEAD"].includes(request.method || "")) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, `http://127.0.0.1`).pathname);
  } catch {
    response.writeHead(400);
    response.end();
    return;
  }

  const filePath = resolveFile(pathname);
  if (!filePath) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(`404 Not Found: ${pathname}`);
    return;
  }

  sendFile(request, response, filePath);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://127.0.0.1:${port}/ (root: ${root})`);
});
