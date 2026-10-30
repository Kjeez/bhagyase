import LegalPage from "@/components/LegalPage";
import { CONTACT } from "@/lib/site";

export const metadata = { title: "Contact — WebAlchemy Invites", alternates: { canonical: "/contact" } };

export default function Contact() {
  return (
    <LegalPage title="Contact us">
      <p>We&apos;re a small studio in New Delhi and we reply fastest on WhatsApp.</p>
      <ul>
        <li><b>Business:</b> {CONTACT.business}</li>
        <li><b>WhatsApp / phone:</b> <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer">{CONTACT.phone}</a></li>
        <li><b>Email:</b> <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
        <li><b>Location:</b> {CONTACT.city}</li>
        <li><b>Hours:</b> Monday–Saturday, 10 AM – 7 PM IST</li>
      </ul>
    </LegalPage>
  );
}
