import ShutterGlyphWordmark from "@/components/ui/shutter-glyph-wordmark";
import { profile } from "../data/profile";

/**
 * The footer's HARSHIT CHAUHAN wordmark (src/components/ui/shutter-glyph-wordmark.tsx),
 * with the shutter standing in for the space between the names. "wide" sets it
 * on one line; "stacked" puts the names on two, for phones, where one line
 * would be too small to read. Footer.astro renders both and CSS shows one, so
 * the server markup and the hydrated markup always match.
 */

export type WordmarkVariant = "wide" | "stacked";

const LINES: Record<WordmarkVariant, string[]> = {
  wide: ["HARSHIT*CHAUHAN"],
  stacked: ["HARSHIT*", "CHAUHAN"],
};

export const isWordmarkVariant = (v: string | undefined): v is WordmarkVariant => v === "wide" || v === "stacked";

export default function FooterWordmark({ variant }: { variant: WordmarkVariant }) {
  return <ShutterGlyphWordmark lines={LINES[variant]} uid={variant} label={profile.name} />;
}
