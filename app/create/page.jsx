"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import FestiveShell from "@/components/FestiveShell";
import InviteForm from "@/components/InviteForm";
import LivePreview from "@/components/LivePreview";
import { Bride, Groom } from "@/components/landing/Art";
import { PetalRain, burst } from "@/components/landing/Motion";
import { DEFAULT_DATA } from "@/lib/defaults";
import { useUser } from "@/components/useUser";

// Rough "how complete is it" score shown in the action bar.
function readiness(d) {
  const checks = [
    d.groom.trim(), d.bride.trim(), d.dateISO, d.welcomeMsg.trim(), d.photos.length, d.musicUrl.trim(),
    d.timeline.some((t) => t.when.trim()), d.venueName.trim(), d.mapsUrl.trim(),
    d.dressWomen.trim() || d.dressMen.trim(), d.preEvents.some((e) => e.when.trim()),
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

export default function CreatePage() {
  const router = useRouter();
  const { user, ready } = useUser();
  const [data, setData] = useState(DEFAULT_DATA);
  const [faxOnly, setFaxOnly] = useState(""); // honeypot
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const barRef = useRef(null);
  const pct = useMemo(() => readiness(data), [data]);

  const create = async () => {
    setErr("");
    if (!data.groom.trim() || !data.bride.trim()) {
      setErr("Groom and bride names are required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, faxOnly }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      burst(barRef.current, 40);
      setTimeout(() => router.push(`/edit/${json.editToken}?new=1`), 650);
    } catch (e) {
      setErr(e.message);
      setSaving(false);
    }
  };

  return (
    <FestiveShell>
      <section className="fx-hero">
        <PetalRain count={8} />
        <div>
          <p className="fx-eyebrow">शुभ शुरुआत</p>
          <h1>Let&apos;s make your invitation</h1>
          <p className="lead">
            Fill in what you have — everything can be changed later from your phone, and empty sections hide
            themselves. It&apos;s free to create and preview; you only pay when you publish.
          </p>
        </div>
        <div className="fx-hero-art" aria-hidden="true">
          <Bride />
          <Groom />
        </div>
      </section>

      {ready && (
        <div className="auth-hint">
          {user ? (
            <>Logged in as <b>{user.email}</b> — this invitation will be saved under <Link href="/dashboard">My invitations</Link>.</>
          ) : (
            <>Creating as a guest — you&apos;ll get a private edit link. <Link href="/login?next=/create">Log in</Link> to keep it safe in your account.</>
          )}
        </div>
      )}

      <div className="fx-split">
        <div>
          <InviteForm data={data} setData={setData} />
          <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="contact_by_fax_only"
            value={faxOnly} onChange={(e) => setFaxOnly(e.target.value)} />
        </div>
        <aside className="fx-aside">
          <LivePreview data={data} />
        </aside>
      </div>

      <div className="ed-actions" ref={barRef}>
        <div className="fx-progress" aria-live="polite">
          <span>Your invitation is <b>{pct}%</b> ready{pct === 100 ? " 🎉" : ""}</span>
          <i><b style={{ width: `${pct}%` }} /></i>
        </div>
        <a href="#preview" className="btn ghost fx-preview-jump"><Eye size={16} /> Preview</a>
        <button className="btn" onClick={create} disabled={saving}>
          {saving ? <span className="spin" /> : null} {saving ? "Creating…" : "Create & preview →"}
        </button>
      </div>
      {err && <p className="ed-err">{err}</p>}
    </FestiveShell>
  );
}
