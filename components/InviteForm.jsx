"use client";

import { Check, Heart, CalendarHeart, Camera, Clock, MapPin, Shirt, Sparkles, Car, LayoutGrid, Palette, ExternalLink } from "lucide-react";
import { TEMPLATES } from "@/lib/templates";

function F({ label, children }) {
  return (
    <label className="wf-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

// A titled group of fields with its own accent colour.
function Card({ icon: Icon, title, hint, acc, children }) {
  return (
    <section className="wf-card" style={{ "--acc": acc }}>
      <div className="wf-card-head">
        <span className="wf-ic"><Icon size={20} /></span>
        <div>
          <h2>{title}</h2>
          {hint && <p>{hint}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

const SECTION_LABELS = {
  scratch: "Scratch card",
  slideshow: "Photos",
  countdown: "Countdown",
  timeline: "Timeline",
  dress: "Dress code",
  preEvents: "Pre-wedding",
  transport: "Transport",
  stay: "Stay",
  gifts: "Gifts",
  rsvp: "Messages",
};

export default function InviteForm({ data, setData }) {
  const up = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const upArr = (arr, i, k, v) =>
    setData((d) => ({ ...d, [arr]: d[arr].map((e, j) => (j === i ? { ...e, [k]: v } : e)) }));
  const upShow = (k) => setData((d) => ({ ...d, show: { ...d.show, [k]: !d.show[k] } }));

  return (
    <div className="wf">
      <Card icon={Palette} title="Choose your style" hint="You can switch any time — your details stay the same." acc="#E0457B">
        <div className="wf-styles" role="radiogroup" aria-label="Invitation style">
          {Object.values(TEMPLATES).map((t) => (
            <div key={t.id} className={`wf-style ${data.template === t.id ? "on" : ""}`}>
              <button type="button" role="radio" aria-checked={data.template === t.id} onClick={() => up("template", t.id)}>
                <span className="wf-swatch" aria-hidden="true">{t.swatch.map((c) => <i key={c} style={{ background: c }} />)}</span>
                <b>{t.name}</b>
                <span>{t.blurb}</span>
                {data.template === t.id && <span className="wf-picked"><Check size={13} /> Selected</span>}
              </button>
              <a href={`/invite/demo?style=${t.id}`} target="_blank" rel="noreferrer">See a sample <ExternalLink size={12} /></a>
            </div>
          ))}
        </div>
      </Card>

      <Card icon={Heart} title="The couple" hint="Names exactly as you'd like them printed." acc="#F7B7A3">
        <div className="wf-row2">
          <F label="Groom *"><input value={data.groom} onChange={(e) => up("groom", e.target.value)} /></F>
          <F label="Bride *"><input value={data.bride} onChange={(e) => up("bride", e.target.value)} /></F>
        </div>
        <F label="Groom — parents line"><input value={data.groomParents} onChange={(e) => up("groomParents", e.target.value)} placeholder="Son of Mr. & Mrs. Sharma" /></F>
        <div className="wf-row2">
          <F label="Groom extra line 1"><input value={data.groomLine1} onChange={(e) => up("groomLine1", e.target.value)} placeholder="MBBS, M.D. (optional)" /></F>
          <F label="Groom extra line 2"><input value={data.groomLine2} onChange={(e) => up("groomLine2", e.target.value)} placeholder="(optional)" /></F>
        </div>
        <F label="Bride — parents line"><input value={data.brideParents} onChange={(e) => up("brideParents", e.target.value)} placeholder="Daughter of Mr. & Mrs. Kapoor" /></F>
        <div className="wf-row2">
          <F label="Bride extra line 1"><input value={data.brideLine1} onChange={(e) => up("brideLine1", e.target.value)} placeholder="(optional)" /></F>
          <F label="Bride extra line 2"><input value={data.brideLine2} onChange={(e) => up("brideLine2", e.target.value)} placeholder="(optional)" /></F>
        </div>
        <F label="Your story (optional — shown in Royal Palace)">
          <textarea rows={3} value={data.story} onChange={(e) => up("story", e.target.value)}
            placeholder="How you met, your first trip, the proposal… Leave a blank line between paragraphs." />
        </F>
      </Card>

      <Card icon={CalendarHeart} title="The big day" hint="Your countdown and scratch card use this date." acc="#FFD54A">
        <F label="Welcome message">
          <textarea rows={3} value={data.welcomeMsg} onChange={(e) => up("welcomeMsg", e.target.value)} />
        </F>
        <F label="Wedding date & time *">
          <input type="datetime-local" value={data.dateISO} onChange={(e) => up("dateISO", e.target.value)} />
        </F>
      </Card>

      <Card icon={Camera} title="Photos & music" hint="Optional — paste links to your photos and a song." acc="#BFE4DF">
        <F label="Photo URLs (comma separated)">
          <textarea
            rows={2}
            value={data.photos.join(", ")}
            placeholder="https://…jpg, https://…jpg"
            onChange={(e) => up("photos", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
          />
        </F>
        <F label="Music URL (mp3 — optional)">
          <input value={data.musicUrl} onChange={(e) => up("musicUrl", e.target.value)} placeholder="https://…mp3" />
        </F>

      </Card>

      <Card icon={Clock} title="Wedding day timeline" hint="Baraat, varmala, pheras — what happens when." acc="#FFC46B">
        {data.timeline.map((ev, i) => (
          <div className="wf-block" key={i}>
            <div className="wf-row2">
              <F label={`Item ${i + 1}`}><input value={ev.title} onChange={(e) => upArr("timeline", i, "title", e.target.value)} /></F>
              <F label="When"><input value={ev.when} onChange={(e) => upArr("timeline", i, "when", e.target.value)} placeholder="6 Dec 2026, 7:00 PM" /></F>
            </div>
            <F label="Note"><input value={ev.desc} onChange={(e) => upArr("timeline", i, "desc", e.target.value)} /></F>
          </div>
        ))}

      </Card>

      <Card icon={MapPin} title="Venue" hint="Add a Google Maps link and guests get one-tap directions." acc="#CFE3B2">
        <F label="Venue name"><input value={data.venueName} onChange={(e) => up("venueName", e.target.value)} /></F>
        <F label="Address"><input value={data.venueAddress} onChange={(e) => up("venueAddress", e.target.value)} /></F>
        <F label="Google Maps link"><input value={data.mapsUrl} onChange={(e) => up("mapsUrl", e.target.value)} placeholder="https://maps.google.com/?q=…" /></F>

      </Card>

      <Card icon={Shirt} title="Dress code" acc="#F9C6D6">
        <F label="Women"><input value={data.dressWomen} onChange={(e) => up("dressWomen", e.target.value)} /></F>
        <F label="Men"><input value={data.dressMen} onChange={(e) => up("dressMen", e.target.value)} /></F>

      </Card>

      <Card icon={Sparkles} title="Pre-wedding functions" hint="Haldi, mehendi, sangeet — each with its own time and place." acc="#FFE27A">
        {data.preEvents.map((ev, i) => (
          <div className="wf-block" key={i}>
            <div className="wf-row2">
              <F label={`Event ${i + 1}`}><input value={ev.title} onChange={(e) => upArr("preEvents", i, "title", e.target.value)} /></F>
              <F label="When"><input value={ev.when} onChange={(e) => upArr("preEvents", i, "when", e.target.value)} placeholder="4 Dec 2026, 8:00 PM" /></F>
            </div>
            <F label="Where"><input value={ev.where} onChange={(e) => upArr("preEvents", i, "where", e.target.value)} /></F>
          </div>
        ))}

      </Card>

      <Card icon={Car} title="For your guests" hint="Travel, stay, gifts and your closing line." acc="#D9D2F2">
        <F label="Transportation"><textarea rows={2} value={data.transport} onChange={(e) => up("transport", e.target.value)} /></F>
        <F label="Accommodation"><textarea rows={2} value={data.accommodation} onChange={(e) => up("accommodation", e.target.value)} /></F>
        <F label="Gifts note"><textarea rows={2} value={data.giftsNote} onChange={(e) => up("giftsNote", e.target.value)} /></F>
        <F label="Closing line"><input value={data.closing} onChange={(e) => up("closing", e.target.value)} /></F>

      </Card>

      <Card icon={LayoutGrid} title="What to show" hint="Tap to switch sections on or off. Empty sections hide themselves." acc="#F5A524">
        <div className="wf-toggles">
          {Object.entries(SECTION_LABELS).map(([k, label]) => (
            <button type="button" key={k} className={`wf-toggle ${data.show[k] ? "on" : ""}`} onClick={() => upShow(k)}>
              {data.show[k] && <Check size={13} />} {label}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
