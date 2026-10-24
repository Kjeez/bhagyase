"use client";

import {
  MapPin, Volume2, VolumeX, Clock, Shirt, PartyPopper,
  Car, Building2, Gift, Mail, Send, Check, Heart,
} from "lucide-react";
import "./emerald-noir.css";
import { useCountdown, useReveal, ScratchCard, Slideshow, useRsvp, useMusic } from "./invite/shared";

/* ------------------------ decorative pieces ----------------------- */

const Flourish = () => (
  <svg className="flourish" viewBox="0 0 640 40" fill="none" aria-hidden="true">
    <path d="M10 22 C 120 2, 200 38, 320 20 S 520 4, 630 24" stroke="var(--en-gold-dim)" strokeWidth="1" />
    <circle cx="90" cy="14" r="1.6" fill="var(--en-gold)" />
    <circle cx="240" cy="30" r="1.6" fill="var(--en-gold)" />
    <circle cx="320" cy="8" r="1.6" fill="var(--en-gold)" />
    <circle cx="430" cy="28" r="1.6" fill="var(--en-gold)" />
    <circle cx="560" cy="12" r="1.6" fill="var(--en-gold)" />
  </svg>
);

const HeartRule = () => (
  <div className="hrule" aria-hidden="true">
    <i /><Heart size={10} fill="var(--en-gold)" stroke="none" /><i />
  </div>
);

const DiamondRule = () => (
  <div className="drule" aria-hidden="true"><i /><span className="dm" /><i /></div>
);

const PalaceArt = () => (
  <svg className="palace" viewBox="0 0 360 110" fill="none" stroke="var(--en-gold-dim)" strokeWidth="1" aria-hidden="true">
    <path d="M20 100 h320 M30 100 v-45 h40 v45 M290 100 v-45 h40 v45" />
    <path d="M35 55 a15 15 0 0 1 30 0 M295 55 a15 15 0 0 1 30 0" />
    <path d="M120 100 v-55 h120 v55 M150 100 v-25 a15 15 0 0 1 30 0 v25 M195 100 v-25 a12 12 0 0 1 24 0 v25" />
    <path d="M140 45 a40 40 0 0 1 80 0" />
    <path d="M168 22 a12 14 0 0 1 24 0" />
    <path d="M180 8 l0 14" />
    <path d="M130 65 a8 8 0 0 1 16 0 M214 65 a8 8 0 0 1 16 0" />
    <path d="M40 70 a8 8 0 0 1 16 0 M304 70 a8 8 0 0 1 16 0" />
  </svg>
);

function SecHead({ icon: Icon, title }) {
  return (
    <div className="sec-head rv">
      {Icon && <span className="sec-ic"><Icon size={26} strokeWidth={1.2} /></span>}
      <h2 className="script">{title}</h2>
      <HeartRule />
    </div>
  );
}

/* ------------------------------ main ------------------------------ */

