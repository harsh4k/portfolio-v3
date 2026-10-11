import type { APIRoute } from "astro";

/** Built from `site` in astro.config.mjs, so a domain change updates the sitemap link too. */
export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error("robots.txt needs `site` set in astro.config.mjs");
  const body = ["User-agent: *", "Allow: /", "", `Sitemap: ${new URL("/sitemap.xml", site).href}`, ""].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
