import Link from "next/link";

// Full-screen message for invites that aren't viewable (draft / expired).
export default function InviteStatus({ title, children }) {
  return (
    <div className="inv-status">
      <div className="inv-status-card">
        <span className="inv-status-orn" aria-hidden="true">✦</span>
        <h1>{title}</h1>
        <p>{children}</p>
        <Link href="/" className="btn ghost">Make your own invitation</Link>
      </div>
    </div>
  );
}
