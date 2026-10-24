"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

// { user, ready } — user is null for guests or when auth isn't configured.
export function useUser() {
  const [state, setState] = useState({ user: null, ready: false });
  useEffect(() => {
    const sb = supabaseBrowser();
    if (!sb) { setState({ user: null, ready: true }); return; }
    sb.auth.getUser().then(({ data }) => setState({ user: data.user || null, ready: true }));
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) =>
      setState({ user: session?.user || null, ready: true })
    );
    return () => sub.subscription.unsubscribe();
  }, []);
  return state;
}
