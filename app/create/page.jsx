"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InviteForm from "@/components/InviteForm";
import { DEFAULT_DATA } from "@/lib/defaults";
import { useUser } from "@/components/useUser";

export default function CreatePage() {
  const router = useRouter();
  const { user, ready } = useUser();
  const [data, setData] = useState(DEFAULT_DATA);
  const [company, setCompany] = useState(""); // honeypot
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

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
        body: JSON.stringify({ data, company }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      router.push(`/edit/${json.editToken}?new=1`);
    } catch (e) {
      setErr(e.message);
      setSaving(false);
    }
  };

  return (
    <div className="ed-page">
      <h1>Create your invitation</h1>
      <p className="lead">
        Fill what you have — everything can be edited later from your phone. Empty sections are hidden automatically.
        It&apos;s free to create and preview; you only pay when you publish.
      </p>

      {ready && (
        <div className="auth-hint">
          {user ? (
            <>Logged in as <b>{user.email}</b> — this invitation will be saved under <Link href="/dashboard">My invitations</Link>.</>
          ) : (
            <>Creating as a guest — you&apos;ll get a private edit link. <Link href="/login?next=/create">Log in</Link> to keep it safe in your account.</>
          )}
        </div>
      )}

      <InviteForm data={data} setData={setData} />
      <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="company"
        value={company} onChange={(e) => setCompany(e.target.value)} />

      <div className="ed-actions">
        <button className="btn" onClick={create} disabled={saving}>
          {saving ? <span className="spin" /> : null} {saving ? "Creating…" : "Create & preview →"}
        </button>
        <Link href="/" className="btn ghost">Back</Link>
      </div>
      {err && <p className="ed-err">{err}</p>}
    </div>
  );
}
