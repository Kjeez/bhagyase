import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { mergeData } from "@/lib/defaults";
import { DEMO_DATA } from "@/lib/demo";
import { isExpired } from "@/lib/invites";
import { PLANS } from "@/lib/plans";
import EmeraldNoir from "@/components/EmeraldNoir";
import InviteStatus from "@/components/InviteStatus";
import PreviewRibbon from "@/components/PreviewRibbon";

export const dynamic = "force-dynamic";

async function getInvite(slug) {
  try {
    const { data, error } = await supabaseAdmin()
      .from("invites")
      .select("slug, template, status, plan, expires_at, data")
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
  // couples' invitations are private to their guests — keep them off search engines
  const robots = { index: false, follow: false };
  const d = slug === "demo" ? DEMO_DATA : (await getInvite(slug))?.data;
  if (!d) return { title: "Invitation not found", robots };
  return {
    title: `${d.groom} & ${d.bride} — Wedding Invitation`,
    description: `You are warmly invited to the wedding of ${d.groom} & ${d.bride}. Tap to view the invitation, RSVP and find the venue.`,
    robots,
    openGraph: {
      title: `${d.groom} & ${d.bride} — Wedding Invitation`,
      description: "Tap to open the invitation 💛",
    },
  };
}

export default async function InvitePage({ params }) {
  const { slug } = await params;

  if (slug === "demo") {
    return (
      <>
        <PreviewRibbon label="Demo invitation" cta={{ href: "/create", text: "Make yours →" }} />
        <EmeraldNoir data={DEMO_DATA} slug="demo" preview />
      </>
    );
  }

  const invite = await getInvite(slug);
  if (!invite) notFound();

  const data = mergeData(invite.data);

  if (invite.status !== "published") {
    return (
      <InviteStatus title={`${data.groom} & ${data.bride}`}>
        This invitation is being lovingly prepared. Please check back soon ✨
      </InviteStatus>
    );
  }
  if (isExpired(invite)) {
    return (
      <InviteStatus title={`${data.groom} & ${data.bride}`}>
        This wedding invitation has ended. Thank you for all the love and blessings 💛
      </InviteStatus>
    );
  }

  data.photos = data.photos.slice(0, PLANS[invite.plan]?.maxPhotos || PLANS.classic.maxPhotos);
  return <EmeraldNoir data={data} slug={invite.slug} />;
}
