import { createClient } from "@supabase/supabase-js";

// Server-side only. Never import this in a client component.
let _client = null;

export function supabaseAdmin() {
  if (!_client) {
    const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      const e = new Error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY env vars");
      e.name = "ConfigError";
      throw e;
    }
    _client = createClient(url, key, { auth: { persistSession: false } });
  }
  return _client;
}

// Shown to visitors when the deployment has no database env vars.
export const NOT_CONFIGURED = "The site isn't connected to its database yet. Please try again shortly, or WhatsApp us.";
