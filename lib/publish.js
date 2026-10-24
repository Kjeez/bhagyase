import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { expiryFor } from "@/lib/plans";

// Publishes (or upgrades) an invite to `plan`. Idempotent.
export async function publishInvite(inviteId, plan) {
  const db = supabaseAdmin();
  const { data: invite, error } = await db
    .from("invites")
    .select("id, data, published_at")
    .eq("id", inviteId)
    .single();
  if (error || !invite) throw new Error("Invite not found");

  const { error: upErr } = await db
    .from("invites")
    .update({
      status: "published",
      plan,
      published_at: invite.published_at || new Date().toISOString(),
      expires_at: expiryFor(invite.data?.dateISO, plan),
      updated_at: new Date().toISOString(),
    })
    .eq("id", inviteId);
  if (upErr) throw upErr;
}

// Marks a Razorpay order paid and publishes its invite. Safe to call twice
// (checkout handler and webhook both land here).
export async function markOrderPaid(orderId, paymentId) {
  const db = supabaseAdmin();
  const { data: pay, error } = await db
    .from("payments")
    .select("id, invite_id, plan, status")
    .eq("razorpay_order_id", orderId)
    .single();
  if (error || !pay) return null;

  if (pay.status !== "paid") {
    await db
      .from("payments")
      .update({ status: "paid", razorpay_payment_id: paymentId, paid_at: new Date().toISOString() })
      .eq("id", pay.id);
  }
  await publishInvite(pay.invite_id, pay.plan);
  return pay;
}
