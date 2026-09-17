import Link from "next/link";
import type { PanelActivePeriod } from "@/lib/customer-portal/panel-periods";

type Props = {
  periods: PanelActivePeriod[];
};

export function ActivePeriodsPanel({ periods }: Props) {
  if (!Array.isArray(periods) || periods.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold">Aktif aylık paketler</h2>
      <p className="mt-1 text-xs text-pt-slate-500">
        Kota sistemde — müşteri ek yazıyı /hesabim üzerinden yükler; aşımda 40
        zł otomatik tahsil. Siz sadece gelen dosyayı işlersiniz.
      </p>
      <ul className="mt-4 divide-y divide-pt-border rounded-sm border border-pt-border bg-pt-surface">
        {periods.map((p) => (
          <li
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm"
          >
            <div>
              <p className="font-medium text-pt-aws-ink">{p.customerName}</p>
              <p className="text-pt-slate-500">{p.customerEmail}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                {p.usedCount} / {p.quota}
                {p.overageCredits > 0 ? ` (+${p.overageCredits} aşım)` : ""}
              </p>
              <p className="text-pt-slate-500">
                Kalan {p.remaining} · bitiş{" "}
                {new Date(p.periodEnd).toLocaleDateString("tr-PL")}
              </p>
            </div>
            <Link
              href={`/panel/musteriler/${encodeURIComponent(p.customerEmail)}`}
              className="text-pt-emerald-600 hover:underline"
            >
              Müşteri kartı
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
