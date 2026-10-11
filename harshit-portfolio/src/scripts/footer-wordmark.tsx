import { hydrateRoot } from "react-dom/client";
import FooterWordmark from "../components/FooterWordmark";

/*
  Hydrated by hand rather than with an Astro client: directive, because the
  island runtime Astro adds is an inline script and the CSP in public/_headers
  blocks inline scripts.
*/
const mount = document.querySelector(".js-wordmark");
if (mount) hydrateRoot(mount, <FooterWordmark />);
