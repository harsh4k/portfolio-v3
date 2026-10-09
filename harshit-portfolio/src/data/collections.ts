import { getCollection, type CollectionEntry } from "astro:content";

type Ordered = "projects" | "archive";

/** Returns entries sorted by `order`, failing the build on duplicate positions. */
export async function getOrdered<C extends Ordered>(name: C): Promise<CollectionEntry<C>[]> {
  const entries = await getCollection(name);
  const seen = new Map<number, string>();
  for (const entry of entries) {
    const clash = seen.get(entry.data.order);
    if (clash) {
      throw new Error(`${name}: "${entry.id}" and "${clash}" share order ${entry.data.order}`);
    }
    seen.set(entry.data.order, entry.id);
  }
  return entries.sort((a, b) => a.data.order - b.data.order);
}
