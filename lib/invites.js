import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const COLS = "id, slug, owner_id, template, status, plan, published_at, expires_at, data, created_at";

// Owner-side lookup by the private edit token. Returns null for bad/unknown tokens.
export async function inviteByToken(token) {
  if (!UUID_RE.test(token || "")) return null;
  const { data, error } = await supabaseAdmin()
    .from("invites")
    .select(COLS)
    .eq("edit_token", token)
    .single();
  return error ? null : data;
}

export function isExpired(invite) {
  return Boolean(invite?.expires_at && new Date(invite.expires_at) < new Date());
}
