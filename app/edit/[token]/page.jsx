"use client";

import { useState, useEffect, useCallback, use } from "react";
import Link from "next/link";
import FestiveShell from "@/components/FestiveShell";
import InviteForm from "@/components/InviteForm";
import LivePreview from "@/components/LivePreview";
import PublishPanel from "@/components/PublishPanel";
import { mergeData } from "@/lib/defaults";
import { PLANS } from "@/lib/plans";
import { Copy, Check, ExternalLink, Eye } from "lucide-react";

function CopyBtn({ text }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {}
  };
  return (
    <button className="btn ghost" onClick={copy}>
      {done ? <Check size={15} /> : <Copy size={15} />} Copy
    </button>
  );
}

export default function EditPage({ params }) {
  const { token } = use(params);
  const [inv, setInv] = useState(null); // API response: status, plan, rsvps, ownership…
  const [data, setData] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/invites/token/${token}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Invitation not found");
      const json = await res.json();
      setData(mergeData(json.data));
      setInv(json);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    setIsNew(new URLSearchParams(window.location.search).has("new"));
    load();
  }, [load]);

  const save = async () => {
    setErr(""); setMsg("");
    setSaving(true);
    try {
      const res = await fetch(`/api/invites/token/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not save");
      setMsg(inv.status === "published" ? "Saved! Your live invitation is updated." : "Saved! Open the preview to see it.");
      setTimeout(() => setMsg(""), 3000);
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  const claim = async () => {
    setErr("");
    const res = await fetch(`/api/invites/token/${token}/claim`, { method: "POST" });
    const json = await res.json();
    if (!res.ok) { setErr(json.error || "Could not save to your account"); return; }
    setMsg("Saved to your account — find it any time under My invitations.");
    load();
  };

  const onPublished = () => {
    load();
    setIsNew(false);
    setMsg("Published! Share your link on WhatsApp 🎉");
  };

  if (loading) return <FestiveShell><div className="center-load">Loading your invitation…</div></FestiveShell>;
  if (err && !data) return <FestiveShell><div className="center-load">{err}</div></FestiveShell>;

  const published = inv.status === "published";
  const rsvps = inv.rsvps;
  const yes = rsvps.filter((r) => r.attending === "yes").length;
  const no = rsvps.filter((r) => r.attending === "no").length;
  const inviteUrl = `${origin}/invite/${inv.slug}`;
  const editUrl = `${origin}/edit/${token}`;
  const wa = `https://wa.me/?text=${encodeURIComponent(
    `You're invited! 💛\n${data.groom} & ${data.bride}\n${inviteUrl}`
  )}`;
  const waSelf = `https://wa.me/?text=${encodeURIComponent(
    `My private edit link for ${data.groom} & ${data.bride}'s invitation (don't share):\n${editUrl}`
  )}`;

  return (
    <FestiveShell>
      <div className="fx-split">
        <div className="ed-page">
          <div className="ed-top">
            <h1>{isNew ? "Your invitation is ready 🎉" : "Edit invitation"}</h1>
            {inv.isOwner && <Link href="/dashboard" className="ld-navlink">← My invitations</Link>}
          </div>
          <p className="lead">
            {published
              ? "Changes go live on your invitation link the moment you save."
              : "It's a private draft — preview it, polish it, and publish when you're happy."}
          </p>

          {/* status + publish */}
          {published ? (
            <div className="share-box">
              <h2>Live · {PLANS[inv.plan]?.name || "Published"}</h2>
              <div className="share-link">
                <code>{inviteUrl}</code>
                <CopyBtn text={inviteUrl} />
              </div>
              <div className="share-link" style={{ marginTop: 12 }}>
                <a className="btn" href={wa} target="_blank" rel="noreferrer">Share on WhatsApp</a>
                <Link className="btn ghost" href={`/invite/${inv.slug}`} target="_blank">
                  Open invitation <ExternalLink size={14} />
                </Link>
              </div>
              {inv.expiresAt && (
                <p className="share-note">
                  Stays live until {new Date(inv.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.
                </p>
              )}
              {inv.plan !== "plus" && (
                <details className="upgrade">
                  <summary>Upgrade to Shaadi Plus</summary>
                  <PublishPanel token={token} currentPlan={inv.plan} onPublished={onPublished} />
                </details>
              )}
            </div>
          ) : (
            <div className="share-box">
              <h2>Draft · not live yet</h2>
              <p className="share-note" style={{ marginTop: 0 }}>
                Guests who open your link now see a &ldquo;coming soon&rdquo; card. Publish to switch it on.
              </p>
              <div className="share-link" style={{ margin: "14px 0 20px" }}>
                <Link className="btn ghost" href={`/preview/${token}`} target="_blank">
                  <Eye size={15} /> Preview invitation
                </Link>
              </div>
              <PublishPanel token={token} currentPlan={null} onPublished={onPublished} />
            </div>
          )}

          {/* keep access safe */}
          {!inv.isOwner && (
            <div className="share-box">
              <h2>Private edit link — save this</h2>
              <div className="share-link">
                <code>{editUrl}</code>
                <CopyBtn text={editUrl} />
              </div>
              <div className="share-link" style={{ marginTop: 12 }}>
                <a className="btn ghost" href={waSelf} target="_blank" rel="noreferrer">Send to my WhatsApp</a>
                {inv.loggedIn && !inv.owned && <button className="btn" onClick={claim}>Save to my account</button>}
                {!inv.loggedIn && (
                  <Link className="btn" href={`/login?next=${encodeURIComponent(`/edit/${token}`)}`}>Log in to keep it safe</Link>
                )}
              </div>
              <p className="share-note">
                Anyone with this link can edit the invitation and read your RSVP inbox — share it only with your partner.
                {!inv.owned && " Logging in saves it to your account so you can never lose it."}
              </p>
            </div>
          )}

          <InviteForm data={data} setData={setData} />

          <div className="ed-actions">
            <button className="btn" onClick={save} disabled={saving}>
              {saving ? <span className="spin" /> : null} {saving ? "Saving…" : "Save changes"}
            </button>
            <Link className="btn ghost" href={`/preview/${token}`} target="_blank"><Eye size={15} /> Preview</Link>
          </div>
          {msg && <p className="ed-msg">{msg}</p>}
          {err && <p className="ed-err">{err}</p>}

          <div className="inbox">
            <h2>RSVP inbox</h2>
            <p className="stats">
              <b>{yes}</b> attending · <b>{no}</b> can&apos;t make it · <b>{rsvps.length}</b> total responses
            </p>
            {rsvps.length === 0 ? (
              <div className="inbox-empty">
                {published
                  ? "No responses yet — share your link on WhatsApp and they'll appear here."
                  : "Publish your invitation and RSVPs will start arriving here."}
              </div>
            ) : (
              rsvps.map((r, i) => (
                <div className="rsvp-card" key={i}>
                  <div className="who">
                    <span className="nm">{r.name}</span>
                    {r.attending && (
                      <span className={`tag ${r.attending === "yes" ? "yes" : "no"}`}>
                        {r.attending === "yes" ? "Attending" : "Can't attend"}
                      </span>
                    )}
                  </div>
                  {r.email && <div className="em">{r.email}</div>}
                  {r.message && <div className="ms">“{r.message}”</div>}
                  <div className="dt">{new Date(r.created_at).toLocaleString("en-IN")}</div>
                </div>
              ))
            )}
          </div>
        </div>
        <aside className="fx-aside">
          <LivePreview data={data} label={published ? "Your live invitation" : "Draft preview"} />
          <Link className="btn ghost" href={`/preview/${token}`} target="_blank"><Eye size={15} /> Open full preview</Link>
        </aside>
      </div>
    </FestiveShell>
  );
}
