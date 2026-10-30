// Default data for a new invitation.
// Everything here is editable from the editor.

import { DEFAULT_TEMPLATE, validTemplate } from "@/lib/templates";

const EMPTY_CHAPTERS = Array.from({ length: 4 }, () => ({ title: "", text: "" }));

export const DEFAULT_DATA = {
  template: DEFAULT_TEMPLATE,
  groom: "Aarav",
  groomParents: "Son of Mr. & Mrs. Sharma",
  groomLine1: "",
  groomLine2: "",
  bride: "Meher",
  brideParents: "Daughter of Mr. & Mrs. Kapoor",
  brideLine1: "",
  brideLine2: "",
  story: "", // older free-text story; storyChapters replaces it
  tagline: "", // short line under the names, e.g. "From a Delhi school to forever"
  journey: "", // places that shaped you, e.g. "Himachal, Delhi, Punjab" (commas or ·)
  storyIntro: "",
  storyIntroSub: "", // small line under the story heading, e.g. "and one Delhi school"
  storyChapters: EMPTY_CHAPTERS,
  // Each family's own details — used by its side link (/bride, /groom)
  blessing: { bride: "ganesh", groom: "ganesh" }, // ganesh | ikonkar | none
  brideGrandparents: "",
  groomGrandparents: "",
  brideFamily: "",
  groomFamily: "",
  brideContact: { name: "", phone: "" },
  groomContact: { name: "", phone: "" },
  contacts: [], // more numbers shown on every link, [{ name, phone }], up to 3
  compliments: "All Near & Dear Ones", // "With best compliments" line; empty hides it
  // Optional reception — fills in the reception-only link
  reception: { dateISO: "", venueName: "", venueAddress: "", mapsUrl: "" },
  welcomeMsg:
    "With hearts full of joy, we welcome you to our wedding. As we begin our journey together in faith and love, we thank you for being part of this blessed occasion.",
  dateISO: "2026-12-06T19:00",
  photos: [],
  musicUrl: "",
  timeline: [
    { title: "Guest Arrival", when: "", desc: "We welcome you..!" },
    { title: "Wedding Ceremony", when: "", desc: "" },
    { title: "Reception", when: "", desc: "" },
  ],
  venueName: "",
  venueAddress: "",
  mapsUrl: "",
  dressWomen: "Elegant formal attire in pastel or jewel tones",
  dressMen: "Suit or traditional formal wear",
  preEvents: [
    { title: "Mehndi", when: "", where: "" },
    { title: "Haldi", when: "", where: "" },
    { title: "Sangeet", when: "", where: "" },
  ],
  transport: "",
  accommodation: "",
  giftsNote:
    "Your love, blessings, and presence are the greatest gifts we could ever ask for.",
  closing: "We can't wait to celebrate with you!",
  show: {
    scratch: true,
    slideshow: true,
    countdown: true,
    timeline: true,
    dress: true,
    preEvents: true,
    transport: false,
    stay: false,
    gifts: true,
    rsvp: true,
  },
};

export function slugify(groom, bride) {
  const base = `${groom}-weds-${bride}`
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-");
  const rand = Math.random().toString(36).slice(2, 6);
  return `${base}-${rand}`;
}

// Drafts saved by the first version of the Royal love-letter editor used
// tradition / places / family; read them into today's fields.
const TRADITION_BLESSING = {
  hindu: { bride: "ganesh", groom: "ganesh" },
  sikh: { bride: "ikonkar", groom: "ikonkar" },
  both: { bride: "ganesh", groom: "ikonkar" },
  none: { bride: "none", groom: "none" },
};

function upgrade(input) {
  if (!input.tradition && !input.places && !input.family) return input;
  const fam = input.family || {};
  const { tradition, places, family, ...rest } = input;
  return {
    blessing: TRADITION_BLESSING[tradition],
    journey: places,
    groomGrandparents: fam.grandparents,
    groomFamily: fam.relatives,
    compliments: fam.compliments,
    ...Object.fromEntries(Object.entries(rest).filter(([, v]) => v !== undefined)),
  };
}

export function mergeData(raw = {}) {
  const input = upgrade(raw);
  return {
    ...DEFAULT_DATA,
    ...Object.fromEntries(Object.entries(input).filter(([, v]) => v !== undefined)),
    template: validTemplate(input.template),
    timeline: (input.timeline?.length ? input.timeline : DEFAULT_DATA.timeline).slice(0, 8),
    preEvents: (input.preEvents?.length ? input.preEvents : DEFAULT_DATA.preEvents).slice(0, 8),
    photos: (input.photos || []).slice(0, 30), // the plan decides how many are shown
    show: { ...DEFAULT_DATA.show, ...(input.show || {}) },
    storyChapters: EMPTY_CHAPTERS.map((c, i) => ({ ...c, ...(input.storyChapters?.[i] || {}) })),
    blessing: { ...DEFAULT_DATA.blessing, ...(input.blessing || {}) },
    brideContact: { ...DEFAULT_DATA.brideContact, ...(input.brideContact || {}) },
    groomContact: { ...DEFAULT_DATA.groomContact, ...(input.groomContact || {}) },
    reception: { ...DEFAULT_DATA.reception, ...(input.reception || {}) },
    contacts: (input.contacts || []).slice(0, 3),
  };
}
