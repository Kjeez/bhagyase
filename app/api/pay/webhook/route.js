import { NextResponse } from "next/server";
import { markOrderPaid } from "@/lib/publish";
import { verifyWebhookSignature } from "@/lib/razorpay";

// Razorpay webhook (Dashboard → Webhooks → events: payment.captured, order.paid).
// Backup for when the guest closes the tab before the checkout handler runs.
export async function POST(req) {
  const raw = await req.text();
  if (!verifyWebhookSignature(raw, req.headers.get("x-razorpay-signature"))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    const event = JSON.parse(raw);
    if (event.event === "payment.captured" || event.event === "order.paid") {
      const payment = event.payload?.payment?.entity;
      const orderId = payment?.order_id || event.payload?.order?.entity?.id;
      if (orderId) await markOrderPaid(orderId, payment?.id || null);
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
