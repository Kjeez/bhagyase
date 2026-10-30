import { notFound } from "next/navigation";
import { mergeData } from "@/lib/defaults";
import { inviteByToken } from "@/lib/invites";
import { templateOf } from "@/lib/templates";
import { SIDES, hasReception } from "@/lib/inviteView";
import InviteTemplate from "@/components/InviteTemplate";
import PreviewRibbon from "@/components/PreviewRibbon";

export const dynamic = "force-dynamic";
export const metadata = { title: "Preview — WebAlchemy Invites", robots: { index: false, follow: false } };

// Private preview for the couple (works for drafts). RSVPs are not saved here.
// ?side=bride|groom and ?event=reception preview the other links.
export default async function PreviewPage({ params, searchParams }) {
  const { token } = await params;
  const q = (await searchParams) || {};
  const invite = await inviteByToken(token);
  if (!invite) notFound();

  const data = mergeData(invite.data);
  const label = invite.status === "published"
    ? "Private preview — messages sent here aren't saved"
    : "Draft preview — only you can see this";
  return (
    <>
      <PreviewRibbon label={label} cta={{ href: `/edit/${token}`, text: "← Back to editor" }} />
      <InviteTemplate
        template={templateOf(invite)}
        data={data}
        slug={invite.slug}
        side={SIDES.includes(q.side) ? q.side : "both"}
        event={q.event === "reception" && hasReception(data) ? "reception" : "wedding"}
        preview
      />
    </>
  );
}
