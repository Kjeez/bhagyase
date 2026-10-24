import LegalPage from "@/components/LegalPage";
import { CONTACT } from "@/lib/site";

export const metadata = { title: "Refund & Cancellation Policy — WebAlchemy Invites", alternates: { canonical: "/refund" } };

export default function Refund() {
  return (
    <LegalPage title="Refund & Cancellation Policy">
      <p>
        Creating and previewing an invitation is free, so you can see exactly what you&apos;re getting before you pay. Payment
        is taken once, when you publish.
      </p>

      <h2>When you can get a refund</h2>
      <ul>
        <li><b>Within 48 hours</b> of payment, if your invitation has not received any RSVPs — a full refund, no questions asked.</li>
        <li><b>Technical problems</b> on our side that stop your invitation from working and that we can&apos;t fix within 72 hours of you telling us — a full refund.</li>
        <li><b>Charged twice</b> for the same invitation — the duplicate payment is refunded in full.</li>
      </ul>

      <h2>When refunds aren&apos;t available</h2>
      <p>
        After 48 hours, or once guests have started replying, the invitation has been delivered and the payment is
        non-refundable. Upgrades follow the same rules.
      </p>

      <h2>How to ask</h2>
      <p>
        Email {CONTACT.email} or WhatsApp {CONTACT.phone} with the couple&apos;s names and the payment ID from your Razorpay
        receipt. Approved refunds go back to the original payment method within 5–7 working days.
      </p>

      <h2>Cancellation</h2>
      <p>
        There&apos;s no subscription to cancel. If you want your invitation taken down early, tell us and we&apos;ll remove it
        along with its RSVPs.
      </p>
    </LegalPage>
  );
}
