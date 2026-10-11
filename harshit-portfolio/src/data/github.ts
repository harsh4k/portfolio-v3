/**
 * The GitHub contribution year for the GitHub section, fetched once when the
 * site builds, so visitors' browsers make no calls to GitHub. It reads the
 * same public calendar github.com shows on the profile page; no token needed.
 * Any failure (offline build, GitHub down, markup changed) returns null and
 * the page simply leaves the section out.
 */

export interface ContributionDay {
  date: string;
  /** GitHub's own 0–4 shading level for the day. */
  level: number;
  /** Contributions that day, from the cell's tooltip. */
  count: number;
}

export interface Contributions {
  days: ContributionDay[];
  /** "N contributions in the last year", when GitHub states it. */
  total?: number;
}

/**
 * Pulls days out of GitHub's calendar markup: every cell carrying data-date,
 * data-level and an id, with its count read from the tooltip pointing at that
 * id ("No contributions on …", "1 contribution on …", "12 contributions on …").
 */
export function parseContributions(html: string): Contributions | null {
  const counts = new Map<string, number>();
  for (const [, id, text] of html.matchAll(/<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const count = /^\s*(No|[\d,]+)\s+contributions?\b/i.exec(text ?? "")?.[1];
    if (id && count) counts.set(id, count.toLowerCase() === "no" ? 0 : Number(count.replaceAll(",", "")));
  }
  const days: ContributionDay[] = [];
  for (const [cell] of html.matchAll(/<td\b[^>]*>/g)) {
    const date = /\bdata-date="(\d{4}-\d{2}-\d{2})"/.exec(cell)?.[1];
    const level = /\bdata-level="([0-4])"/.exec(cell)?.[1];
    const count = counts.get(/\bid="([^"]+)"/.exec(cell)?.[1] ?? "");
    if (date && level && count !== undefined) days.push({ date, level: Number(level), count });
  }
  // A year has 365+ cells; much less means the markup isn't what this expects.
  if (days.length < 300) return null;
  days.sort((a, b) => a.date.localeCompare(b.date));
  const total = /([\d,]+)\s+contributions?\s+in the last year/i.exec(html)?.[1];
  return total ? { days, total: Number(total.replaceAll(",", "")) } : { days };
}

let cached: Promise<Contributions | null> | undefined;

export function getContributions(user: string): Promise<Contributions | null> {
  cached ??= (async () => {
    try {
      const response = await fetch(`https://github.com/users/${encodeURIComponent(user)}/contributions`, {
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const parsed = parseContributions(await response.text());
      console.info(`[github] contribution year: ${parsed ? `${parsed.days.length} days` : "not recognised, left out"}`);
      return parsed;
    } catch (error) {
      console.info(`[github] contribution year left out: ${error instanceof Error ? error.message : String(error)}`);
      return null;
    }
  })();
  return cached;
}
