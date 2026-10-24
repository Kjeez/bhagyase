import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { mergeData } from "@/lib/defaults";
import { inviteByToken } from "@/lib/invites";
import { templateOf } from "@/lib/templates";
import { getUser } from "@/lib/supabase/server";
import { freePublishEnabled, razorpayConfigured } from "@/lib/razorpay";

// GET: invite data + RSVP inbox (owner view)
export async function GET(_req, { params }) {
  const { token } = await params;
  const invite = await inviteByToken(token);
  if (!invite) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const db = supabaseAdmin();
  const { data: rsvps } = await db
    .from("rsvps")
    .select("name, email, attending, message, created_at")
    .eq("invite_id", invite.id)
    .order("created_at", { ascending: false })
    .limit(500);

  const user = await getUser();

  return NextResponse.json({
    slug: invite.slug,
    template: templateOf(invite),
    status: invite.status,
    plan: invite.plan,
    expiresAt: invite.expires_at,
    data: invite.data,
    rsvps: rsvps || [],
    owned: Boolean(invite.owner_id),
    isOwner: Boolean(user && invite.owner_id === user.id),
    loggedIn: Boolean(user),
    payments: razorpayConfigured() ? "razorpay" : freePublishEnabled() ? "free" : "off",
  });
}

// PUT: update invitation data
export async function PUT(req, { params }) {
  const { token } = await params;
  const invite = await inviteByToken(token);
  if (!invite) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    const body = await req.json();
    const data = mergeData(body.data || {});
    if (!data.groom?.trim() || !data.bride?.trim()) {
      return NextResponse.json({ error: "Groom and bride names are required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin()
      .from("invites")
      .update({ data, template: data.template, updated_at: new Date().toISOString() })
      .eq("id", invite.id);

    if (error) return NextResponse.json({ error: "Could not save" }, { status: 500 });
    return NextResponse.json({ ok: true, slug: invite.slug });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
