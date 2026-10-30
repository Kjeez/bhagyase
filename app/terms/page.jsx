import LegalPage from "@/components/LegalPage";
import { CONTACT } from "@/lib/site";
import { PLANS } from "@/lib/plans";

export const metadata = { title: "Terms of Service — WebAlchemy Invites", alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        These terms apply when you use WebAlchemy Invites, a service of {CONTACT.business}, {CONTACT.city}. By creating an
        invitation or paying for a plan you agree to them.
      </p>

      <h2>The service</h2>
      <p>
        You can create and preview an invitation for free. Publishing makes it live at its link and requires a one-time
        payment: {PLANS.classic.name} ({PLANS.classic.price}, live until your wedding date + {PLANS.classic.monthsAfterWedding} months)
        or {PLANS.plus.name} ({PLANS.plus.price}, live until your wedding date + {PLANS.plus.monthsAfterWedding} months). Prices include
        applicable taxes unless stated otherwise.
      </p>

      <h2>Your content</h2>
      <ul>
        <li>You are responsible for what you put on your invitation and confirm you have the right to use any photos, music and names.</li>
        <li>No unlawful, hateful, misleading or infringing content. We may take down invitations that break this rule.</li>
        <li>You keep ownership of your content and give us permission to host and display it for your invitation.</li>
      </ul>

      <h2>Your links</h2>
      <p>
        The private edit link gives full control of an invitation. Keep it safe, or log in and save the invitation to your
        account. We are not responsible for changes made by someone you shared the edit link with.
      </p>

      <h2>Availability</h2>
      <p>
        We work hard to keep invitations online but can&apos;t guarantee uninterrupted service. If your invitation is
        unavailable for a long period because of a fault on our side, see our refund policy.
      </p>

      <h2>Liability</h2>
      <p>
        Our total liability for any claim is limited to the amount you paid for the invitation concerned. We are not liable
        for indirect losses, such as guests missing an event because of incorrect details entered on an invitation.
      </p>

      <h2>Law</h2>
      <p>These terms are governed by the laws of India, and the courts of New Delhi have jurisdiction.</p>
    </LegalPage>
  );
}
