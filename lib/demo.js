import { mergeData } from "@/lib/defaults";

// Sample couple for /invite/demo — shown on the landing page as "See a live invite".
export const DEMO_DATA = mergeData({
  groom: "Aarav",
  groomParents: "Son of Mrs. Neelam & Mr. Rajesh Sharma",
  bride: "Meher",
  brideParents: "Daughter of Mrs. Anita & Mr. Sunil Kapoor",
  dateISO: "2026-12-06T19:00",
  tagline: "From a borrowed umbrella to forever",
  journey: "Lodhi Road, Humayun's Tomb, Chhatarpur",
  storyIntro: "One umbrella, two strangers",
  storyIntroSub: "and a very long coffee",
  storyChapters: [
    { title: "Where it all began", text: "A sudden Delhi downpour, one borrowed umbrella outside a Lodhi Road café — and a coffee that turned into four hours of conversation." },
    { title: "Chai, always chai", text: "Five years of chai breaks, road trips and late-night calls. Somewhere between the arguments over the last samosa, we became each other's home." },
    { title: "The question", text: "A surprise proposal at Humayun's Tomb, with both families hiding behind the arches — Meher said yes before Aarav finished asking." },
    { title: "And now, forever", text: "Two families, one beautiful journey ahead. We can't wait to celebrate this new beginning with all of you." },
  ],
  blessing: { groom: "ganesh", bride: "ganesh" },
  groomGrandparents: "Smt. Kamla Devi & Late Sh. Om Prakash Sharma",
  brideGrandparents: "Smt. Usha & Sh. Mohan Lal Kapoor",
  groomFamily: "Sharma Parivar",
  brideFamily: "Kapoor Parivar",
  reception: {
    dateISO: "2026-12-07T19:30",
    venueName: "The Grand Ballroom",
    venueAddress: "Hotel Sapphire, Saket, New Delhi",
    mapsUrl: "https://maps.google.com/?q=Saket+New+Delhi",
  },
  timeline: [
    { title: "Baraat Arrival", when: "6 Dec 2026, 7:00 PM", desc: "Dhol, dance and a very excited groom on a ghodi" },
    { title: "Varmala", when: "6 Dec 2026, 8:30 PM", desc: "Garlands, cheers and a few playful tugs" },
    { title: "Pheras", when: "6 Dec 2026, 11:00 PM", desc: "Seven vows around the sacred fire" },
  ],
  venueName: "Sheesh Mahal Lawns",
  venueAddress: "Chhatarpur, New Delhi",
  mapsUrl: "https://maps.google.com/?q=Chhatarpur+New+Delhi",
  dressWomen: "Lehengas & sarees in festive jewel tones",
  dressMen: "Sherwanis, kurtas or bandhgalas",
  preEvents: [
    { title: "Haldi", when: "5 Dec 2026, 10:00 AM", where: "Kapoor residence, Greater Kailash" },
    { title: "Mehendi", when: "5 Dec 2026, 4:00 PM", where: "Kapoor residence, Greater Kailash" },
    { title: "Sangeet", when: "5 Dec 2026, 8:00 PM", where: "The Courtyard, Chhatarpur" },
  ],
  transport: "Shuttles leave Hotel Sapphire, Saket every 30 minutes from 6:00 PM.",
  accommodation: "Rooms are blocked for outstation family at Hotel Sapphire, Saket — just tell us your dates.",
});
