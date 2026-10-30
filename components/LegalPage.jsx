import FestiveShell from "@/components/FestiveShell";
import { CONTACT } from "@/lib/site";

export default function LegalPage({ title, updated = "24 October 2026", children }) {
  return (
    <FestiveShell>
      <div className="ed-page legal">
        <h1>{title}</h1>
        <p className="lead">Last updated {updated}</p>
        {children}
        <p className="legal-contact">
          Questions? Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or WhatsApp{" "}
          <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer">{CONTACT.phone}</a>.
        </p>
      </div>
    </FestiveShell>
  );
}
