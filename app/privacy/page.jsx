import LegalPage from "@/components/LegalPage";
import { CONTACT } from "@/lib/site";

export const metadata = { title: "Privacy Policy — WebAlchemy Invites", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        WebAlchemy Invites is run by {CONTACT.business}, {CONTACT.city}. This policy explains what we collect when you
        create a digital invitation or reply to one, and what we do with it.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li><b>Couples:</b> the details you type into your invitation (names, family lines, dates, venues, photos and music links), and your email address if you log in.</li>
        <li><b>Guests:</b> the name, optional email, attendance answer and message you send through an invitation&apos;s RSVP form.</li>
        <li><b>Payments:</b> handled by Razorpay. We receive the order and payment IDs and the amount — never your card, UPI or bank details.</li>
        <li><b>Technical:</b> a one-way hash of your IP address, kept briefly to stop spam, and the cookies needed to keep you logged in.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To show your invitation to the people you share it with, and RSVPs only to the couple.</li>
        <li>To process payments and give support.</li>
        <li>We do not sell your data or use it for advertising.</li>
      </ul>

      <h2>Who can see what</h2>
      <p>
        An invitation is visible to anyone who has its link; we ask search engines not to index invitations. RSVP messages
        are private to whoever holds the invitation&apos;s edit link or owns it in their account.
      </p>

      <h2>Where it&apos;s stored</h2>
      <p>Data is stored with our providers Supabase (database and login) and Vercel (hosting), and payments go through Razorpay.</p>

      <h2>How long we keep it</h2>
      <p>
        Invitations stay online until the expiry date of your plan. You can ask us to delete an invitation and all its RSVPs
        at any time.
      </p>

      <h2>Your choices</h2>
      <p>You can ask us for a copy of your data, to correct it, or to delete it by writing to {CONTACT.email}.</p>
    </LegalPage>
  );
}
