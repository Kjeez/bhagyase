import { Yeseva_One, Manrope, Great_Vibes, Tiro_Devanagari_Hindi } from "next/font/google";

// Landing page type: festive display serif, friendly sans, script for couple
// names, Devanagari for the Hindi accents.
export const display = Yeseva_One({ weight: "400", subsets: ["latin"], variable: "--f-display", display: "swap" });
export const body = Manrope({ subsets: ["latin"], variable: "--f-body", display: "swap" });
export const script = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--f-script", display: "swap" });
export const deva = Tiro_Devanagari_Hindi({ weight: "400", subsets: ["devanagari", "latin"], variable: "--f-deva", display: "swap" });

export const landingFonts = [display, body, script, deva].map((f) => f.variable).join(" ");
