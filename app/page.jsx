import "./landing.css";
import Link from "next/link";
import {
  MapPin, Timer, Sparkles, Music, Shirt, Car, Pencil, Gift, MessageCircle, Check,
  Smartphone, UserRound, KeyRound, Eye, Send, Heart,
} from "lucide-react";
import NavAuth from "@/components/NavAuth";
import { PLANS, PLAN_ORDER } from "@/lib/plans";
import { CONTACT } from "@/lib/site";
import { DEMO_DATA } from "@/lib/demo";
import { landingFonts } from "@/lib/fonts";
import {
  Toran, FairyLights, Arch, Rangoli, Bride, Groom, Kid, Dadi, DholWala, Chacha, GroomOnGhodi,
  HaldiScene, MehendiScene, SangeetScene, BaraatScene, PherasScene, ReceptionScene,
} from "@/components/landing/Art";
import { RevealRoot, PetalRain, LoadBurst, DholEgg, LiveCountdown } from "@/components/landing/Motion";

export const metadata = {
  title: "WebAlchemy Invites — Joyful Animated Wedding Invitations, Shared on WhatsApp",
  description:
    "An animated wedding invitation website for your shaadi — haldi, mehendi, sangeet, baraat, pheras and reception. Countdown, scratch-to-reveal date, maps, music and RSVPs. Free to create, pay once to publish.",
  alternates: { canonical: "/" },
};

const WA = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hi! I'd like to know more about WebAlchemy Invites 💛")}`;

const FUNCTIONS = [
  { id: "haldi", name: "Haldi", hi: "हल्दी", line: "Turmeric, giggles and cousins on a mission.", Scene: HaldiScene },
  { id: "mehendi", name: "Mehendi", hi: "मेहंदी", line: "Henna, dholak songs and the hunt for his name.", Scene: MehendiScene },
  { id: "sangeet", name: "Sangeet", hi: "संगीत", line: "Chacha's naagin dance. Need we say more?", Scene: SangeetScene },
  { id: "baraat", name: "Baraat", hi: "बारात", line: "Ghodi, dhol and friends who won't stop dancing.", Scene: BaraatScene },
  { id: "pheras", name: "Pheras", hi: "फेरे", line: "Seven vows around the sacred fire.", Scene: PherasScene },
  { id: "reception", name: "Reception", hi: "रिसेप्शन", line: "Stage, lights and a very long photo queue.", Scene: ReceptionScene },
];

const GUEST_FEATURES = [
  { Icon: Smartphone, t: "Opens straight from WhatsApp", d: "Just a link — nothing to install, works on every phone." },
  { Icon: MapPin, t: "One-tap Google Maps", d: "No more “bhai location bhejo” calls on the day." },
  { Icon: Timer, t: "Live countdown", d: "Days, hours, minutes and seconds to the big day." },
  { Icon: Sparkles, t: "Scratch to reveal", d: "Guests scratch a gold card to discover your date." },
  { Icon: Music, t: "Your song in the background", d: "Plays softly as they scroll, with a clear mute button." },
  { Icon: Shirt, t: "Dress code & every function", d: "Mehendi, haldi, sangeet — times, places and what to wear." },
  { Icon: Car, t: "Travel & stay info", d: "Shuttles and hotel details for outstation family." },
  { Icon: Gift, t: "RSVP & blessings", d: "Guests confirm and send wishes in a few taps." },
];

const CHAT = [
  { who: "Bua ji", txt: "Beta itna sundar invite! 😍😍", side: "l" },
  { who: "Mama ji", txt: "Location mil gayi. Thank you 🙏", side: "l" },
  { who: "Riya (cousin)", txt: "The scratch card is SO cute 😭✨", side: "l" },
  { who: "You", txt: "RSVP kar dena sab log! 💃🕺", side: "r" },
  { who: "Dadi", txt: "🙏🙏🙏 Bahut khoob. Bhagwan bhala kare", side: "l" },
];

