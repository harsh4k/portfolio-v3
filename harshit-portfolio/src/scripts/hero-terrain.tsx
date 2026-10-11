import { createRoot } from "react-dom/client";
import HeroTerrain from "../components/HeroTerrain";

/*
  Mounted by hand rather than with an Astro client: directive, because the
  island runtime Astro adds is an inline script and the CSP in public/_headers
  blocks inline scripts. Client-only: there is nothing to server-render but a
  canvas.
*/
const mount = document.querySelector<HTMLElement>(".js-wire-terrain");
if (mount) createRoot(mount).render(<HeroTerrain mount={mount} />);
