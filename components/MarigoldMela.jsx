"use client";

import { useEffect, useRef, useState } from "react";
import {
  MapPin, Volume2, VolumeX, Car, Building2, Gift, Send, Check, Clock, Navigation,
} from "lucide-react";
import "./marigold-mela.css";
import { landingFonts } from "@/lib/fonts";
import {
  Toran, FairyLights, Rangoli, Marigold, Bride, Groom, Kid, DholWala, Chacha, GroomOnGhodi,
  HaldiScene, MehendiScene, SangeetScene, BaraatScene, PherasScene, ReceptionScene,
} from "@/components/landing/Art";
import { PetalRain, burst } from "@/components/landing/Motion";
import { fmtDate, fmtTime, useCountdown, useReveal, ScratchCard, Slideshow, useRsvp, useMusic } from "./invite/shared";

// Picks an illustration, colour world and Hindi name for a function from its title.
const FUNCTION_STYLES = [
  { re: /haldi|pithi/i, Scene: HaldiScene, bg: "#FFE27A", hi: "हल्दी" },
  { re: /mehe?ndi|henna/i, Scene: MehendiScene, bg: "#CFE3B2", hi: "मेहंदी" },
  { re: /sangeet|cocktail|dance|garba/i, Scene: SangeetScene, bg: "#2B1036", hi: "संगीत", dark: true },
  { re: /baraat|ghudchadi/i, Scene: BaraatScene, bg: "#FFC46B", hi: "बारात" },
  { re: /phera|wedding|shaadi|vivah|varmala/i, Scene: PherasScene, bg: "#F8B9A4", hi: "फेरे" },
  { re: /reception/i, Scene: ReceptionScene, bg: "#BFE4DF", hi: "रिसेप्शन" },
];
const FALLBACK_BGS = ["#FDE2EA", "#FFF1C9", "#DDEFE9"];

function styleFor(title, i) {
  return FUNCTION_STYLES.find((f) => f.re.test(title)) || { bg: FALLBACK_BGS[i % FALLBACK_BGS.length] };
}

// Marigold-tinted foil for the scratch card (module constant so it isn't redrawn every render).
const FOIL = ["#E86A10", "#FFD54A", "#F5A524", "#C8102E"];

function Sec({ title, hi, tone = "", children }) {
  return (
    <section className={`mm-sec ${tone}`}>
      <div className="mm-sec-head rv">
        {hi && <p className="mm-hi" lang="hi">{hi}</p>}
        <h2>{title}</h2>
        <div className="mm-rule" aria-hidden="true"><i /><svg viewBox="0 0 24 24"><Marigold x={12} y={12} r={9} /></svg><i /></div>
      </div>
      {children}
    </section>
  );
}

