import { ImageResponse } from "next/og";

export const alt = "WebAlchemy Invites — animated digital wedding invitations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview for the landing page (WhatsApp, Instagram, X, LinkedIn).
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          background: "radial-gradient(circle at 50% 0%, #1f2a22, #0e100f 70%)",
          color: "#e9e4d8", fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 8, color: "#d4af37", textTransform: "uppercase" }}>
          WebAlchemy Invites
        </div>
        <div style={{ fontSize: 76, marginTop: 30, lineHeight: 1.15, maxWidth: 980 }}>
          Your shaadi deserves more than a PDF invite
        </div>
        <div style={{ fontSize: 30, marginTop: 34, color: "#e9c96a" }}>
          Countdown · Maps · Music · RSVPs · Shared on WhatsApp
        </div>
        <div style={{ fontSize: 24, marginTop: 40, color: "#b9b2a2" }}>invites.webalchemy.in</div>
      </div>
    ),
    size
  );
}
