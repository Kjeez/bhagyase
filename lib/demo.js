import { mergeData } from "@/lib/defaults";

// Sample couple for /invite/demo — shown on the landing page as "See a live invite".
export const DEMO_DATA = mergeData({
  groom: "Aarav",
  groomParents: "Son of Mrs. Neelam & Mr. Rajesh Sharma",
  bride: "Meher",
  brideParents: "Daughter of Mrs. Anita & Mr. Sunil Kapoor",
  dateISO: "2026-12-06T19:00",
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
