// Invitation designs a couple can choose from. The id is stored in
// invites.data.template (and mirrored to the invites.template column).

export const TEMPLATES = {
  heartbound: {
    id: "heartbound",
    name: "Heartbound",
    blurb: "A love letter with a heart-shaped seal, moonlit hero and woven borders.",
    swatch: ["#5b0b1f", "#e9a23b", "#f4e4c1"],
  },
  "marigold-mela": {
    id: "marigold-mela",
    name: "Marigold Mela",
    blurb: "Festive and joyful — curtains, marigolds, dancing family.",
    swatch: ["#FFF8EC", "#F5A524", "#C8102E"],
  },
  "royal-palace": {
    id: "royal-palace",
    name: "Royal Palace",
    blurb: "A wax-sealed envelope that opens onto a moonlit palace.",
    swatch: ["#5b0b1f", "#f0cfa2", "#f7f1ed"],
  },
  "emerald-noir": {
    id: "emerald-noir",
    name: "Emerald Noir",
    blurb: "Black, gold and candlelight elegance.",
    swatch: ["#0e100f", "#d4af37", "#e9e4d8"],
  },
};

export const DEFAULT_TEMPLATE = "heartbound";

export const validTemplate = (id) => (TEMPLATES[id] ? id : DEFAULT_TEMPLATE);

// Invites made before templates were selectable only have the column set.
export const templateOf = (invite) => validTemplate(invite?.data?.template || invite?.template);
