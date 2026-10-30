import Link from "next/link";
import "@/app/festive.css";
import NavAuth from "@/components/NavAuth";
import { landingFonts } from "@/lib/fonts";
import { Toran } from "@/components/landing/Art";

// Light, celebratory frame shared by the app pages (create, editor, login,
// dashboard, legal) so they match the landing page.
export default function FestiveShell({ children, narrow = false }) {
  return (
    <div className={`fx ${landingFonts}`}>
      <header className="fx-head">
        <Link href="/" className="fx-logo"><b>WebAlchemy</b> Invites</Link>
        <NavAuth />
      </header>
      <Toran units={12} className="fx-toran" />
      <main className={`fx-main ${narrow ? "narrow" : ""}`}>{children}</main>
      <footer className="fx-foot">
        Made with 💛 for Indian weddings · <Link href="/contact">Contact</Link> · <Link href="/privacy">Privacy</Link> ·{" "}
        <Link href="/terms">Terms</Link> · <Link href="/refund">Refunds</Link>
      </footer>
    </div>
  );
}
