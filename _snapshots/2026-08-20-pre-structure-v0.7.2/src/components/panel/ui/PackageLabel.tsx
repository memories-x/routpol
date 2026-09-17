import { packageLabelTr } from "@/lib/cases/package-labels";

const packageStyles: Record<string, string> = {
  "tek-yazi": "bg-pt-navy-800/10 text-pt-navy-900",
  "aylik-paket": "bg-pt-emerald-600/10 text-pt-emerald-700",
  "surec-yonetimi": "border border-pt-navy-800/30 bg-pt-bg text-pt-navy-900",
  legacy: "bg-pt-bg text-pt-slate-600",
};

export function PackageLabel({ slug }: { slug: string }) {
  const key =
    slug === "tek-yazi" || slug === "aylik-paket" || slug === "surec-yonetimi"
      ? slug
      : "legacy";
  return (
    <span
      className={`inline-flex rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums ${packageStyles[key]}`}
    >
      {packageLabelTr(slug)}
    </span>
  );
}
