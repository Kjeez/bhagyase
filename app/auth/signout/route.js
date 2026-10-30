import { NextResponse } from "next/server";
import { authConfigured, supabaseAuth } from "@/lib/supabase/server";

export async function POST(req) {
  if (authConfigured()) await (await supabaseAuth()).auth.signOut();
  return NextResponse.redirect(new URL("/", req.url), { status: 303 });
}
