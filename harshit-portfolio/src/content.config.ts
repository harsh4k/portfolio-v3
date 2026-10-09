import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Every entry is validated at build time. A bad URL, a missing image or a
 * duplicate position fails `astro build` instead of shipping a broken card.
 */

const httpsUrl = z.url().refine((value) => value.startsWith("https://"), "Links must use https://");

const projects = defineCollection({
  loader: file("src/content/projects.json"),
  schema: ({ image }) =>
    z.object({
      order: z.number().int().positive(),
      title: z.string().trim().min(1).max(40),
      url: httpsUrl,
      image: image(),
      summary: z.string().trim().min(1).max(120).optional(),
    }),
});

const archive = defineCollection({
  loader: file("src/content/archive.json"),
  schema: ({ image }) =>
    z.object({
      order: z.number().int().positive(),
      caption: z.string().trim().min(1).max(60),
      image: image(),
    }),
});

export const collections = { projects, archive };
