import { buildHelix } from "./helix";
import { buildRail } from "./rail";
import { mountScrollScene, type SceneBuilder } from "./stage";

/** The WebGL sections in the scroll page; see src/components/ScrollScene.astro. */
const builders: Record<string, SceneBuilder> = { rail: buildRail, helix: buildHelix };

document.querySelectorAll<HTMLElement>("[data-scroll-scene]").forEach((section) => {
  const build = builders[section.dataset["scrollScene"] ?? ""];
  if (build) mountScrollScene(section, build);
});
