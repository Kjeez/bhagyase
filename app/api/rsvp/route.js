import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { allow } from "@/lib/rateLimit";
import { isExpired } from "@/lib/invites";

export async function POST(req) {
  try {
    const { slug, name, email, attending, message, company } = await req.json();

    // honeypot: pretend it worked so bots don't retry
    if (company) return NextResponse.json({ ok: true });

    if (!slug || !name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!(await allow("rsvp", req, 20, 600))) {
      return NextResponse.json({ error: "Too many messages — please try again in a few minutes." }, { status: 429 });
    }

    const db = supabaseAdmin();
    const { data: invite, error } = await db
      .from("invites")
      .select("id, status, expires_at")
      .eq("slug", slug)
      .single();

    if (error || !invite || invite.status !== "published" || isExpired(invite)) {
      return NextResponse.json({ error: "Invite not found" }, { status: 404 });
    }

    const { error: insErr } = await db.from("rsvps").insert({
      invite_id: invite.id,
      name: String(name).slice(0, 120),
      email: email ? String(email).slice(0, 200) : null,
      attending: attending ? String(attending).slice(0, 20) : null,
      message: message ? String(message).slice(0, 2000) : null,
    });

    if (insErr) {
      console.error(insErr);
      return NextResponse.json({ error: "Could not save" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
