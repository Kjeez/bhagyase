"use client";

import { useEffect, useRef, useState } from "react";

const COLORS = ["#F5A524", "#E0457B", "#FFD54A", "#C8102E", "#F7B7A3", "#0F6E6E"];

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Pops a burst of confetti/petals out of `host` (an element with position: relative).
function burst(host, n = 26) {
  if (!host || reducedMotion()) return;
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    const a = Math.random() * Math.PI * 2;
    const d = 60 + Math.random() * 130;
    s.className = "confetti";
    s.style.setProperty("--x", `${Math.cos(a) * d}px`);
    s.style.setProperty("--y", `${Math.sin(a) * d - 50}px`);
    s.style.setProperty("--r", `${Math.random() * 540 - 270}deg`);
    s.style.background = COLORS[i % COLORS.length];
    host.appendChild(s);
    setTimeout(() => s.remove(), 1100);
  }
}

// Fades/slides `.reveal` elements in as they scroll into view. Content stays
// visible without JS because the hidden state only applies under `.lx-js`.
export function RevealRoot() {
  useEffect(() => {
    const root = document.querySelector(".lx");
    if (!root) return;
    root.classList.add("lx-js");
    const els = root.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}

// Sparse falling rose/marigold petals inside the parent section.
export function PetalRain({ count = 14 }) {
  const [petals, setPetals] = useState([]);
  useEffect(() => {
    if (reducedMotion()) return;
    setPetals(
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        delay: -Math.random() * 16,
        dur: 10 + Math.random() * 8,
        dx: `${Math.round(Math.random() * 160 - 80)}px`,
        rot: `${Math.round(Math.random() * 720 - 360)}deg`,
        c: COLORS[i % 5],
        s: 0.7 + Math.random() * 0.8,
      }))
    );
  }, [count]);
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            background: p.c,
            scale: p.s,
            "--delay": `${p.delay}s`,
            "--dur": `${p.dur}s`,
            "--dx": p.dx,
            "--rot": p.rot,
          }}
        />
      ))}
    </div>
  );
}

// One celebratory burst shortly after the page loads.
export function LoadBurst({ className }) {
  const ref = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => burst(ref.current, 34), 500);
    return () => clearTimeout(t);
  }, []);
  return <div ref={ref} className={className} aria-hidden="true" />;
}

// Easter egg: tap the dhol-wala and he drums double-time with confetti.
export function DholEgg({ className, children }) {
  const ref = useRef(null);
  const timer = useRef(null);
  const [fast, setFast] = useState(false);
  const play = () => {
    setFast(true);
    burst(ref.current);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setFast(false), 2600);
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <button
      type="button"
      ref={ref}
      className={`dhol-egg ${fast ? "dhol-fast" : ""} ${className || ""}`}
      onClick={play}
      aria-label="Tap the dhol for a surprise"
    >
      {children}
    </button>
  );
}

export function LiveCountdown({ iso }) {
  const [t, setT] = useState(null);
  useEffect(() => {
    const target = new Date(iso).getTime();
    const tick = () => {
      const ms = Math.max(0, target - Date.now());
      setT({
        d: Math.floor(ms / 864e5),
        h: Math.floor(ms / 36e5) % 24,
        m: Math.floor(ms / 6e4) % 60,
        s: Math.floor(ms / 1e3) % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);
  const units = [["d", "Days"], ["h", "Hrs"], ["m", "Min"], ["s", "Sec"]];
  return (
    <div className="ph-cd">
      {units.map(([k, label]) => (
        <span key={k}>
          {t ? (k === "d" ? t.d : String(t[k]).padStart(2, "0")) : "--"}
          <i>{label}</i>
        </span>
      ))}
    </div>
  );
}
