"use client";

import { LeadContactActions } from "@/components/panel/LeadContactActions";
import { LeadStatusForm } from "@/components/panel/LeadStatusForm";
import { DataTable, type DataTableColumn } from "@/components/panel/ui/DataTable";
import {
  leadServiceLabel,
  leadSourceLabel,
  leadStatusLabel,
} from "@/lib/leads/labels";
import type { QuoteLeadRecord } from "@/lib/leads/store";
import {
  buildCustomerWhatsAppUrl,
  operatorWhatsAppPrefill,
} from "@/lib/whatsapp";

type Props = {
  leads: QuoteLeadRecord[];
};

function formatWhen(iso: string): string {
  try {
    return new Date(iso).toLocaleString("tr-TR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function LeadInboxTable({ leads }: Props) {
  const rows = Array.isArray(leads) ? leads : [];

  const columns: DataTableColumn<QuoteLeadRecord>[] = [
    {
      key: "when",
      header: "Tarih",
      cell: (row) => (
        <span className="whitespace-nowrap text-pt-slate-600">
          {formatWhen(row.createdAt)}
        </span>
      ),
    },
    {
      key: "name",
      header: "Kişi",
      cell: (row) => (
        <div className="max-w-sm">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium text-pt-navy-900">{row.fullName}</p>
            {row.likelyDuplicate ? (
              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-900">
                Olası tekrar
              </span>
            ) : null}
            {row.status === "new" ? (
              <span className="rounded bg-pt-emerald-600/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-pt-emerald-800">
                Yeni
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-xs text-pt-slate-500">
            {leadSourceLabel(row.source)}
            {row.locale ? ` · ${row.locale.toUpperCase()}` : ""}
          </p>
          {row.message ? (
            <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-pt-slate-600">
              {row.message}
            </p>
          ) : null}
        </div>
      ),
    },
    {
      key: "segment",
      header: "Segment",
      cell: (row) => (
        <span className="text-pt-slate-700">
          {leadServiceLabel(row.serviceType)}
        </span>
      ),
    },
    {
      key: "contact",
      header: "İletişim",
      cell: (row) => {
        const label = leadServiceLabel(row.serviceType);
        const wa = buildCustomerWhatsAppUrl(
          row.phoneE164,
          operatorWhatsAppPrefill(
            row.fullName,
            row.serviceType,
            row.locale,
            label,
          ),
        );
        return (
          <div className="flex flex-col gap-1.5">
            <a
              href={`mailto:${row.email}`}
              className="text-sm font-medium text-pt-emerald-700 hover:underline"
            >
              {row.email}
            </a>
            <span className="font-mono text-xs text-pt-slate-500">
              {row.phoneE164}
            </span>
            <LeadContactActions
              leadId={row.id}
              status={row.status}
              whatsappUrl={wa}
              email={row.email}
              serviceLabel={label}
            />
          </div>
        );
      },
    },
    {
      key: "status",
      header: "Durum",
      cell: (row) => (
        <div className="space-y-2">
          <span className="text-xs text-pt-slate-500">
            {leadStatusLabel(row.status)}
            {row.contactedAt
              ? ` · ${formatWhen(row.contactedAt)}`
              : ""}
          </span>
          <LeadStatusForm leadId={row.id} current={row.status} />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      rows={rows}
      columns={columns}
      getKey={(r) => r.id}
      empty="Bu filtrede temas talebi yok."
      minWidthClass="min-w-[52rem]"
      rowClassName={(row) =>
        row.status === "new" ? "bg-pt-emerald-50/40" : undefined
      }
    />
  );
}
