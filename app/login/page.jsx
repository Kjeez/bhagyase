"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

// Only allow same-site relative paths as the post-login destination.
function safeNext(next) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
}

function LoginForm() {
  const params = useSearchParams();
  const next = safeNext(params.get("next"));
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(params.get("error") ? "That login link has expired — request a new one." : "");

  const sb = supabaseBrowser();
  const redirectTo = () => `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

  const magicLink = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setErr(""); setBusy(true);
    const { error } = await sb.auth.signInWithOtp({ email: email.trim(), options: { emailRedirectTo: redirectTo() } });
    setBusy(false);
    if (error) setErr(error.message);
    else setSent(true);
  };

  const google = async () => {
    setErr("");
    const { error } = await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: redirectTo() } });
    if (error) setErr(error.message);
  };

  if (!sb) {
    return <p className="lead">Login isn&apos;t switched on yet. You can still <Link href="/create">create an invitation as a guest</Link>.</p>;
  }

  if (sent) {
    return (
      <div className="share-box">
        <h2>Check your inbox 💌</h2>
        <p className="share-note" style={{ marginTop: 0 }}>
          We sent a login link to <b>{email}</b>. Open it on this device to continue. Can&apos;t find it? Check spam or promotions.
        </p>
      </div>
    );
  }

  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_LOGIN === "true" && (
        <>
          <button className="btn wide-btn" onClick={google}>Continue with Google</button>
          <div className="or"><span>or use your email</span></div>
        </>
      )}
      <form className="wf" onSubmit={magicLink}>
        <label className="wf-field">
          <span>Email</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
        </label>
        <button className="btn ghost" disabled={busy}>
          {busy ? "Sending…" : "Email me a login link"}
        </button>
      </form>
      {err && <p className="ed-err">{err}</p>}
      <p className="share-note">
        No password needed. Prefer not to sign up? <Link href="/create">Continue as a guest</Link> — you&apos;ll get a private edit link instead.
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="ed-page narrow">
      <Link href="/" className="ld-logo"><b>WebAlchemy</b> Invites</Link>
      <h1 style={{ marginTop: 28 }}>Log in</h1>
      <p className="lead">Keep all your invitations and RSVPs in one place.</p>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
