"use client";

import Link from "next/link";
import { useUser } from "@/components/useUser";

export default function NavAuth() {
  const { user, ready } = useUser();
  if (!ready) return null;
  return user
    ? <Link href="/dashboard" className="ld-navlink">My invitations</Link>
    : <Link href="/login" className="ld-navlink">Log in</Link>;
}
