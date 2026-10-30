import Link from "next/link";

export default function PreviewRibbon({ label, cta }) {
  return (
    <div className="pv-ribbon" role="status">
      <span>{label}</span>
      {cta && <Link href={cta.href}>{cta.text}</Link>}
    </div>
  );
}
