import { PanelEmptyState } from "@/components/panel/ui/PanelEmptyState";
import type { SurecHub } from "@/lib/cases/surec-hub";
import Link from "next/link";

type Props = {
  hubs: SurecHub[];
  empty: string;
};

export function SurecHubList({ hubs, empty }: Props) {
  const rows = Array.isArray(hubs) ? hubs : [];
  if (rows.length === 0) {
    return <PanelEmptyState message={empty} />;
  }

  return (
    <ul className="mt-4 grid gap-3 md:grid-cols-2">
      {rows.map((h) => (
        <li key={h.key}>
          <Link
            href={`/panel/musteriler/${encodeURIComponent(h.key)}#surec`}
            className={`block rounded-lg border bg-pt-surface px-4 py-3 hover:border-pt-aws-ink ${
              h.attention
                ? "border-pt-danger/40 bg-pt-danger/5"
                : "border-pt-border"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-pt-aws-ink">
                  {h.title}
                </p>
                <p className="truncate text-[11px] text-pt-slate-500">
                  {h.email}
                </p>
              </div>
              <p className="shrink-0 text-sm text-pt-aws-ink">
                {h.openCount} açık
                <span className="text-pt-slate-500"> / {h.totalCount}</span>
              </p>
            </div>
            {h.matters.length > 0 ? (
              <p className="mt-2 line-clamp-2 text-sm text-pt-slate-600">
                {h.matters.join(" · ")}
              </p>
            ) : null}
            <p className="mt-2 line-clamp-2 text-[11px] text-pt-slate-500">
              Bekleme {h.waitLabel}
              {h.attention ? " · dikkat" : ""}
              {h.nextAction && h.nextAction !== "—"
                ? ` · sıradaki: ${h.nextAction}`
                : ""}
              {h.lawyerPartner ? ` · ${h.lawyerPartner}` : ""}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
