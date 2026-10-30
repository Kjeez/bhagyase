"use client";

import { createBrowserClient } from "@supabase/ssr";

// Auth only (login / logout / session). Never used for table access.
export function supabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || typeof window === "undefined") return null;
  return createBrowserClient(url, key);
}
