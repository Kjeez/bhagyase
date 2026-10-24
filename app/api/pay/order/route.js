import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { inviteByToken } from "@/lib/invites";
import { PLANS, amountDue } from "@/lib/plans";
import { publishInvite } from "@/lib/publish";
import { allow } from "@/lib/rateLimit";
import { createOrder, freePublishEnabled, razorpayConfigured } from "@/lib/razorpay";
import { getUser } from "@/lib/supabase/server";

// POST { token, plan } → a Razorpay order for publishing / upgrading the invite.
export async function POST(req) {
  try {
    const { token, plan } = await req.json();
    if (!PLANS[plan]) return NextResponse.json({ error: "Pick a plan" }, { status: 400 });

    if (!(await allow("pay", req, 20, 3600))) {
      return NextResponse.json({ error: "Too many attempts — try again later." }, { status: 429 });
    }

    const invite = await inviteByToken(token);
    if (!invite) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const due = amountDue(invite.status === "published" ? invite.plan : null, plan);
    if (due === 0) return NextResponse.json({ published: true });

    if (!razorpayConfigured()) {
      if (freePublishEnabled()) {
        await publishInvite(invite.id, plan);
        return NextResponse.json({ published: true });
      }
      return NextResponse.json({ error: "Payments aren't set up yet — please WhatsApp us." }, { status: 503 });
    }

    const order = await createOrder({
      amount: due,
      receipt: `inv_${invite.id.slice(0, 8)}_${Date.now().toString(36)}`,
      notes: { invite_id: invite.id, slug: invite.slug, plan },
    });

    const { error } = await supabaseAdmin().from("payments").insert({
      invite_id: invite.id,
      plan,
      amount: due,
      razorpay_order_id: order.id,
    });
    if (error) throw error;

    const user = await getUser();
    const d = invite.data || {};
    return NextResponse.json({
      keyId: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: due,
      description: `${PLANS[plan].name} — ${d.groom} & ${d.bride}`,
      prefill: { email: user?.email || "" },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not start payment" }, { status: 500 });
  }
}
