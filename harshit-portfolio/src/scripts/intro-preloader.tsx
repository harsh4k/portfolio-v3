import { hydrateRoot } from "react-dom/client";
import IntroPreloader from "../components/IntroPreloader";

/*
  Hydrated by hand rather than with an Astro client: directive, because the
  island runtime Astro adds is an inline script and the CSP in public/_headers
  blocks inline scripts. Reduced Motion skips the 3D intro (bridge.js hides the
  layer), so there is nothing to load and the loader is left static.
*/
const mount = document.querySelector(".js-intro-loader");
if (mount && !document.getElementById("intro-layer")?.hidden) {
  hydrateRoot(mount, <IntroPreloader />);
}
