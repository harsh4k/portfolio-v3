import ShutterGlyphWordmark from "@/components/ui/shutter-glyph-wordmark";
import { profile } from "../data/profile";

/**
 * The footer's HARSHIT CHAUHAN wordmark (src/components/ui/shutter-glyph-wordmark.tsx),
 * set in Audiowide (Footer.astro): the two names with a plain space between
 * them, no shutter mark.
 */
export default function FooterWordmark() {
  return <ShutterGlyphWordmark text={profile.name.toUpperCase()} label={profile.name} />;
}
