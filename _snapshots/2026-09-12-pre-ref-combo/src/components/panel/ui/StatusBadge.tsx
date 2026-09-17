import { statusLabelTr } from "@/lib/cases/checklist";

const statusStyles: Record<string, string> = {
  awaiting_payment:
    "border-pt-navy-700/20 bg-pt-navy-800/10 text-pt-navy-900",
  paid: "border-pt-emerald-600/20 bg-pt-emerald-600/10 text-pt-emerald-600",
  in_progress: "border-pt-navy-900/20 bg-pt-navy-900 text-white",
  closed: "border-pt-border bg-pt-bg text-pt-slate-600",
  unpaid_archived: "border-pt-border bg-pt-bg text-pt-slate-500",
  draft: "border-pt-border bg-pt-bg text-pt-slate-500",
  data_purged: "border-pt-border bg-pt-bg text-pt-slate-400",
};

export function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status] ?? statusStyles.draft;
  return (
    <span
      className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap tabular-nums ${style}`}
    >
      {statusLabelTr(status)}
    </span>
  );
}
