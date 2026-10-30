import "./globals.css";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "WebAlchemy Invites — Digital Wedding Invitations",
  description:
    "Beautiful animated digital wedding invitations with RSVP, countdown, maps and music. Create in minutes, share on WhatsApp, edit anytime from your phone.",
  openGraph: { siteName: "WebAlchemy Invites", locale: "en_IN", type: "website" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
