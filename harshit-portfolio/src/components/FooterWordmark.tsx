import ShutterGlyphWordmark from "@/components/ui/shutter-glyph-wordmark";
import { profile } from "../data/profile";

/**
 * The footer's HARSHIT CHAUHAN wordmark (src/components/ui/shutter-glyph-wordmark.tsx),
 * set in Audiowide (Footer.astro), with the shutter standing in for the space
 * between the names.
 */
export default function FooterWordmark() {
  return <ShutterGlyphWordmark text={profile.name.toUpperCase().replace(" ", "*")} label={profile.name} />;
}
