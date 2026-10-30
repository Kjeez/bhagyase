import {
  Yeseva_One, Manrope, Great_Vibes, Tiro_Devanagari_Hindi,
  Cinzel, Cormorant_Garamond, Pinyon_Script, Tiro_Devanagari_Sanskrit, Noto_Serif_Gurmukhi,
} from "next/font/google";

// Landing page type: festive display serif, friendly sans, script for couple
// names, Devanagari for the Hindi accents.
export const display = Yeseva_One({ weight: "400", subsets: ["latin"], variable: "--f-display", display: "swap" });
export const body = Manrope({ subsets: ["latin"], variable: "--f-body", display: "swap" });
export const script = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--f-script", display: "swap" });
export const deva = Tiro_Devanagari_Hindi({ weight: "400", subsets: ["devanagari", "latin"], variable: "--f-deva", display: "swap" });

export const landingFonts = [display, body, script, deva].map((f) => f.variable).join(" ");

// Royal Palace invitation type.
const cinzel = Cinzel({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--rf-cinzel", display: "swap" });
const cormorant = Cormorant_Garamond({ weight: ["400", "500", "600"], style: ["normal", "italic"], subsets: ["latin"], variable: "--rf-body", display: "swap" });
const pinyon = Pinyon_Script({ weight: "400", subsets: ["latin"], variable: "--rf-script", display: "swap" });
const tiroSanskrit = Tiro_Devanagari_Sanskrit({ weight: "400", subsets: ["devanagari", "latin"], variable: "--rf-deva", display: "swap" });
// Gurbani and Ik Onkar for Sikh weddings.
const gurmukhi = Noto_Serif_Gurmukhi({ weight: ["400", "500"], subsets: ["gurmukhi", "latin"], variable: "--rf-gurmukhi", display: "swap" });

export const royalFonts = [cinzel, cormorant, pinyon, tiroSanskrit, gurmukhi].map((f) => f.variable).join(" ");
