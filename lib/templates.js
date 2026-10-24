// Invitation designs a couple can choose from. The id is stored in
// invites.data.template (and mirrored to the invites.template column).

export const TEMPLATES = {
  "marigold-mela": {
    id: "marigold-mela",
    name: "Marigold Mela",
    blurb: "Festive and joyful — curtains, marigolds, dancing family.",
    swatch: ["#FFF8EC", "#F5A524", "#C8102E"],
  },
  "emerald-noir": {
    id: "emerald-noir",
    name: "Emerald Noir",
    blurb: "Black, gold and candlelight elegance.",
    swatch: ["#0e100f", "#d4af37", "#e9e4d8"],
  },
};

export const DEFAULT_TEMPLATE = "marigold-mela";

export const validTemplate = (id) => (TEMPLATES[id] ? id : DEFAULT_TEMPLATE);

// Invites made before templates were selectable only have the column set.
export const templateOf = (invite) => validTemplate(invite?.data?.template || invite?.template);
