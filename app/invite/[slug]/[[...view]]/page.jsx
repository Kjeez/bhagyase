import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { mergeData } from "@/lib/defaults";
import { DEMO_DATA } from "@/lib/demo";
import { isExpired } from "@/lib/invites";
import { PLANS } from "@/lib/plans";
import { templateOf, validTemplate } from "@/lib/templates";
import { parseView, viewOf, hasReception } from "@/lib/inviteView";
import InviteTemplate from "@/components/InviteTemplate";
import InviteStatus from "@/components/InviteStatus";
import PreviewRibbon from "@/components/PreviewRibbon";

export const dynamic = "force-dynamic";

// The demo shows Heartbound unless ?style= picks another design.
const DEMO_STYLE = "heartbound";

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

// /invite/slug[/bride|/groom][/reception] — null when the link doesn't apply to this invite.
function resolveView(data, viewParts) {
  const v = parseView(viewParts);
  if (!v || (v.event === "reception" && !hasReception(data))) return null;
  return v;
}

export async function generateMetadata({ params }) {
  const { slug, view: parts } = await params;
  // couples' invitations are private to their guests — keep them off search engines
  const robots = { index: false, follow: false };
  const raw = slug === "demo" ? DEMO_DATA : (await getInvite(slug))?.data;
  const data = raw ? mergeData(raw) : null;
  const v = data && resolveView(data, parts);
  if (!v) return { title: "Invitation not found", robots };
  const view = viewOf(data, v.side, v.event);
  const what = view.isReception ? "Wedding Reception Invitation" : "Wedding Invitation";
  return {
    title: `${view.names} — ${what}`,
    description: `You are warmly invited to the ${view.isReception ? "wedding reception" : "wedding"} of ${view.names}. Tap to view the invitation, RSVP and find the venue.`,
    robots,
    openGraph: {
      title: `${view.names} — ${what}`,
      description: "Tap to open the invitation 💛",
    },
  };
}

export default async function InvitePage({ params, searchParams }) {
  const { slug, view: parts } = await params;

  if (slug === "demo") {
    const v = resolveView(DEMO_DATA, parts);
    if (!v) notFound();
    const style = (await searchParams)?.style;
    return (
      <>
        <PreviewRibbon label="Demo invitation" cta={{ href: "/create", text: "Make yours →" }} />
        <InviteTemplate
          template={validTemplate(style || DEMO_STYLE)}
          data={DEMO_DATA}
          slug="demo"
          side={v.side}
          event={v.event}
          preview
        />
      </>
    );
  }

  const invite = await getInvite(slug);
  if (!invite) notFound();

  const data = mergeData(invite.data);
  const v = resolveView(data, parts);
  if (!v) notFound();

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
  return <InviteTemplate template={templateOf(invite)} data={data} slug={invite.slug} side={v.side} event={v.event} />;
}
