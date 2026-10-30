import EmeraldNoir from "@/components/EmeraldNoir";
import MarigoldMela from "@/components/MarigoldMela";
import RoyalPalace from "@/components/RoyalPalace";
import Heartbound from "@/components/Heartbound";

const COMPONENTS = { "emerald-noir": EmeraldNoir, "marigold-mela": MarigoldMela, "royal-palace": RoyalPalace, heartbound: Heartbound };

// Renders an invitation in the chosen design.
export default function InviteTemplate({ template, ...props }) {
  const Template = COMPONENTS[template] || MarigoldMela;
  return <Template {...props} />;
}
