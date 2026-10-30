import { NextResponse } from "next/server";
import { inviteByToken } from "@/lib/invites";
import { markOrderPaid } from "@/lib/publish";
import { verifyPaymentSignature } from "@/lib/razorpay";

// POST { token, razorpay_order_id, razorpay_payment_id, razorpay_signature }
// Called by the checkout handler right after payment.
export async function POST(req) {
  try {
    const { token, razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    if (!verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
      return NextResponse.json({ error: "Payment could not be verified" }, { status: 400 });
    }

    const invite = await inviteByToken(token);
    if (!invite) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const pay = await markOrderPaid(razorpay_order_id, razorpay_payment_id);
    if (!pay || pay.invite_id !== invite.id) {
      return NextResponse.json({ error: "Payment not found for this invitation" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not verify payment" }, { status: 500 });
  }
}