// Full-screen curtains that part when the guest taps — the "opening the envelope" moment.
function Curtain({ data, onOpen }) {
  const [state, setState] = useState("closed"); // closed → opening → gone
  useEffect(() => {
    document.body.style.overflow = state === "gone" ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [state]);
  if (state === "gone") return null;
  const open = () => {
    setState("opening");
    onOpen();
    setTimeout(() => setState("gone"), 1400);
  };
  return (
    <div className={`mm-curtain ${state}`}>
      <div className="mm-drape left" aria-hidden="true" />
      <div className="mm-drape right" aria-hidden="true" />
      <Toran units={12} className="mm-curtain-toran" />
      <div className="mm-seal">
        <p className="mm-hi" lang="hi">सादर आमंत्रण</p>
        <p className="mm-seal-names">{data.groom} <span>&amp;</span> {data.bride}</p>
        <p className="mm-seal-date">{fmtDate(data.dateISO)}</p>
        <button className="mm-btn" onClick={open} autoFocus>Tap to open ✨</button>
      </div>
    </div>
  );
}

export default function MarigoldMela({ data, slug, preview = false }) {
  const { rsvp, set, setField, sent, sending, submit } = useRsvp(slug, preview);
  const music = useMusic();
  const cd = useCountdown(data.dateISO);
  const heroRef = useRef(null);
  const rsvpRef = useRef(null);
  const scratchRef = useRef(null);
  useReveal(".mm-root");

  const onOpen = () => {
    if (data.musicUrl) music.start();
    setTimeout(() => burst(heroRef.current, 40), 500);
  };

  const send = async () => {
    if (await submit()) burst(rsvpRef.current, 36);
  };

  const fns = data.preEvents.filter((e) => e.title && e.when);
  const tl = data.timeline.filter((t) => t.title);

  return (
    <div className={`mm-root ${landingFonts}`}>
      <Curtain data={data} onOpen={onOpen} />

      {data.musicUrl && (
        <>
          <audio ref={music.audioRef} src={data.musicUrl} loop preload="none" />
          <button className={`mm-sound ${music.on ? "on" : ""}`} onClick={music.toggle} aria-label={music.on ? "Pause music" : "Play music"}>
            {music.on ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </>
      )}

      {/* HERO */}
      <header className="mm-hero" ref={heroRef}>
        <Toran units={12} className="mm-toran" />
        <PetalRain count={14} />
        <div className="mm-arch">
          <p className="mm-hi" lang="hi">शुभ विवाह</p>
          <p className="mm-eyebrow">Together with their families</p>
          <h1 className="mm-name">{data.groom}</h1>
          {data.groomParents && <p className="mm-line">{data.groomParents}</p>}
          {data.groomLine1 && <p className="mm-line">{data.groomLine1}</p>}
          {data.groomLine2 && <p className="mm-line">{data.groomLine2}</p>}
          <span className="mm-weds">weds</span>
          <h1 className="mm-name">{data.bride}</h1>
          {data.brideParents && <p className="mm-line">{data.brideParents}</p>}
          {data.brideLine1 && <p className="mm-line">{data.brideLine1}</p>}
          {data.brideLine2 && <p className="mm-line">{data.brideLine2}</p>}
          <p className="mm-request">request the pleasure of your company to celebrate their wedding</p>
          <p className="mm-date-pill">{fmtDate(data.dateISO)}</p>
        </div>
        <div className="mm-cast" aria-hidden="true">
          <Kid className="mm-ch kid" />
          <Bride className="mm-ch bride" />
          <Groom className="mm-ch groom" />
          <Kid className="mm-ch kid2" girl={false} dress="#0F6E6E" skin="#8D5524" />
        </div>
        <span className="mm-scroll" aria-hidden="true">Scroll ⌄</span>
      </header>

      <main className="mm-page">
        {/* WELCOME */}
        {data.welcomeMsg && (
          <section className="mm-sec">
            <div className="mm-welcome rv">
              <Rangoli className="mm-rangoli tl" />
              <Rangoli className="mm-rangoli br" />
              <p>{data.welcomeMsg}</p>
            </div>
          </section>
        )}

        {/* SCRATCH */}
        {data.show.scratch && (
          <Sec title="Scratch to reveal the date" hi="शुभ मुहूर्त">
            <div className="mm-scratch" ref={scratchRef}>
              <ScratchCard
                dateISO={data.dateISO}
                foil={FOIL}
                ink="rgba(60,10,10,.8)"
                font="800 15px Manrope, sans-serif"
                onReveal={() => burst(scratchRef.current, 30)}
              />
            </div>
          </Sec>
        )}

        {/* PHOTOS */}
        {data.show.slideshow && data.photos.length > 0 && (
          <Sec title="Our story" hi="हमारी कहानी">
            <div className="mm-polaroid rv"><Slideshow photos={data.photos} /></div>
          </Sec>
        )}

        {/* COUNTDOWN */}
        {data.show.countdown && (
          <Sec title="Counting down to the big day" hi="बस कुछ ही दिन">
            {cd.past ? (
              <p className="mm-past rv">The celebrations have begun! 🎉</p>
            ) : (
              <div className="mm-cd rv">
                {[["Days", cd.d], ["Hours", cd.h], ["Minutes", cd.m], ["Seconds", cd.s]].map(([l, v]) => (
                  <div className="mm-cd-cell" key={l}>
                    <span className="n">{String(v).padStart(2, "0")}</span>
                    <span className="l">{l}</span>
                  </div>
                ))}
              </div>
            )}
          </Sec>
        )}

        {/* FUNCTIONS */}
        {data.show.preEvents && fns.length > 0 && (
          <Sec title="The celebrations" hi="हर रस्म, हर रंग">
            <div className="mm-fns">
              {fns.map((ev, i) => {
                const st = styleFor(ev.title, i);
                return (
                  <article key={i} className={`mm-fn rv ${st.dark ? "dark" : ""}`} style={{ background: st.bg }}>
                    <div className="mm-fn-art">{st.Scene ? <st.Scene /> : <Rangoli />}</div>
                    <h3>{ev.title}</h3>
                    {st.hi && <p className="mm-fn-hi" lang="hi">{st.hi}</p>}
                    <p className="mm-fn-when"><Clock size={15} /> {ev.when}</p>
                    {ev.where && <p className="mm-fn-where"><MapPin size={15} /> {ev.where}</p>}
                  </article>
                );
              })}
            </div>
          </Sec>
        )}

        {/* WEDDING DAY TIMELINE */}
        {data.show.timeline && tl.length > 0 && (
          <Sec title="The wedding day" hi="शादी का दिन">
            <div className="mm-tl-wrap rv">
              <GroomOnGhodi className="mm-tl-art" />
              <ol className="mm-tl">
                {tl.map((ev, i) => (
                  <li key={i}>
                    <span className="dot" aria-hidden="true" />
                    <b>{ev.title}</b>
                    {ev.when && <span className="when">{ev.when}</span>}
                    {ev.desc && <span className="desc">{ev.desc}</span>}
                  </li>
                ))}
              </ol>
            </div>
          </Sec>
        )}

        {/* VENUE */}
        {data.venueName && (
          <Sec title="Where to find us" hi="स्थान">
            <div className="mm-venue rv">
              <PherasScene />
              <p className="mm-venue-name">{data.venueName}</p>
              {data.venueAddress && <p className="mm-venue-addr">{data.venueAddress}</p>}
              <p className="mm-venue-time">{fmtDate(data.dateISO)} · {fmtTime(data.dateISO)} onwards</p>
              {data.mapsUrl && (
                <a className="mm-btn" href={data.mapsUrl} target="_blank" rel="noreferrer">
                  <Navigation size={17} /> Open in Google Maps
                </a>
              )}
            </div>
          </Sec>
        )}

        {/* DRESS CODE */}
        {data.show.dress && (data.dressWomen || data.dressMen) && (
          <Sec title="What to wear" hi="पहनावा">
            <div className="mm-dress">
              {data.dressWomen && (
                <div className="mm-card rv"><Bride className="mm-dress-art" /><b>Women</b><p>{data.dressWomen}</p></div>
              )}
              {data.dressMen && (
                <div className="mm-card rv"><Groom className="mm-dress-art" /><b>Men</b><p>{data.dressMen}</p></div>
              )}
            </div>
          </Sec>
        )}

        {/* GUEST INFO */}
        {((data.show.transport && data.transport) || (data.show.stay && data.accommodation) || (data.show.gifts && data.giftsNote)) && (
          <Sec title="Good to know" hi="ज़रूरी बातें">
            <div className="mm-info">
              {data.show.transport && data.transport && (
                <div className="mm-card rv"><span className="mm-ic"><Car size={20} /></span><b>Getting there</b><p>{data.transport}</p></div>
              )}
              {data.show.stay && data.accommodation && (
                <div className="mm-card rv"><span className="mm-ic"><Building2 size={20} /></span><b>Where to stay</b><p>{data.accommodation}</p></div>
              )}
              {data.show.gifts && data.giftsNote && (
                <div className="mm-card rv"><span className="mm-ic"><Gift size={20} /></span><b>Gifts</b><p>{data.giftsNote}</p></div>
              )}
            </div>
          </Sec>
        )}

        {/* RSVP */}
        {data.show.rsvp && (
          <Sec title="Will you join us?" hi="आपका इंतज़ार रहेगा">
            <div className="mm-form rv" ref={rsvpRef}>
              <label>Your name
                <input placeholder="Your full name" value={rsvp.name} onChange={set("name")} />
              </label>
              <label>Email <small>(optional)</small>
                <input type="email" placeholder="you@example.com" value={rsvp.email} onChange={set("email")} />
              </label>
              <div className="mm-choice" role="radiogroup" aria-label="Will you be attending?">
                <button type="button" role="radio" aria-checked={rsvp.attending === "yes"}
                  className={rsvp.attending === "yes" ? "on" : ""} onClick={() => setField("attending", "yes")}>
                  💃 Joyfully attending
                </button>
                <button type="button" role="radio" aria-checked={rsvp.attending === "no"}
                  className={rsvp.attending === "no" ? "on" : ""} onClick={() => setField("attending", "no")}>
                  🙏 Sending blessings
                </button>
              </div>
              <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="contact_by_fax_only"
                value={rsvp.faxOnly} onChange={set("faxOnly")} />
              <label>Your wishes
                <textarea rows={3} placeholder="Write a blessing for the couple…" value={rsvp.msg} onChange={set("msg")} />
              </label>
              <button className="mm-btn wide" onClick={send} disabled={sending || !rsvp.name.trim()}>
                {sent ? <>Dhanyavaad! See you on the dance floor <Check size={16} /></> : <>{sending ? "Sending…" : "Send RSVP"} <Send size={15} /></>}
              </button>
            </div>
          </Sec>
        )}
      </main>

      {/* CLOSING */}
      <section className="mm-finale">
        <FairyLights className="mm-lights" />
        <div className="mm-finale-copy rv">
          <p className="mm-hi light" lang="hi">आपके आशीर्वाद के साथ</p>
          <p className="mm-close-line">{data.closing}</p>
          <p className="mm-close-names">{data.groom} &amp; {data.bride}</p>
        </div>
        <div className="mm-road" aria-hidden="true">
          <div className="mm-procession">
            <DholWala className="pr dhol" />
            <Chacha className="pr chacha" />
            <GroomOnGhodi className="pr ghodi" />
            <Kid className="pr kid" />
          </div>
        </div>
        <footer className="mm-foot">
          Made with <a href="/">WebAlchemy Invites</a> · Create your own wedding invitation
        </footer>
      </section>
    </div>
  );
}