const FAQ = [
  ["Do guests need to install anything?", "No. Your invitation is a website link — it opens instantly from WhatsApp on any phone, including your dadi's."],
  ["Can I try it before paying?", "Yes. Create your invitation and preview it as much as you like for free. You only pay once, when you publish it."],
  ["Can I change details after sharing?", "Anytime. Venue changed or time shifted? Edit from your phone and the same link updates instantly."],
  ["What if I lose my edit link?", "Log in and save the invitation to your account, or tap “Send to my WhatsApp” in the editor so it's always in your chats."],
  ["Is our information private?", "Invitations are kept off Google, and RSVP messages are visible only to you. Read our privacy policy for the details."],
  ["What is the hand-drawn illustration in Shaadi Plus?", "After you publish with Shaadi Plus, WhatsApp us a couple of your photos. We hand-draw the two of you and add it to your invitation."],
  ["Can you make it for me?", "With Shaadi Plus, yes — send your details on WhatsApp and our team sets everything up for you."],
  ["What's your refund policy?", "Full refund within 48 hours of payment if your invitation hasn't received any RSVPs yet. See the refund policy for everything else."],
];

function Phone({ className = "" }) {
  return (
    <div className={`phone ${className}`} aria-hidden="true">
      <div className="phone-in">
        <div className="phone-screen">
          <div className="phone-notch" />
          <span className="ph-eyebrow">We joyfully invite you to the wedding of</span>
          <span className="ph-name">{DEMO_DATA.groom}</span>
          <span className="ph-amp">&amp;</span>
          <span className="ph-name">{DEMO_DATA.bride}</span>
          <span className="ph-line">Sunday, 6 December 2026</span>
          <div className="ph-rule"><i /><b /><i /></div>
          <LiveCountdown iso={DEMO_DATA.dateISO} />
          <div className="ph-scratch">✦ Scratch to reveal ✦</div>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className={`lx ${landingFonts}`}>
      <RevealRoot />

      {/* ------------------------------------------------ nav */}
      <header className="lx-nav">
        <div className="wrap">
          <Link href="/" className="lx-logo"><b>WebAlchemy</b> Invites</Link>
          <nav className="lx-links" aria-label="Main">
            <a href="#functions" className="anchor">Functions</a>
            <a href="#pricing" className="anchor">Pricing</a>
            <a href="#faq" className="anchor">FAQ</a>
            <NavAuth />
            <Link href="/create" className="cta sm"><span className="hide-sm">Create my invitation</span><span className="show-sm">Create</span></Link>
          </nav>
        </div>
      </header>

      <main>
        {/* ------------------------------------------------ hero */}
        <section className="hero">
          <Toran className="hero-toran" />
          <PetalRain count={16} />
          <LoadBurst className="hero-burst" />
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">शुभ विवाह <span>·</span> Shubh Vivah</p>
              <h1>
                Your shaadi deserves more than a <em>PDF invite.</em>
              </h1>
              <p className="sub">
                An animated invitation website for every function, from haldi to vidaai. Countdown, maps,
                music and RSVPs for the whole khandaan — made in 5 minutes, shared on WhatsApp.
              </p>
              <div className="ctas">
                <Link href="/create" className="cta">Create my invitation →</Link>
                <Link href="/invite/demo" className="cta ghost"><Eye size={18} /> See a live invite</Link>
              </div>
              <p className="trust">
                <span>Free to create &amp; preview</span>
                <span>One-time payment</span>
                <span>No subscription</span>
              </p>
            </div>

            <div className="stage">
              <Arch className="stage-arch" />
              <div className="phone-slot"><Phone /></div>
              <div className="ground" />
              <Kid className="ch ch-kid" />
              <Bride className="ch ch-bride" />
              <Groom className="ch ch-groom" />
              <DholEgg className="ch ch-dhol"><DholWala /></DholEgg>
              <Kid className="ch ch-kid2" girl={false} dress="#0F6E6E" skin="#8D5524" />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ functions */}
        <section className="sec fns" id="functions">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">हर रस्म, हर रंग</p>
              <h2>Every function gets its moment</h2>
              <p>
                List every ceremony with its own time and venue — so nobody turns up to the sangeet in
                haldi clothes.
              </p>
            </div>
            <div className="fn-strip">
              {FUNCTIONS.map(({ id, name, hi, line, Scene }, i) => (
                <article key={id} className={`fn-card fn-${id} reveal`} style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
                  <div className="fn-art"><Scene /></div>
                  <h3>{name}</h3>
                  <p className="fn-hi" lang="hi">{hi}</p>
                  <p className="fn-line">{line}</p>
                  <span className="fn-chip">Date · Time · Venue</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ how it works */}
        <section className="sec how">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">बस तीन कदम</p>
              <h2>Three steps. Five minutes.</h2>
            </div>
            <div className="steps3">
              <div className="step3 reveal">
                <span className="num">01</span>
                <div className="mini mini-form">
                  <div className="mf-row"><b>Groom</b><span>Aarav</span></div>
                  <div className="mf-row"><b>Bride</b><span>Meher</span></div>
                  <div className="mf-row"><b>Sangeet</b><span>5 Dec, 8 PM</span></div>
                </div>
                <h3>Fill in your details</h3>
                <p>Names, date, functions, venue and your song — a simple form made for your phone.</p>
              </div>
              <div className="step3 reveal" style={{ transitionDelay: "90ms" }}>
                <span className="num">02</span>
                <div className="mini mini-plans">
                  <span className="mp">Preview <Eye size={14} /></span>
                  <span className="mp hot">Publish ✨</span>
                </div>
                <h3>Preview free, then publish</h3>
                <p>See exactly how it looks. Happy? Pay once and your invitation goes live.</p>
              </div>
              <div className="step3 reveal" style={{ transitionDelay: "180ms" }}>
                <span className="num">03</span>
                <div className="mini mini-wa">
                  <div className="wa-bubble">You&apos;re invited! 💛<br /><u>invites.webalchemy.in/…</u></div>
                  <div className="wa-ticks">✓✓ Forwarded to 12 groups</div>
                </div>
                <h3>Share on WhatsApp</h3>
                <p>Send one link to every family group, then watch RSVPs and blessings roll in.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ demo */}
        <section className="sec demo">
          <Rangoli className="rangoli r-tl" />
          <Rangoli className="rangoli r-br" />
          <div className="wrap demo-grid">
            <div className="demo-phone reveal">
              <Phone className="big" />
              <span className="tap-hint">Tap to scratch ✦</span>
            </div>
            <div className="demo-copy reveal">
              <p className="eyebrow">देखिए ज़रा</p>
              <h2>See a real invitation</h2>
              <p>
                Aarav &amp; Meher&apos;s invitation is fully working: scratch the gold card, watch the
                countdown, open the map, try the RSVP form. This is exactly what your guests will get.
              </p>
              <Link href="/invite/demo" className="cta">Open the live demo →</Link>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ templates */}
        <section className="sec tpl">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">अपना अंदाज़</p>
              <h2>Pick your style</h2>
              <p>Two designs ready today — switch between them any time. More hand-crafted styles are on their way.</p>
            </div>
            <div className="tpl-grid">
              {[
                ["marigold-mela", "t-mela", "Marigold Mela", "Ivory, marigold and rani pink — curtains, dancing family, the most festive one."],
                ["emerald-noir", "t-noir", "Emerald Noir", "Black, gold and candlelight elegance."],
              ].map(([id, cls, name, d], i) => (
                <Link key={id} href={`/invite/demo?style=${id}`} className="tpl-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className={`tpl-thumb ${cls}`}><span className="tpl-names">Aarav<br />&amp;<br />Meher</span></div>
                  <div className="tpl-meta"><b>{name}</b><span className="tag live">See it live</span></div>
                  <p>{d}</p>
                </Link>
              ))}
              {[
                ["t-sapphire", "Royal Sapphire", "Midnight blue and gold jharokhas."],
                ["t-pastel", "Pastel Mehendi", "Sage, blush and delicate henna lines."],
              ].map(([cls, name, d], i) => (
                <div key={cls} className="tpl-card soon reveal" style={{ transitionDelay: `${(i + 2) * 80}ms` }} aria-disabled="true">
                  <div className={`tpl-thumb ${cls}`}><span className="tpl-names">Aarav<br />&amp;<br />Meher</span></div>
                  <div className="tpl-meta"><b>{name}</b><span className="tag">Coming soon</span></div>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ khandaan */}
        <section className="sec khandaan">
          <div className="wrap kh-grid">
            <div className="kh-art reveal">
              <div className="speech">Arre wah! Location bhi hai! 🥹</div>
              <Dadi className="kh-dadi" />
            </div>
            <div>
              <div className="sec-head left reveal">
                <p className="eyebrow">पूरे खानदान के लिए</p>
                <h2>Made for the whole khandaan</h2>
                <p>From 8-year-old cousins to 80-year-old dadis — big text, obvious buttons, zero instructions needed.</p>
              </div>
              <ul className="gf-list">
                {GUEST_FEATURES.map(({ Icon, t, d }, i) => (
                  <li key={t} className="reveal" style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
                    <span className="gf-ic"><Icon size={20} /></span>
                    <div><b>{t}</b><span>{d}</span></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ rsvp control room */}
        <section className="sec control">
          <div className="wrap ctl-grid">
            <div>
              <div className="sec-head left reveal">
                <p className="eyebrow">कौन आ रहा है?</p>
                <h2>Your RSVP inbox</h2>
                <p>
                  Every reply and blessing lands in one private place. See who&apos;s coming at a glance,
                  read the wishes, and edit your invitation from the same screen.
                </p>
              </div>
              <ul className="ticks reveal">
                <li><Check size={18} /> Attending and can&apos;t-make-it counts</li>
                <li><Check size={18} /> Messages and blessings from every guest</li>
                <li><Check size={18} /> Edits go live on the same link instantly</li>
                <li><Check size={18} /> Private — only you and your partner can see it</li>
              </ul>
            </div>
            <div className="ctl-mock reveal" aria-label="Example RSVP inbox">
              <div className="ctl-head">
                <b>RSVP inbox</b>
                <span>Aarav &amp; Meher</span>
              </div>
              <div className="ctl-stats">
                <div><b>142</b><span>Attending</span></div>
                <div><b>9</b><span>Can&apos;t make it</span></div>
                <div><b>151</b><span>Responses</span></div>
              </div>
              {[
                ["Sunita Bua", "Attending", "Bahut bahut badhai ho! Can't wait for the sangeet 💃"],
                ["Rohan & family", "Attending", "We'll be there with the whole gang 🎉"],
                ["Mrs. Mehta", "Can't attend", "Blessings to you both — sending love from Pune."],
              ].map(([n, s, m]) => (
                <div key={n} className="ctl-row">
                  <div className="ctl-who"><b>{n}</b><span className={s === "Attending" ? "yes" : "no"}>{s}</span></div>
                  <p>“{m}”</p>
                </div>
              ))}
              <p className="ctl-note">Example inbox</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ login or guest */}
        <section className="sec choice">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">आपकी मर्ज़ी</p>
              <h2>Log in, or just get started</h2>
            </div>
            <div className="choice-grid">
              <div className="choice-card reveal">
                <span className="choice-ic"><UserRound size={26} /></span>
                <h3>Log in</h3>
                <p>Sign in with your email — no password. Every invitation and RSVP stays safe under “My invitations”.</p>
                <Link href="/login" className="cta ghost">Log in</Link>
              </div>
              <div className="choice-card reveal" style={{ transitionDelay: "90ms" }}>
                <span className="choice-ic"><KeyRound size={26} /></span>
                <h3>Continue as a guest</h3>
                <p>No sign-up at all. You get a private edit link — copy it or send it to your own WhatsApp.</p>
                <Link href="/create" className="cta ghost">Start as a guest</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ family chat */}
        <section className="sec chat">
          <div className="wrap chat-grid">
            <div className="sec-head left reveal">
              <p className="eyebrow">फ़ैमिली ग्रुप</p>
              <h2>The family group, five minutes after you share it</h2>
              <p>Dramatisation. Actual results may include more emojis.</p>
            </div>
            <div className="wa">
              <div className="wa-top">
                <span className="wa-av">🏠</span>
                <div><b>Sharma Parivar 💛</b><span>Bua ji, Mama ji, Riya, Dadi, +38</span></div>
              </div>
              <div className="wa-body">
                {CHAT.map((c, i) => (
                  <div key={i} className={`wa-msg ${c.side} reveal`} style={{ transitionDelay: `${i * 260}ms` }}>
                    {c.side === "l" && <b>{c.who}</b>}
                    <span>{c.txt}</span>
                  </div>
                ))}
                <div className="wa-typing reveal" style={{ transitionDelay: `${CHAT.length * 260}ms` }} aria-label="Someone is typing">
                  <i /><i /><i />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ pricing */}
        <section className="sec pricing" id="pricing">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">सीधा हिसाब</p>
              <h2>Simple pricing</h2>
              <p>Create and preview for free. Pay once when you publish — no subscription, ever.</p>
            </div>
            <div className="price-cards">
              {PLAN_ORDER.map((id, i) => {
                const p = PLANS[id];
                return (
                  <div key={id} className={`pc reveal ${id === "plus" ? "hot" : ""}`} style={{ transitionDelay: `${i * 90}ms` }}>
                    {id === "plus" && <span className="pc-badge">Most loved</span>}
                    <h3>{p.name}</h3>
                    <div className="pc-amt">{p.price}</div>
                    <p className="pc-per">one-time · live till your wedding + {p.monthsAfterWedding} months</p>
                    <ul>
                      {p.features.map((f) => <li key={f}><Check size={16} /> {f}</li>)}
                    </ul>
                    <Link href="/create" className={`cta ${id === "plus" ? "" : "ghost"}`}>Start free — pay when you publish</Link>
                  </div>
                );
              })}
            </div>
            <p className="pc-small">
              Secure payment via Razorpay — UPI, cards and netbanking. <Link href="/refund">48-hour refund</Link> if no RSVPs yet.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------ faq */}
        <section className="sec faq" id="faq">
          <div className="wrap narrow">
            <div className="sec-head reveal">
              <p className="eyebrow">सवाल-जवाब</p>
              <h2>Questions, answered</h2>
            </div>
            <div className="faq-list">
              {FAQ.map(([q, a]) => (
                <details key={q} className="reveal">
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ final cta + baraat */}
        <section className="finale">
          <FairyLights className="finale-lights" />
          <PetalRain count={10} />
          <div className="wrap finale-copy reveal">
            <p className="eyebrow light">शुभारंभ</p>
            <h2>Let the celebrations begin.</h2>
            <p>Make your invitation in five minutes. Preview it free — publish when it&apos;s perfect.</p>
            <div className="ctas center">
              <Link href="/create" className="cta">Create my invitation →</Link>
              <a href={WA} target="_blank" rel="noreferrer" className="cta ghost light"><MessageCircle size={18} /> WhatsApp us</a>
            </div>
          </div>
          <div className="road" aria-hidden="true">
            <div className="procession">
              <DholWala className="pr pr-dhol" />
              <Chacha className="pr pr-chacha" />
              <GroomOnGhodi className="pr pr-ghodi" />
              <Kid className="pr pr-kid" />
              <Kid className="pr pr-kid" girl={false} dress="#FFD54A" skin="#8D5524" />
            </div>
          </div>
        </section>
      </main>

      <footer className="lx-foot">
        <div className="wrap">
          <p className="lx-logo"><b>WebAlchemy</b> Invites</p>
          <p>A {CONTACT.business} product · {CONTACT.city} · Made with <Heart size={14} className="heart" /> for Indian weddings</p>
          <nav className="foot-links" aria-label="Footer">
            <a href={WA} target="_blank" rel="noreferrer">WhatsApp {CONTACT.phone}</a>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/refund">Refunds</Link>
          </nav>
        </div>
      </footer>

      {/* mobile sticky CTA */}
      <div className="m-bar">
        <Link href="/create" className="cta"><Pencil size={17} /> Create my invitation</Link>
        <a href={WA} target="_blank" rel="noreferrer" className="m-wa" aria-label="WhatsApp us"><Send size={20} /></a>
      </div>
    </div>
  );
}
