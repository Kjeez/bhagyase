import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { inviteByToken } from "@/lib/invites";
import { getUser } from "@/lib/supabase/server";

// POST: attach a guest-made invite to the logged-in account.
export async function POST(_req, { params }) {
  const { token } = await params;
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Log in first" }, { status: 401 });

  const invite = await inviteByToken(token);
  if (!invite) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (invite.owner_id && invite.owner_id !== user.id) {
    return NextResponse.json({ error: "This invitation already belongs to another account" }, { status: 409 });
  }

  const { error } = await supabaseAdmin()
    .from("invites")
    .update({ owner_id: user.id })
    .eq("id", invite.id)
    .is("owner_id", null);
  if (error) return NextResponse.json({ error: "Could not save" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