export default function EmeraldNoir({ data, slug, preview = false }) {
  const { rsvp, set, sent, sending, submit } = useRsvp(slug, preview);
  const music = useMusic();
  const cd = useCountdown(data.dateISO);
  useReveal(".en-root");

  return (
    <div className="en-root">
      <svg className="corner tl" viewBox="0 0 120 120" aria-hidden="true"><path d="M118 6 C 60 10, 14 44, 8 116" stroke="var(--en-gold-dim)" fill="none" /><path d="M100 14 C 60 20, 26 50, 18 100" stroke="var(--en-gold-faint)" fill="none" /></svg>
      <svg className="corner br" viewBox="0 0 120 120" aria-hidden="true"><path d="M2 114 C 60 110, 106 76, 112 4" stroke="var(--en-gold-dim)" fill="none" /><path d="M20 106 C 60 100, 94 70, 102 20" stroke="var(--en-gold-faint)" fill="none" /></svg>

      {data.musicUrl && (
        <>
          <audio ref={music.audioRef} src={data.musicUrl} loop preload="none" />
          <button className="sound" onClick={music.toggle} aria-label="Toggle music">
            {music.on ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </>
      )}

      <main className="page">
        {/* HERO */}
        <header className="hero">
          <DiamondRule />
          <p className="eyebrow rv">We are honoured to welcome you to the wedding ceremony of..</p>

          <h1 className="name rv">{data.groom}</h1>
          {data.groomParents && <p className="line rv">{data.groomParents}</p>}
          {data.groomLine1 && <p className="line rv">{data.groomLine1}</p>}
          {data.groomLine2 && <p className="line rv">{data.groomLine2}</p>}

          <DiamondRule />

          <h1 className="name rv">{data.bride}</h1>
          {data.brideParents && <p className="line rv">{data.brideParents}</p>}
          {data.brideLine1 && <p className="line rv">{data.brideLine1}</p>}
          {data.brideLine2 && <p className="line rv">{data.brideLine2}</p>}

          <div className="dotline" aria-hidden="true"><i /><b /><i /></div>
          <p className="request rv">Request the honour of your presence</p>

          <DiamondRule />
          <p className="scroll-lab">Scroll</p>
          <span className="scroll-arrow" aria-hidden="true">⌄</span>
        </header>

        {/* WELCOME */}
        {data.welcomeMsg && (
          <section className="sec">
            <Flourish />
            <p className="welcome rv">
              {data.welcomeMsg}{" "}
              <Heart className="wl-heart" size={16} fill="var(--en-ivory)" stroke="none" />
            </p>
            <Flourish />
          </section>
        )}

        {/* SCRATCH */}
        {data.show.scratch && (
          <section className="sec">
            <SecHead title="Scratch to Reveal" />
            <ScratchCard dateISO={data.dateISO} />
          </section>
        )}

        {/* PHOTOS */}
        {data.show.slideshow && data.photos.length > 0 && (
          <section className="sec">
            <HeartRule />
            <Slideshow photos={data.photos} />
          </section>
        )}

        {/* COUNTDOWN */}
        {data.show.countdown && (
          <section className="sec">
            <SecHead title="Counting Down to Forever" />
            {cd.past ? (
              <p className="cd-past rv">The celebrations have begun 🎉</p>
            ) : (
              <div className="cd rv">
                {[["Days", cd.d], ["Hours", cd.h], ["Minutes", cd.m], ["Seconds", cd.s]].map(([l, v]) => (
                  <div className="cd-cell" key={l}>
                    <span className="cd-num">{v}</span>
                    <span className="cd-lab">{l}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* TIMELINE */}
        {data.show.timeline && data.timeline.some((t) => t.title) && (
          <section className="sec">
            <SecHead icon={Clock} title="Program Timeline" />
            <div className="tl rv">
              {data.timeline.filter((t) => t.title).map((ev, i) => (
                <div className="tl-item" key={i}>
                  <span className="tl-dot" />
                  <div>
                    <span className="tl-title">{ev.title}</span>
                    {ev.when && <span className="tl-when">{ev.when}</span>}
                    {ev.desc && <span className="tl-desc">{ev.desc}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* VENUE */}
        {data.venueName && (
          <section className="sec">
            <SecHead icon={MapPin} title="Venue" />
            <p className="venue-name rv">{data.venueName}</p>
            {data.venueAddress && <p className="venue-addr rv">{data.venueAddress}</p>}
            <PalaceArt />
            {data.mapsUrl && (
              <a className="btn-gold rv" href={data.mapsUrl} target="_blank" rel="noreferrer">
                View on Google Maps
              </a>
            )}
          </section>
        )}

        {/* DRESS CODE */}
        {data.show.dress && (
          <section className="sec">
            <SecHead icon={Shirt} title="Dress Code" />
            <div className="dress rv">
              <div><span className="dress-h">Women</span><p>{data.dressWomen}</p></div>
              <div><span className="dress-h">Men</span><p>{data.dressMen}</p></div>
            </div>
          </section>
        )}

        {/* PRE-WEDDING */}
        {data.show.preEvents && data.preEvents.some((e) => e.title && e.when) && (
          <section className="sec">
            <SecHead icon={PartyPopper} title="Pre-Wedding Events" />
            <div className="pre rv">
              {data.preEvents.filter((e) => e.title && e.when).map((ev, i) => (
                <div className="pre-item" key={i}>
                  <span className="pre-title">{ev.title}</span>
                  <span className="pre-when">{ev.when}</span>
                  {ev.where && <span className="pre-where">{ev.where}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TRANSPORT */}
        {data.show.transport && data.transport && (
          <section className="sec">
            <SecHead icon={Car} title="Transportation" />
            <p className="info rv">{data.transport}</p>
          </section>
        )}

        {/* STAY */}
        {data.show.stay && data.accommodation && (
          <section className="sec">
            <SecHead icon={Building2} title="Accommodation" />
            <p className="info rv">{data.accommodation}</p>
          </section>
        )}

        {/* GIFTS */}
        {data.show.gifts && data.giftsNote && (
          <section className="sec">
            <SecHead icon={Gift} title="Gifts" />
            <p className="info rv">{data.giftsNote}</p>
          </section>
        )}

        {/* RSVP */}
        {data.show.rsvp && (
          <section className="sec">
            <SecHead icon={Mail} title="Send a Message" />
            <div className="form rv">
              <label>Your Name
                <input placeholder="Your full name" value={rsvp.name} onChange={set("name")} />
              </label>
              <label>Email
                <input placeholder="you@example.com" value={rsvp.email} onChange={set("email")} />
              </label>
              <label>Will you be attending?
                <select value={rsvp.attending} onChange={set("attending")}>
                  <option value="">Select…</option>
                  <option value="yes">Joyfully attending</option>
                  <option value="no">Regretfully can&apos;t</option>
                </select>
              </label>
              {/* honeypot — hidden from people, filled by bots */}
              <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="contact_by_fax_only"
                value={rsvp.faxOnly} onChange={set("faxOnly")} />
              <label>Your Message
                <textarea rows={3} placeholder="Write your wishes…" value={rsvp.msg} onChange={set("msg")} />
              </label>
              <button className="btn-gold wide" onClick={submit} disabled={sending}>
                {sent ? <>Message sent <Check size={15} /></> : <>Send Message <Send size={14} /></>}
              </button>
            </div>
          </section>
        )}

        {/* CLOSING */}
        <section className="sec closing">
          <Flourish />
          <p className="script close-line rv">{data.closing}</p>
          <p className="script close-names rv">{data.groom} &amp; {data.bride}</p>
          <Flourish />
        </section>

        <footer className="foot">
          <span className="script foot-names">{data.groom} &amp; {data.bride}</span>
          <span className="foot-brand">
            Created with <a href="/"><b>WebAlchemy Invites</b></a> · Create your own wedding invitation
          </span>
        </footer>
      </main>
    </div>
  );
}
