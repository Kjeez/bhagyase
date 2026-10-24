import { createHash } from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Hashed client IP, so the rate_limits table never stores raw IPs.
export function clientKey(req) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  return createHash("sha256").update(ip).digest("hex").slice(0, 24);
}

// true = allowed. Fails open (logs) if the DB function is unavailable, so a
// Supabase hiccup never blocks a couple from saving their invite.
export async function allow(bucket, req, limit, windowSeconds) {
  try {
    const { data, error } = await supabaseAdmin().rpc("hit_rate_limit", {
      p_key: `${bucket}:${clientKey(req)}`,
      p_limit: limit,
      p_window_seconds: windowSeconds,
    });
    if (error) throw error;
    return data !== false;
  } catch (e) {
    console.error("rate limit check failed", e);
    return true;
  }
}
