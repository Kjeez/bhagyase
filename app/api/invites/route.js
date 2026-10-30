import { NextResponse } from "next/server";
import { supabaseAdmin, NOT_CONFIGURED } from "@/lib/supabaseAdmin";
import { mergeData, slugify } from "@/lib/defaults";
import { allow } from "@/lib/rateLimit";
import { getUser } from "@/lib/supabase/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // honeypot: humans never see this field
    if (body.faxOnly) return NextResponse.json({ error: "Bad request" }, { status: 400 });

    if (!(await allow("create", req, 10, 3600))) {
      return NextResponse.json({ error: "Too many invitations from this network — try again in an hour." }, { status: 429 });
    }

    const data = mergeData(body.data || {});
    if (!data.groom?.trim() || !data.bride?.trim()) {
      return NextResponse.json({ error: "Groom and bride names are required" }, { status: 400 });
    }

    const user = await getUser();
    const db = supabaseAdmin();
    let slug = slugify(data.groom, data.bride);

    // retry once on the (rare) slug collision
    for (let attempt = 0; attempt < 2; attempt++) {
      const { data: row, error } = await db
        .from("invites")
        .insert({ slug, template: data.template, data, owner_id: user?.id || null })
        .select("slug, edit_token")
        .single();

      if (!error) {
        return NextResponse.json({ slug: row.slug, editToken: row.edit_token });
      }
      if (error.code === "23505") {
        slug = slugify(data.groom, data.bride);
        continue;
      }
      console.error(error);
      return NextResponse.json({ error: "Could not create invitation" }, { status: 500 });
    }
    return NextResponse.json({ error: "Could not create invitation" }, { status: 500 });
  } catch (e) {
    console.error(e);
    if (e.name === "ConfigError") return NextResponse.json({ error: NOT_CONFIGURED }, { status: 503 });
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
