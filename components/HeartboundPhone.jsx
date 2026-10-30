// A phone showing the cover of a Heartbound invitation — the mockup used on
// the landing page and in the editor's live preview. `children` adds a line
// or two under the countdown (scratch card hint, venue, functions…).

import "./heartbound-phone.css";
import { Garland, Skyline } from "@/components/Heartbound";
import { LiveCountdown } from "@/components/landing/Motion";
import { viewOf, BLESSINGS } from "@/lib/inviteView";
import { royalFonts } from "@/lib/fonts";

const dotDate = (iso) => {
  const d = new Date(iso);
  return isNaN(d) ? "" : `${d.getDate()} · ${d.getMonth() + 1} · ${d.getFullYear()}`;
};

export default function HeartboundPhone({ data, className = "", countdown = true, children, ...rest }) {
  const view = viewOf(data);
  const date = dotDate(data.dateISO);
  return (
    <div className={`phone hbm-phone ${className}`} {...rest}>
      <div className="phone-in">
        <div className={`phone-screen hbm ${royalFonts}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hbm-photo" src="/templates/heartbound/hero-moonrise.jpg" alt="" />
          <div className="hbm-shade" />
          <Garland />
          <div className="phone-notch" />
          <div className="hbm-copy">
            {view.blessings.includes("ikonkar") && <span className="hbm-onkar" lang="pa">ੴ</span>}
            {view.blessings.includes("ganesh") && <span className="hbm-kicker">{BLESSINGS.ganesh.kicker}</span>}
            <span className="hbm-pre">The wedding of</span>
            <span className="hbm-names">
              <span>{view.first.name || "Groom"}</span>
              <span className="hbm-amp">&amp;</span>
              <span>{view.second.name || "Bride"}</span>
            </span>
            {date && (
              <span className="hbm-date">
                <i />
                {date}
                <i />
              </span>
            )}
            {view.tagline && <span className="hbm-tag">{view.tagline}</span>}
            {countdown && <LiveCountdown iso={data.dateISO} />}
            {children}
          </div>
          <div className="hbm-art">
            <Skyline />
          </div>
        </div>
      </div>
    </div>
  );
}
