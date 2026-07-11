import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { mergeData } from "@/lib/defaults";
import EmeraldNoir from "@/components/EmeraldNoir";

export const dynamic = "force-dynamic";

async function getInvite(slug) {
  try {
    const db = supabaseAdmin();
    const { data, error } = await db
      .from("invites")
      .select("slug, template, data")
      .eq("slug", slug)
      .single();
    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const invite = await getInvite(slug);
  if (!invite) return { title: "Invitation not found" };
  const d = invite.data || {};
  return {
    title: `${d.groom} & ${d.bride} — Wedding Invitation`,
    description: `You are warmly invited to the wedding of ${d.groom} & ${d.bride}. Tap to view the invitation, RSVP and find the venue.`,
    openGraph: {
      title: `${d.groom} & ${d.bride} — Wedding Invitation`,
      description: "Tap to open the invitation 💛",
    },
  };
}

export default async function InvitePage({ params }) {
  const { slug } = await params;
  const invite = await getInvite(slug);
  if (!invite) notFound();

  const data = mergeData(invite.data);
  return <EmeraldNoir data={data} slug={invite.slug} />;
}
