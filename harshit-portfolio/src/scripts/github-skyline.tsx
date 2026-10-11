import { createRoot } from "react-dom/client";
import ContributionSkyline, { type ContributionDay } from "../components/ui/contribution-skyline";

/*
  Mounts the GitHub section's skyline (src/components/GithubSection.astro).
  Mounted by hand rather than with an Astro client: directive, because the
  island runtime Astro adds is an inline script and the CSP in public/_headers
  blocks inline scripts. The four activity shades are the site's ink mixed into
  its ground, re-read whenever the theme switch changes the colours.
*/
const mount = document.querySelector<HTMLElement>(".js-skyline");

function readDays(raw: string | undefined): ContributionDay[] | null {
  try {
    const parsed: unknown = JSON.parse(raw ?? "");
    if (!Array.isArray(parsed)) return null;
    const days = parsed.filter(
      (day): day is ContributionDay =>
        typeof day === "object" &&
        day !== null &&
        typeof (day as ContributionDay).date === "string" &&
        Number.isFinite((day as ContributionDay).count),
    );
    return days.length ? days : null;
  } catch {
    return null;
  }
}

function shades(): string[] {
  const style = getComputedStyle(document.documentElement);
  const ground = style.getPropertyValue("--color-primary").trim() || "#f40c3f";
  const ink = style.getPropertyValue("--color-secondary").trim() || "#160000";
  // The skyline turns any CSS colour into RGB by painting it, so color-mix() works here.
  return [35, 58, 80, 100].map((amount) => `color-mix(in srgb, ${ink} ${amount}%, ${ground})`);
}

const days = mount ? readDays(mount.dataset["days"]) : null;
if (mount && days) {
  const root = createRoot(mount);
  const render = () => root.render(<ContributionSkyline data={days} palette={shades()} unit="contribution" />);
  render();
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
}
