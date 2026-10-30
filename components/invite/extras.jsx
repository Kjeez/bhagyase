"use client";

// Shared markup for the options every template supports — blessings, story
// chapters, family & contacts. Templates style the ix-* classes their own way.

import { Phone } from "lucide-react";
import { BLESSINGS } from "@/lib/inviteView";

const telHref = (phone) => `tel:${phone.replace(/[^+\d]/g, "")}`;

// The short blessing line(s) at the very top: ॥ श्री गणेशाय नमः ॥ and/or ੴ
export function BlessingLines({ view, className = "" }) {
  if (!view.blessings.length) return null;
  return (
    <div className={`ix-blessing ${className}`}>
      {view.blessings.map((b) => (
        <p key={b} lang={BLESSINGS[b].lang} className={`ix-bl ix-bl-${b}`}>
          {BLESSINGS[b].kicker}
        </p>
      ))}
    </div>
  );
}

// The full shloka / Gurbani verse(s), for templates with a letter section.
export function BlessingVerses({ view, className = "" }) {
  if (!view.blessings.length) return null;
  return (
    <div className={`ix-verses ${className}`}>
      {view.blessings.map((b) => (
        <p key={b} lang={BLESSINGS[b].lang} className={`ix-verse ix-verse-${b}`}>
          {BLESSINGS[b].verse[0]}
          <br />
          {BLESSINGS[b].verse[1]}
        </p>
      ))}
    </div>
  );
}

export function StoryChapters({ view, className = "" }) {
  if (!view.chapters.length) return null;
  return (
    <ol className={`ix-chapters ${className}`}>
      {view.chapters.map((c, i) => (
        <li key={i} className="ix-chapter rv">
          {c.title && <span className="ix-ch-step">Chapter {i + 1}</span>}
          {c.title && <h3 className="ix-ch-title">{c.title}</h3>}
          {c.text && <p className="ix-ch-text">{c.text}</p>}
        </li>
      ))}
    </ol>
  );
}

// Grandparents, parents, family name and who to call — for this link's family.
export function FamilyBlock({ view, className = "" }) {
  if (!view.familyRows.length && !view.contacts.length) return null;
  return (
    <div className={`ix-family ${className}`}>
      {view.familyRows.map(([role, names]) => (
        <div key={role} className="ix-fam-row rv">
          <span className="ix-fam-role">{role}</span>
          {names.split("\n").map((line) => (
            <span key={line} className="ix-fam-names">{line}</span>
          ))}
        </div>
      ))}
      {view.contacts.length > 0 && (
        <div className="ix-contacts rv">
          <span className="ix-fam-role">For any assistance</span>
          {view.contacts.map((c) => (
            <a key={c.name + c.phone} className="ix-contact" href={c.phone ? telHref(c.phone) : undefined}>
              <Phone size={14} /> <span>{c.name}</span>
              {c.phone && <b>{c.phone}</b>}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
