import { InvoiceRetryButton } from "@/components/panel/InvoiceRetryButton";
import { PageHeader } from "@/components/panel/ui/PageHeader";
import { DataTable, type DataTableColumn } from "@/components/panel/ui/DataTable";
import { formatMoney } from "@/lib/cases/money";
import { packageLabelTr } from "@/lib/cases/package-labels";
import { listCases, listInvoices } from "@/lib/cases/store";
import type { InvoiceRow } from "@/lib/cases/panel-lists";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import {
  currentWarsawYearMonth,
  isValidYearMonth,
  paidMonths,
  warsawYearMonth,
} from "@/lib/invoices/accountant-pack";
import { isInvoiceAutoIssueEnabled } from "@/lib/invoices/config";
import Link from "next/link";
import { redirect } from "next/navigation";

function invoiceStatusTr(status: string): string {
  if (status === "issued") return "Kesildi";
  if (status === "failed") return "Hata";
  if (status === "none") return "Yok";
  return "Muhasebecide";
}

type PageProps = {
  searchParams: Promise<{ ay?: string }>;
};

export default async function PanelInvoicesPage({ searchParams }: PageProps) {
  if (!(await isPanelAuthenticated())) redirect("/panel/login");

  const sp = await searchParams;
  const cases = await listCases();
  const months = paidMonths(cases);
  const month = isValidYearMonth(sp.ay ?? "")
    ? (sp.ay as string)
    : currentWarsawYearMonth();
  const rows = listInvoices(cases);
  const safe = (Array.isArray(rows) ? rows : []).filter(
    (r) => r.paidAt && warsawYearMonth(r.paidAt) === month,
  );
  const auto = isInvoiceAutoIssueEnabled();

  const columns: DataTableColumn<InvoiceRow>[] = [
    {
      key: "file",
      header: "Müşteri",
      cell: (p) => (
        <Link
          href={`/panel/${p.caseId}`}
          className="font-medium text-pt-aws-ink hover:underline"
        >
          {p.companyName || p.fullName}
        </Link>
      ),
    },
    {
      key: "package",
      header: "Paket",
      cell: (p) => (
        <span className="text-pt-slate-600">
          {packageLabelTr(p.packageSlug)}
        </span>
      ),
    },
    {
      key: "amount",
      header: "Tutar",
      className: "whitespace-nowrap text-right",
      cell: (p) => (
        <span className="font-medium">
          {formatMoney(p.amountCents, p.currency)}
        </span>
      ),
    },
    {
      key: "number",
      header: "Fatura no",
      cell: (p) =>
        p.pdfUrl && p.invoiceNumber ? (
          <a
            href={p.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pt-emerald-600 hover:underline"
          >
            {p.invoiceNumber}
          </a>
        ) : (
          <span className="text-pt-slate-500">{p.invoiceNumber ?? "—"}</span>
        ),
    },
    {
      key: "ksef",
      header: "KSeF",
      cell: (p) => (
        <span className="font-mono text-xs text-pt-slate-600">
          {p.ksefNumber ?? "—"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Durum",
      cell: (p) => (
        <span
          className={
            p.invoiceStatus === "failed"
              ? "text-pt-danger"
              : p.invoiceStatus === "issued"
                ? "text-pt-aws-ink"
                : "text-pt-slate-500"
          }
        >
          {invoiceStatusTr(p.invoiceStatus)}
        </span>
      ),
    },
  ];

  if (auto) {
    columns.push({
      key: "retry",
      header: "",
      cell: (p) =>
        p.invoiceStatus === "issued" && p.ksefNumber ? null : (
          <InvoiceRetryButton caseId={p.caseId} />
        ),
    });
  }

  return (
    <div>
      <PageHeader
        title="Faturalar"
        description="Stripe para alır; yasal faturayı muhasebeci keser (KSeF). Stripe makbuzu müşteriye gitmez."
        actions={
          <a
            href={`/api/panel/export/muhasebe?ay=${encodeURIComponent(month)}`}
            className="rounded-md bg-pt-aws-ink px-3 py-2 text-sm font-medium text-white hover:bg-pt-aws-ink-dark"
          >
            Ay paketi (ZIP)
          </a>
        }
      />
      <p className="mt-2 text-sm text-pt-slate-600">
        ZIP: <code>excel/firma.csv</code> + <code>excel/sahis.csv</code> +{" "}
        <code>pdf/</code> (yasal PDF muhasebeciden).{" "}
        <Link href="/panel/odemeler" className="underline">
          Ödemeler
        </Link>
        {auto ? " · Otomatik Fakturownia açık (INVOICE_AUTO_ISSUE)." : null}
      </p>

      {months.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2 text-sm">
          {months.map((m) => (
            <li key={m}>
              <Link
                href={`/panel/faturalar?ay=${m}`}
                className={
                  m === month
                    ? "rounded-md bg-pt-aws-ink px-2 py-1 text-white"
                    : "rounded-md border border-pt-border px-2 py-1 text-pt-aws-ink hover:bg-pt-bg"
                }
              >
                {m}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <DataTable
        rows={safe}
        columns={columns}
        getKey={(p) => p.caseId}
        empty="Ödenen dosya yok."
      />
    </div>
  );
}
