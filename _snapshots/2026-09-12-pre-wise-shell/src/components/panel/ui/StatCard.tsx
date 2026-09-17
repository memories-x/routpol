import Link from "next/link";

type Props = {
  label: string;
  value: number | string;
  href?: string;
};

export function StatCard({ label, value, href }: Props) {
  const inner = (
    <>
      <p className="text-[11px] font-medium uppercase tracking-wide text-pt-slate-500">
        {label}
      </p>
      <p className="mt-1 text-2xl font-light tabular-nums text-pt-aws-ink">
        {value}
      </p>
    </>
  );

  const shell =
    "block rounded-sm border border-pt-border bg-pt-surface px-4 py-3 shadow-sm hover:border-pt-aws-ink/40";

  if (href) {
    return (
      <Link href={href} className={shell}>
        {inner}
      </Link>
    );
  }

  return <div className={shell.replace("block ", "")}>{inner}</div>;
}
