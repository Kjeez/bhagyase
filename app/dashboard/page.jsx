import Link from "next/link";
import { redirect } from "next/navigation";
import FestiveShell from "@/components/FestiveShell";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getUser } from "@/lib/supabase/server";
import { isExpired } from "@/lib/invites";
import { PLANS } from "@/lib/plans";

export const dynamic = "force-dynamic";
export const metadata = { title: "My invitations — WebAlchemy Invites", robots: { index: false, follow: false } };

function statusOf(inv) {
  if (inv.status !== "published") return { label: "Draft", cls: "draft" };
  if (isExpired(inv)) return { label: "Ended", cls: "ended" };
  return { label: `Live · ${PLANS[inv.plan]?.name || ""}`, cls: "live" };
}

export default async function Dashboard() {
  const user = await getUser();
  if (!user) redirect("/login?next=/dashboard");

  const db = supabaseAdmin();
  const { data: invites } = await db
    .from("invites")
    .select("id, slug, edit_token, status, plan, expires_at, data, created_at")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  // RSVP counts per invite (one small query per invite is fine at this scale)
  const counts = Object.fromEntries(
    await Promise.all(
      (invites || []).map(async (inv) => {
        const { count } = await db.from("rsvps").select("id", { count: "exact", head: true }).eq("invite_id", inv.id);
        return [inv.id, count || 0];
      })
    )
  );

  return (
    <FestiveShell>
      <div className="ed-page">
        <div className="ed-top">
          <h1>My invitations</h1>
          <form action="/auth/signout" method="post">
            <button className="ld-navlink as-btn">Log out</button>
          </form>
        </div>
        <p className="lead">Logged in as {user.email}</p>

        {(invites || []).length === 0 ? (
          <div className="inbox-empty">
            No invitations yet. <Link href="/create">Create your first one →</Link>
            <br />
            <small>Made one as a guest? Open its private edit link while logged in and tap &ldquo;Save to my account&rdquo;.</small>
          </div>
        ) : (
          <div className="dash-list">
            {invites.map((inv) => {
              const s = statusOf(inv);
              const d = inv.data || {};
              return (
                <Link href={`/edit/${inv.edit_token}`} className="dash-card" key={inv.id}>
                  <div>
                    <div className="dash-names">{d.groom} &amp; {d.bride}</div>
                    <div className="dash-meta">
                      {d.dateISO ? new Date(d.dateISO).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Date not set"}
                      {" · "}{counts[inv.id]} RSVP{counts[inv.id] === 1 ? "" : "s"}
                    </div>
                  </div>
                  <span className={`dash-tag ${s.cls}`}>{s.label}</span>
                </Link>
              );
            })}
          </div>
        )}

        <div className="ed-actions">
          <Link href="/create" className="btn">+ New invitation</Link>
        </div>
      </div>
    </FestiveShell>
  );
}
