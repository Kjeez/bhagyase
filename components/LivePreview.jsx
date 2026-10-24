"use client";

import { LiveCountdown } from "@/components/landing/Motion";

function longDate(iso) {
  const d = new Date(iso);
  return isNaN(d) ? "" : d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

// Phone-sized preview of the invitation cover that updates as the couple types.
export default function LivePreview({ data, label = "Live preview" }) {
  const date = longDate(data.dateISO);
  const fns = data.preEvents.filter((e) => e.title?.trim()).slice(0, 4);
  return (
    <div className="lp" id="preview">
      <span className="lp-label"><i className="lp-dot" /> {label}</span>
      <div className="phone lp-phone" aria-label="Invitation preview">
        <div className="phone-in">
          <div className="phone-screen">
            <div className="phone-notch" />
            <span className="ph-eyebrow">We joyfully invite you to the wedding of</span>
            <span className="ph-name">{data.groom.trim() || "Groom"}</span>
            <span className="ph-amp">&amp;</span>
            <span className="ph-name">{data.bride.trim() || "Bride"}</span>
            {date && <span className="ph-line">{date}</span>}
            <div className="ph-rule"><i /><b /><i /></div>
            {data.show.countdown && <LiveCountdown iso={data.dateISO} />}
            {data.venueName.trim() && <span className="ph-line lp-venue">📍 {data.venueName}</span>}
            {data.show.preEvents && fns.length > 0 && (
              <div className="lp-fns">{fns.map((e, i) => <span key={i}>{e.title}</span>)}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
