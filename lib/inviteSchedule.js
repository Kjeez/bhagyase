// Schedule, venue tabs and calendar links built from a couple's details for a
// given view (see lib/inviteView). Used by the envelope templates (Royal Palace,
// Heartbound), which group events by day and show a tab per place.

export const toDate = (iso) => {
  const d = new Date(iso);
  return isNaN(d) ? null : d;
};
export const dotDate = (d) => (d ? `${d.getDate()} · ${d.getMonth() + 1} · ${d.getFullYear()}` : "");
export const longDate = (d) =>
  d ? d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "";
export const dayMonth = (d) => (d ? d.toLocaleDateString("en-IN", { day: "numeric", month: "long" }) : "");
export const shortDayMonth = (d) => (d ? d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "");
// "6 Dec 2026" — the same shape couples type for their functions, so days group together
const dayLabel = (d) => (d ? d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "");
const timeOf = (d) => (d ? d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }).toUpperCase() : "");
export const initial = (s) => (s?.trim()[0] || "").toUpperCase();

// "5 Dec 2026, 10:00 AM" → ["5 Dec 2026", "10:00 AM"]
export function splitWhen(when = "") {
  const i = when.lastIndexOf(",");
  return i > 0 ? [when.slice(0, i).trim(), when.slice(i + 1).trim()] : [when.trim(), ""];
}

function weekdayOf(day) {
  const d = new Date(day);
  return isNaN(d) ? "" : d.toLocaleDateString("en-IN", { weekday: "long" });
}

export const mapsSearch = (q) => `https://maps.google.com/?q=${encodeURIComponent(q)}`;

// Functions, the wedding-day timeline and the reception, grouped by day.
// The reception-only invite shows just the reception.
export function buildSchedule(data, view) {
  const wedding = toDate(data.dateISO);
  const rec = view.reception ? toDate(view.reception.dateISO) : null;
  const receptionItem = rec && {
    date: dayLabel(rec),
    day: rec.toLocaleDateString("en-IN", { weekday: "long" }),
    time: timeOf(rec),
    title: "Reception",
    note: view.reception.venueName,
  };

  const days = [];
  const add = (date, day, item) => {
    let g = days.find((d) => d.date === date);
    if (!g) {
      g = { date, day, items: [] };
      days.push(g);
    }
    g.items.push(item);
  };

  if (!view.isReception) {
    const items = [
      ...(data.show.preEvents ? data.preEvents.filter((e) => e.title && e.when).map((e) => ({ title: e.title, when: e.when, note: e.where })) : []),
      ...(data.show.timeline ? data.timeline.filter((t) => t.title).map((t) => ({ title: t.title, when: t.when, note: t.desc })) : []),
    ];
    for (const it of items) {
      let [date, time] = splitWhen(it.when);
      if (!date) date = dayLabel(wedding);
      add(date, weekdayOf(date) || (date === dayLabel(wedding) ? weekdayOf(wedding) : ""), { time, title: it.title, note: it.note });
    }
  }
  if (receptionItem && !days.some((d) => d.items.some((i) => /reception/i.test(i.title)))) {
    add(receptionItem.date, receptionItem.day, receptionItem);
  }
  return days;
}

// One tab per place; functions held at the same place share a tab.
// `sketchFor(title)` picks the template's drawing for a venue.
export function buildVenues(data, view, sketchFor) {
  const wedding = toDate(data.dateISO);
  const venues = [];
  if (!view.isReception && data.show.preEvents) {
    data.preEvents.filter((e) => e.title && e.where).forEach((e) => {
      const same = venues.find((v) => v.name.toLowerCase() === e.where.trim().toLowerCase());
      const [date] = splitWhen(e.when);
      if (same) {
        same.tab += ` & ${e.title}`;
        same.event = `${same.tab}${date ? ` · ${date}` : ""}`;
        return;
      }
      venues.push({
        key: `v${venues.length}`,
        tab: e.title,
        event: `${e.title}${date ? ` · ${date}` : ""}`,
        name: e.where.trim(),
        address: "",
        sketch: sketchFor(e.title),
        maps: mapsSearch(e.where),
      });
    });
  }
  if (!view.isReception && data.venueName) {
    venues.push({
      key: "main",
      tab: "Wedding",
      event: `Wedding Ceremony${wedding ? ` · ${dayMonth(wedding)}` : ""}`,
      name: data.venueName,
      address: data.venueAddress,
      sketch: sketchFor("wedding"),
      maps: data.mapsUrl || mapsSearch(`${data.venueName} ${data.venueAddress}`),
    });
  }
  const r = view.reception;
  if (r && r.venueName) {
    const rec = toDate(r.dateISO);
    venues.push({
      key: "reception",
      tab: "Reception",
      event: `Reception${rec ? ` · ${dayMonth(rec)}` : ""}`,
      name: r.venueName,
      address: r.venueAddress,
      sketch: sketchFor("reception"),
      maps: r.mapsUrl || mapsSearch(`${r.venueName} ${r.venueAddress}`),
    });
  }
  return venues;
}

// RSVP chips: each function this invite covers.
export function rsvpChoices(data, view) {
  const rec = view.reception ? toDate(view.reception.dateISO) : null;
  const recChip = rec ? `Reception · ${shortDayMonth(rec)}` : null;
  if (view.isReception) return [recChip];
  const wedding = toDate(data.dateISO);
  const fns = data.show.preEvents ? data.preEvents.filter((e) => e.title && e.when).map((e) => e.title) : [];
  return [...new Set([...fns, `Wedding${wedding ? ` · ${shortDayMonth(wedding)}` : ""}`, recChip].filter(Boolean))];
}

export function calendarUrl(view) {
  const start = toDate(view.dateISO);
  if (!start) return null;
  const stamp = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const end = new Date(start.getTime() + 5 * 36e5);
  return (
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(`${view.names} — ${view.isReception ? "Wedding Reception" : "Wedding"}`) +
    "&dates=" + stamp(start) + "/" + stamp(end) +
    "&location=" + encodeURIComponent([view.venue.name, view.venue.address].filter(Boolean).join(", "))
  );
}
