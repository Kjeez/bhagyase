import { SITE_URL } from "@/lib/site";

export default function sitemap() {
  const pages = ["", "/create", "/contact", "/privacy", "/terms", "/refund"];
  return pages.map((p) => ({
    url: `${SITE_URL}${p}`,
    changeFrequency: p ? "monthly" : "weekly",
    priority: p ? 0.5 : 1,
  }));
}
