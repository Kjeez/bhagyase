import { NextResponse } from "next/server";
import { supabaseAuth } from "@/lib/supabase/server";

// Magic-link and Google OAuth both land here with ?code=… (PKCE).
export async function GET(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const nextParam = url.searchParams.get("next") || "/dashboard";
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/dashboard";

  if (code) {
    const { error } = await (await supabaseAuth()).auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, url.origin));
  }
  return NextResponse.redirect(new URL("/login?error=1", url.origin));
}
