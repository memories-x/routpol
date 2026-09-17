import { PanelEmptyState } from "@/components/panel/ui/PanelEmptyState";
import Link from "next/link";

export type PortalCaseRow = {
  id: string;
  matter: string | null;
  packageSlug: string;
  status: string;
  updatedAt: string;
  accessToken: string;
  locale: string;
  hasResult: boolean;
};

type Labels = {
  matter: string;
  date: string;
  status: string;
  action: string;
  empty: string;
  statusReady: string;
  statusProgress: string;
  statusPaid: string;
  statusClosed: string;
};

type Props = {
  cases: PortalCaseRow[];
  locale: string;
  labels: Labels;
};

function statusLabel(c: PortalCaseRow, L: Labels): string {
  if (c.hasResult) return L.statusReady;
  if (c.status === "in_progress") return L.statusProgress;
  if (c.status === "closed") return L.statusClosed;
  if (c.status === "paid") return L.statusPaid;
  return c.status;
}

function statusClass(c: PortalCaseRow): string {
  if (c.hasResult) return "text-pt-emerald-700 bg-pt-emerald-50";
  if (c.status === "in_progress") return "text-pt-aws-ink bg-pt-surface-alt";
  return "text-pt-slate-600 bg-pt-bg";
}

export function PortalCaseTable({ cases, locale, labels }: Props) {
  const rows = Array.isArray(cases) ? cases : [];
  if (rows.length === 0) {
    return <PanelEmptyState message={labels.empty} className="mt-4" />;
  }

  return (
    <div className="mt-4 overflow-x-auto rounded-sm border border-pt-border bg-pt-surface shadow-sm">
      <table className="w-full min-w-[32rem] text-left text-sm">
        <thead className="border-b border-pt-border bg-pt-bg text-[11px] font-semibold uppercase tracking-wide text-pt-slate-500">
          <tr>
            <th className="px-4 py-2.5">{labels.matter}</th>
            <th className="px-4 py-2.5">{labels.date}</th>
            <th className="px-4 py-2.5">{labels.status}</th>
            <th className="px-4 py-2.5 text-right">{labels.action}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-pt-border">
          {rows.map((c) => (
            <tr key={c.id} className="hover:bg-pt-bg">
              <td className="px-4 py-2.5 font-medium text-pt-aws-ink">
                {c.matter ?? c.packageSlug}
              </td>
              <td className="px-4 py-2.5 tabular-nums text-pt-slate-600">
                {new Date(c.updatedAt).toLocaleDateString(locale)}
              </td>
              <td className="px-4 py-2.5">
                <span
                  className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-medium ${statusClass(c)}`}
                >
                  {statusLabel(c, labels)}
                </span>
              </td>
              <td className="px-4 py-2.5 text-right">
                <Link
                  href={`/${c.locale}/basvuru/basarili?case=${c.id}&token=${c.accessToken}`}
                  className="font-medium text-pt-emerald-600 hover:underline"
                >
                  {labels.action}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
