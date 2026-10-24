import Link from "next/link";
import { CONTACT } from "@/lib/site";

export default function LegalPage({ title, updated = "24 October 2026", children }) {
  return (
    <div className="ed-page legal">
      <Link href="/" className="ld-logo"><b>WebAlchemy</b> Invites</Link>
      <h1 style={{ marginTop: 28 }}>{title}</h1>
      <p className="lead">Last updated {updated}</p>
      {children}
      <p className="legal-contact">
        Questions? Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or WhatsApp{" "}
        <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer">{CONTACT.phone}</a>.
      </p>
    </div>
  );
}
