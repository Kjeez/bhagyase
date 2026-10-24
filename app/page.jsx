import Link from "next/link";
import NavAuth from "@/components/NavAuth";
import { PLANS, PLAN_ORDER } from "@/lib/plans";
import { CONTACT } from "@/lib/site";
import {
  MessageCircleHeart, Timer, MapPin, Music, Sparkles, Pencil, Share2, Inbox,
} from "lucide-react";

export const metadata = {
  title: "WebAlchemy Invites — Animated Digital Wedding Invitations with RSVP",
  description:
    "Create a beautiful animated wedding invitation website in minutes. Countdown, scratch-to-reveal date, maps, music and guest RSVP. Share on WhatsApp, edit anytime from your phone. One-time payment, no subscription.",
};

export default function Landing() {
  return (
    <>
      <nav className="ld-nav">
        <Link href="/" className="ld-logo"><b>WebAlchemy</b> Invites</Link>
        <div className="ld-nav-r">
          <NavAuth />
          <Link href="/create" className="btn"><span className="hide-sm">Create my invitation</span><span className="show-sm">Create</span></Link>
        </div>
      </nav>

      <section className="ld-hero">
        <div>
          <h1>
            Your wedding deserves more than a <em>PDF invite</em>.
          </h1>
          <p className="sub">
            A beautiful animated invitation website for your wedding — countdown,
            scratch-to-reveal date, program timeline, maps, music and guest RSVP.
            Made in minutes. Shared on WhatsApp. Editable anytime from your phone.
          </p>
          <div className="ld-cta-row">
            <Link href="/create" className="btn">Create my invitation →</Link>
            <Link href="/invite/demo" className="btn ghost">See a live invite</Link>
          </div>
          <p className="ld-trust">
            Free to create &amp; preview · <b>One-time payment</b> · No subscription
          </p>
        </div>

        {/* CSS phone mockup — replace inner content with a looping demo video later */}
        <div className="phone" aria-hidden="true">
          <div className="phone-in">
            <div className="phone-screen">
              <div className="phone-notch" />
              <span className="ph-eyebrow">We joyfully invite you to the wedding of</span>
              <span className="ph-name">Aarav</span>
              <span className="ph-amp">&amp;</span>
              <span className="ph-name">Meher</span>
              <span className="ph-line">Sunday, 6 December 2026</span>
              <div className="ph-rule"><i /><b /><i /></div>
              <div className="ph-cd">
                <span>148<i>Days</i></span>
                <span>06<i>Hrs</i></span>
                <span>22<i>Min</i></span>
                <span>41<i>Sec</i></span>
              </div>
              <span className="ph-line" style={{ opacity: 0.7 }}>Scroll ⌄</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ld-feats">
        <div className="feat"><Sparkles className="ic" size={22} /><h3>Scratch to reveal</h3><p>Guests scratch a gold foil card to reveal your wedding date — a moment they remember.</p></div>
        <div className="feat"><Timer className="ic" size={22} /><h3>Live countdown</h3><p>Counting down to forever — days, hours, minutes and seconds to your big day.</p></div>
        <div className="feat"><MapPin className="ic" size={22} /><h3>Venue &amp; maps</h3><p>One tap opens Google Maps. No more &quot;bhai location bhejo&quot; calls on the wedding day.</p></div>
        <div className="feat"><MessageCircleHeart className="ic" size={22} /><h3>RSVP &amp; wishes</h3><p>Guests confirm attendance and send wishes — everything lands in your private inbox.</p></div>
        <div className="feat"><Music className="ic" size={22} /><h3>Background music</h3><p>Add your song. It plays softly while guests scroll through your story.</p></div>
        <div className="feat"><Pencil className="ic" size={22} /><h3>Edit anytime</h3><p>Venue changed? Time shifted? Update from your phone — the same link updates instantly.</p></div>
        <div className="feat"><Share2 className="ic" size={22} /><h3>WhatsApp ready</h3><p>One elegant link that opens instantly on any phone. Share to groups in seconds.</p></div>
        <div className="feat"><Inbox className="ic" size={22} /><h3>Guest list view</h3><p>See who&apos;s coming at a glance — attending counts and messages in one place.</p></div>
      </section>

      <section className="ld-steps">
        <h2>Three steps. Five minutes.</h2>
        <div className="steps">
          <div className="step"><span className="n">01</span><h3>Fill your details</h3><p>Names, date, venue, events — a simple form designed for your phone.</p></div>
          <div className="step"><span className="n">02</span><h3>Preview &amp; publish</h3><p>Preview it free. Pay once to go live and get your unique invitation link — saved in your account or a private edit link.</p></div>
          <div className="step"><span className="n">03</span><h3>Share &amp; track</h3><p>Send on WhatsApp, then watch RSVPs and wishes arrive in your inbox.</p></div>
        </div>
      </section>

      <section className="ld-price" id="pricing">
        <h2>Simple pricing</h2>
        <p className="ld-price-sub">Create and preview for free. Pay once when you publish — no subscription.</p>
        <div className="price-grid">
          {PLAN_ORDER.map((id) => {
            const p = PLANS[id];
            return (
              <div className={`price-card ${id === "plus" ? "hot" : ""}`} key={id}>
                {id === "plus" && <span className="plan-badge">Most loved</span>}
                <h3>{p.name}</h3>
                <div className="amt">{p.price}</div>
                <div className="per">one-time · live till your wedding + {p.monthsAfterWedding} months</div>
                <ul>
                  {p.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <Link href="/create" className={`btn ${id === "plus" ? "" : "ghost"}`}>Start free — pay when you publish</Link>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="ld-foot">
        <p>WebAlchemy Invites · A {CONTACT.business} product · {CONTACT.city}</p>
        <p className="ld-foot-links">
          <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp us</a>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/refund">Refunds</Link>
        </p>
      </footer>
    </>
  );
}
