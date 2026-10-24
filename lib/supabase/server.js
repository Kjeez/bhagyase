import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

function authUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
}

export function authConfigured() {
  return Boolean(authUrl() && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

// Cookie-bound Supabase client, used only for Supabase Auth (who is logged in).
// All table access goes through supabaseAdmin() in API routes.
export async function supabaseAuth() {
  const cookieStore = await cookies();
  return createServerClient(authUrl(), process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // called from a Server Component — middleware refreshes the session instead
        }
      },
    },
  });
}

// The logged-in user, or null (also null when auth isn't configured).
export async function getUser() {
  if (!authConfigured()) return null;
  try {
    const { data } = await (await supabaseAuth()).auth.getUser();
    return data.user || null;
  } catch {
    return null;
  }
}
