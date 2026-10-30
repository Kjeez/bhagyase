// One invite is shared several ways: by both families, by the bride's side,
// by the groom's side, and as a reception-only invite (for each of those).
// viewOf() works out what a given link should show, so every template
// handles sides, receptions, blessings and families the same way.

export const SIDES = ["both", "bride", "groom"];

export const BLESSINGS = {
  ganesh: {
    label: "Ganesh shloka",
    kicker: "॥ श्री गणेशाय नमः ॥",
    verse: ["वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।", "निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥"],
    lang: "sa",
  },
  ikonkar: {
    label: "Ik Onkar (ੴ)",
    kicker: "ੴ",
    verse: ["ਗੁਰੁ ਪੂਰਾ ਆਰਾਧੇ ॥ ਕਾਰਜ ਸਗਲੇ ਸਾਧੇ ॥", "ਸਗਲ ਮਨੋਰਥ ਪੂਰੇ ॥ ਬਾਜੇ ਅਨਹਦ ਤੂਰੇ ॥੧॥"],
    lang: "pa",
  },
  none: { label: "No blessing line" },
};

// "/invite/slug", "/invite/slug/bride", "/invite/slug/groom/reception", …
export function viewPath(slug, side = "both", event = "wedding") {
  return `/invite/${slug}${side !== "both" ? `/${side}` : ""}${event === "reception" ? "/reception" : ""}`;
}

// URL segments after the slug → { side, event }, or null if they don't make sense.
export function parseView(parts = []) {
  let side = "both";
  let event = "wedding";
  const rest = [...parts];
  if (rest[0] === "bride" || rest[0] === "groom") side = rest.shift();
  if (rest[0] === "reception") {
    event = "reception";
    rest.shift();
  }
  return rest.length ? null : { side, event };
}

export const hasReception = (data) => Boolean(data.reception?.dateISO);

// "Son of Mr. & Mrs. Sharma" → "Mr. & Mrs. Sharma" for the family block
const stripRelation = (line = "") => line.replace(/^\s*(son|daughter|grandson|granddaughter)\s+of\s+/i, "").trim();

function personOf(data, who) {
  const contact = data[`${who}Contact`] || {};
  return {
    who,
    name: (data[who] || "").trim(),
    parents: data[`${who}Parents`] || "",
    lines: [data[`${who}Line1`], data[`${who}Line2`]].filter(Boolean),
    grandparents: data[`${who}Grandparents`] || "",
    family: data[`${who}Family`] || "",
    contact: { name: (contact.name || "").trim(), phone: (contact.phone || "").trim() },
    blessing: BLESSINGS[data.blessing?.[who]] ? data.blessing[who] : "none",
  };
}

const unique = (xs) => [...new Set(xs)];

export function viewOf(data, side = "both", event = "wedding") {
  const bride = personOf(data, "bride");
  const groom = personOf(data, "groom");
  const couple = side === "bride" ? [bride, groom] : [groom, bride];
  const families = side === "both" ? [groom, bride] : [couple[0]];

  const reception = hasReception(data) ? data.reception : null;
  const isReception = event === "reception" && Boolean(reception);

  const familyRows = [
    ["Grandparents", families.map((p) => p.grandparents).filter(Boolean).join("\n")],
    ["Parents", families.map((p) => stripRelation(p.parents)).filter(Boolean).join("\n")],
    ["Family & Relatives", families.map((p) => p.family).filter(Boolean).join(" & ")],
  ].filter(([, v]) => v);

  const chapters = data.storyChapters.filter((c) => c.title?.trim() || c.text?.trim());
  const legacyStory = (data.story || "")
    .split(/\n\s*\n/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((text) => ({ title: "", text }));

  return {
    side,
    event: isReception ? "reception" : "wedding",
    isReception,
    couple,
    first: couple[0],
    second: couple[1],
    names: `${couple[0].name} & ${couple[1].name}`,
    blessings: unique(families.map((p) => p.blessing)).filter((b) => b !== "none"),
    dateISO: isReception ? reception.dateISO : data.dateISO,
    venue: isReception
      ? { name: reception.venueName, address: reception.venueAddress, maps: reception.mapsUrl }
      : { name: data.venueName, address: data.venueAddress, maps: data.mapsUrl },
    reception,
    familyRows,
    contacts: families.map((p) => p.contact).filter((c) => c.name || c.phone),
    chapters: chapters.length ? chapters : legacyStory,
    tagline: (data.tagline || "").trim(),
    journey: (data.journey || "").split(",").map((s) => s.trim()).filter(Boolean),
  };
}

// Appended to RSVP messages so the couple sees which link a guest used.
export function viaNote(view) {
  const who = view.side === "bride" ? "bride's family link" : view.side === "groom" ? "groom's family link" : "";
  const what = view.isReception ? "reception invite" : "";
  const parts = [what, who].filter(Boolean);
  return parts.length ? `(via ${parts.join(", ")})` : "";
}
