import type { APIRoute } from "astro";
import { getOrdered } from "../data/collections";
import { llmsText } from "../data/seo";

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error("llms.txt needs `site` set in astro.config.mjs");
  const projects = await getOrdered("projects");
  return new Response(llmsText(site, projects), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
