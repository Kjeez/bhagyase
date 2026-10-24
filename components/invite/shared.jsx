"use client";

// Behaviour shared by every invitation template: dates, countdown, scroll
// reveals, the scratch card, the photo slideshow and RSVP sending. Each
// template supplies its own markup around these and its own CSS for the
// class names used here.

import { useState, useEffect, useRef, useCallback } from "react";
import { Heart } from "lucide-react";

export const fmtDate = (iso) => {
  const d = new Date(iso);
  return isNaN(d)
    ? "—"
    : d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
};

export const fmtTime = (iso) => {
  const d = new Date(iso);
  return isNaN(d) ? "" : d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
};

export function useCountdown(iso) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0, past: false });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(iso) - new Date();
      if (isNaN(diff) || diff <= 0) return setT({ d: 0, h: 0, m: 0, s: 0, past: true });
      setT({
        d: Math.floor(diff / 864e5),
        h: Math.floor(diff / 36e5) % 24,
        m: Math.floor(diff / 6e4) % 60,
        s: Math.floor(diff / 1e3) % 60,
        past: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);
  return t;
}

// Adds `.in` to `.rv` elements under `rootSelector` as they scroll into view.
export function useReveal(rootSelector) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 }
    );
    document.querySelectorAll(`${rootSelector} .rv`).forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

const GOLD_FOIL = ["#a8811f", "#e9c96a", "#d4af37", "#8f6f1d"];

export function ScratchCard({ dateISO, foil = GOLD_FOIL, ink = "rgba(40,32,8,.75)", font = "600 14px 'EB Garamond', serif", onReveal }) {
  const cvRef = useRef(null);
  const [done, setDone] = useState(false);
  const moves = useRef(0);

  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const dpr = window.devicePixelRatio || 1;
    const w = cv.offsetWidth, h = cv.offsetHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    const ctx = cv.getContext("2d");
    ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, foil[0]); g.addColorStop(0.45, foil[1]);
    g.addColorStop(0.55, foil[2]); g.addColorStop(1, foil[3]);
    ctx.fillStyle = g;
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(0, 0, w, h, 14); ctx.fill(); }
    else ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = ink;
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.fillText("✦  Scratch to Reveal  ✦", w / 2, h / 2 + 5);
  }, [foil, ink, font]);

  const scratch = useCallback((e) => {
    const cv = cvRef.current;
    if (!cv || done) return;
    const r = cv.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    const ctx = cv.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(p.clientX - r.left, p.clientY - r.top, 26, 0, Math.PI * 2);
    ctx.fill();
    if (++moves.current % 12 === 0) {
      const img = ctx.getImageData(0, 0, cv.width, cv.height).data;
      let clear = 0;
      for (let i = 3; i < img.length; i += 64) if (img[i] === 0) clear++;
      if (clear / (img.length / 64) > 0.45) {
        setDone(true);
        onReveal?.();
      }
    }
  }, [done, onReveal]);

  return (
    <div className="scratch-wrap rv">
      <div className="scratch-under">
        <span className="sc-eyebrow">Save the date</span>
        <span className="sc-date">{fmtDate(dateISO)}</span>
        <span className="sc-time">{fmtTime(dateISO)} onwards</span>
      </div>
      <canvas
        ref={cvRef}
        className={`scratch-foil ${done ? "gone" : ""}`}
        onMouseDown={scratch} onMouseMove={(e) => e.buttons === 1 && scratch(e)}
        onTouchStart={scratch} onTouchMove={scratch}
      />
    </div>
  );
}

export function Slideshow({ photos }) {
  const [i, setI] = useState(0);
  const [err, setErr] = useState({});
  useEffect(() => {
    if (photos.length < 2) return;
    const id = setInterval(() => setI((p) => (p + 1) % photos.length), 4000);
    return () => clearInterval(id);
  }, [photos.length]);
  if (!photos.length) return null;
  return (
    <div className="slide rv">
      {photos.map((src, j) => (
        <div key={j} className={`slide-img ${j === i ? "on" : ""}`}>
          {!err[j] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={`Photo ${j + 1}`} onError={() => setErr((e) => ({ ...e, [j]: true }))} />
          ) : (
            <div className="slide-fallback"><Heart size={30} strokeWidth={1} /></div>
          )}
        </div>
      ))}
      {photos.length > 1 && (
        <div className="slide-dots">
          {photos.map((_, j) => (
            <button key={j} className={j === i ? "on" : ""} onClick={() => setI(j)} aria-label={`Photo ${j + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
}

const EMPTY_RSVP = { name: "", email: "", attending: "", msg: "", faxOnly: "" };

// RSVP form state + submit. In preview mode nothing is saved.
export function useRsvp(slug, preview) {
  const [rsvp, setRsvp] = useState(EMPTY_RSVP);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const setField = (k, v) => setRsvp((r) => ({ ...r, [k]: v }));
  const set = (k) => (e) => setField(k, e.target.value);

  const submit = async () => {
    if (!rsvp.name.trim() || sending) return false;
    if (preview) {
      setSent(true);
      setTimeout(() => setSent(false), 2500);
      return true;
    }
    setSending(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug, name: rsvp.name, email: rsvp.email,
          attending: rsvp.attending, message: rsvp.msg, faxOnly: rsvp.faxOnly,
        }),
      });
      if (!res.ok) return false;
      setSent(true);
      setRsvp(EMPTY_RSVP);
      setTimeout(() => setSent(false), 3000);
      return true;
    } finally {
      setSending(false);
    }
  };

  return { rsvp, set, setField, sent, sending, submit };
}

// Background song with a toggle; `start()` lets a template begin playback
// from a user gesture (browsers block autoplay otherwise).
export function useMusic() {
  const audioRef = useRef(null);
  const [on, setOn] = useState(false);
  const start = () => {
    const a = audioRef.current;
    if (!a) return;
    a.play().then(() => setOn(true)).catch(() => {});
  };
  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (on) { a.pause(); setOn(false); }
    else start();
  };
  return { audioRef, on, start, toggle };
}
