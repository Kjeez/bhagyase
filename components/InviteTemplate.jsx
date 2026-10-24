import EmeraldNoir from "@/components/EmeraldNoir";
import MarigoldMela from "@/components/MarigoldMela";

const COMPONENTS = { "emerald-noir": EmeraldNoir, "marigold-mela": MarigoldMela };

// Renders an invitation in the chosen design.
export default function InviteTemplate({ template, ...props }) {
  const Template = COMPONENTS[template] || MarigoldMela;
  return <Template {...props} />;
}
