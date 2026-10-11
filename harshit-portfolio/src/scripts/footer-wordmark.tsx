import { hydrateRoot } from "react-dom/client";
import FooterWordmark, { isWordmarkVariant } from "../components/FooterWordmark";

/*
  Hydrated by hand rather than with an Astro client: directive, because the
  island runtime Astro adds is an inline script and the CSP in public/_headers
  blocks inline scripts.
*/
for (const mount of document.querySelectorAll<HTMLElement>(".js-wordmark")) {
  const variant = mount.dataset["variant"];
  if (isWordmarkVariant(variant)) hydrateRoot(mount, <FooterWordmark variant={variant} />);
}
