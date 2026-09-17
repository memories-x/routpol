import { PageHeader } from "@/components/panel/ui/PageHeader";
import { getPanelOpsStats } from "@/lib/panel-ops-stats";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { redirect } from "next/navigation";

const checks = [
  {
    title: "İletişim & kimlik",
    items: [
      "NEXT_PUBLIC_CONTACT_EMAIL / PHONE / WHATSAPP_E164",
      "NEXT_PUBLIC_OPERATOR_LEGAL_NAME / NIP / ADDRESS",
      "CUSTOMER_AUTH_SECRET (müşteri e-posta + şifre oturumu)",
    ],
  },
  {
    title: "Canlı teknik (docs/04-go-live.md)",
    items: [
      "NEXT_PUBLIC_SITE_URL (https)",
      "STRIPE_SECRET_KEY + WEBHOOK",
      "RESEND_API_KEY + CONTACT_EMAIL_FROM",
      "STORAGE_BACKEND=fs veya BLOB_READ_WRITE_TOKEN",
      "DATABASE_URL + prisma migrate",
      "PANEL_PASSWORD + PANEL_AUTH_SECRET + CUSTOMER_AUTH_SECRET",
      "CRON_SECRET (günlük cleanup + outbox + yenileme hatırlatma)",
    ],
  },
  {
    title: "Operasyon (tek kişi)",
    items: [
      "Günlük: panel kuyruk → sonuç yükle (docs/03-operasyon.md)",
      "Müşteri: /hesabim — kota + ek yazı",
      "3 smoke dosya (öde → panel → sonuç)",
    ],
  },
];

export default async function PanelSettingsPage() {
  if (!(await isPanelAuthenticated())) redirect("/panel/login");

  const stats = await getPanelOpsStats();

  return (
    <div>
      <PageHeader
        title="Ayarlar"
        description="Secret'lar env üzerinden. Kanon: docs/04-go-live.md"
      />

      <section className="mt-6 rounded-sm border border-pt-border bg-pt-surface p-4 text-sm">
        <h2 className="font-semibold text-pt-aws-ink">Canlı durum</h2>
        <p className="mt-2 text-pt-slate-600">
          Golive:{" "}
          <span
            className={
              stats.goliveOk ? "text-pt-emerald-600" : "text-red-600"
            }
          >
            {stats.goliveOk ? "OK" : "Eksik env"}
          </span>
        </p>
        {!stats.goliveOk && stats.missing.length > 0 ? (
          <p className="mt-1 text-xs text-pt-slate-500">
            {stats.missing.join(", ")}
          </p>
        ) : null}
        <p className="mt-2 text-pt-slate-600">
          Outbox bekleyen: {stats.outboxPending} · başarısız (5+ deneme):{" "}
          {stats.outboxFailed}
        </p>
        <p className="mt-2 text-pt-slate-600">
          Analytics (son 7 gün): {stats.analyticsLast7d} olay
        </p>
        {Array.isArray(stats.failedOutbox) && stats.failedOutbox.length > 0 ? (
          <div className="mt-4">
            <h3 className="font-medium text-red-700">
              Gönderilemeyen outbox ({stats.failedOutbox.length})
            </h3>
            <ul className="mt-2 space-y-2 text-xs text-pt-slate-600">
              {stats.failedOutbox.map((row) => (
                <li
                  key={row.id}
                  className="rounded border border-red-100 bg-red-50/50 p-2"
                >
                  <span className="font-mono">{row.type}</span> · {row.attempts}{" "}
                  deneme
                  {row.lastError ? (
                    <span className="block text-red-700">{row.lastError}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <ul className="mt-8 space-y-6">
        {checks.map((block) => (
          <li
            key={block.title}
            className="rounded-sm border border-pt-border bg-pt-surface p-4"
          >
            <h2 className="font-semibold text-pt-aws-ink">{block.title}</h2>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-pt-slate-600">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-xs text-pt-slate-400">
        Yerel: <code>npm run golive:check</code> · DB:{" "}
        <code>docker compose up -d</code>
      </p>
    </div>
  );
}
