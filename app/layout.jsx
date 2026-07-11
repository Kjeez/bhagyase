import "./globals.css";

export const metadata = {
  title: "WebAlchemy Invites — Digital Wedding Invitations",
  description:
    "Beautiful animated digital wedding invitations with RSVP, countdown, maps and music. Create in minutes, share on WhatsApp, edit anytime from your phone.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
