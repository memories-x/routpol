"use client";

import { CaseStatusSteps } from "@/components/customer/CaseStatusSteps";
import { getContent } from "@/content";
import { isLocale } from "@/lib/i18n";
import Link from "next/link";
type DocRef = { id: string; originalName: string; viewToken?: string };
type SharedNote = { body: string; createdAt: string };

type Props = {
  locale: string;
  caseId: string;
  token: string;
  status: string;
  packageSlug: string;
  paid: boolean;
  amountCents: number;
  currency: string;
  mektup: DocRef[];
  sonuc: DocRef[];
  sharedNotes: SharedNote[];
  brandName: string;
  dossierViewToken?: string;
};

function packageLabel(slug: string, locale: string): string {
  const map: Record<string, Record<string, string>> = {
    "tek-yazi": {
      tr: "Tek yazı",
      pl: "Jedno pismo",
      en: "Single letter",
    },
    "aylik-paket": {
      tr: "Aylık idari takip",
      pl: "Miesięczna opieka administracyjna",
      en: "Monthly admin tracking",
    },
    "surec-yonetimi": {
      tr: "Vekaletli idari yürütme",
      pl: "Prowadzenie z pełnomocnictwem",
      en: "Admin execution with POA",
    },
  };
  return map[slug]?.[locale] ?? map[slug]?.tr ?? slug;
}

function statusLabel(status: string, locale: string): string {
  const labels: Record<string, Record<string, string>> = {
    draft: { tr: "Taslak", pl: "Szkic", en: "Draft" },
    awaiting_payment: {
      tr: "Ödeme bekleniyor",
      pl: "Oczekiwanie na płatność",
      en: "Awaiting payment",
    },
    paid: { tr: "Ödendi", pl: "Opłacone", en: "Paid" },
    in_progress: {
      tr: "Hazırlanıyor",
      pl: "W toku",
      en: "In progress",
    },
    closed: { tr: "Tamamlandı", pl: "Zakończone", en: "Completed" },
    unpaid_archived: {
      tr: "Arşiv",
      pl: "Archiwum",
      en: "Archived",
    },
  };
  return labels[status]?.[locale] ?? labels[status]?.tr ?? status;
}

function copy(locale: string) {
  if (locale === "pl") {
    return {
      title: "Twoja sprawa",
      unpaid: "Oczekiwanie na płatność.",
      paidWait: "Płatność przyjęta. Przygotowujemy wynik — odśwież stronę później.",
      ready: "Wynik gotowy — pobierz poniżej.",
      closed: "Sprawa zakończona.",
      status: "Status",
      package: "Usługa",
      amount: "Kwota",
      letter: "Twoje pismo (wgrane przez Ciebie)",
      result: "Wynik do pobrania",
      files: "Twoje pliki",
      noResult: "Wynik pojawi się tutaj.",
      home: "Strona główna",
      keep: "Zachowaj link. Ten sam link idzie też na e-mail.",
      portalMonthly:
        "Kolejne pisma w pakiecie miesięcznym: strona Konta (link na e-mail).",
      portalAccount:
        "Wszystkie sprawy i profil: Konto — link na e-mail (bez hasła).",
      portalCta: "Moje konto",
      dossier: "Pobierz moje dane (JSON)",
      notes: "Notatki od nas",
    };
  }
  if (locale === "en") {
    return {
      title: "Your case",
      unpaid: "Awaiting payment.",
      paidWait:
        "Payment received. We are preparing your result — refresh later.",
      ready: "Result ready — download below.",
      closed: "Case completed.",
      status: "Status",
      package: "Service",
      amount: "Amount",
      letter: "Your uploaded letter",
      result: "Result — download here",
      files: "Your files",
      noResult: "The result will appear here.",
      home: "Home",
      keep: "Keep this link. The same link is also emailed to you.",
      portalMonthly:
        "More letters this month: Account page — we email you a sign-in link.",
      portalAccount:
        "All cases and profile: Account — email sign-in link (no password).",
      portalCta: "Go to account",
      dossier: "Download my data (JSON)",
      notes: "Notes from us",
    };
  }
  return {
    title: "Dosya sayfanız",
    unpaid: "Ödeme bekleniyor.",
    paidWait: "Ödeme alındı. Sonucu hazırlıyoruz — sonra bu sayfayı yenileyin.",
    ready: "Sonuç hazır — aşağıdan indirin.",
    closed: "Tamamlandı.",
    status: "Durum",
    package: "Hizmet",
    amount: "Tutar",
    letter: "Yüklediğiniz yazı",
    result: "Sonuç — buradan indirin",
    files: "Dosyalarınız",
    noResult: "Sonuç burada görünecek.",
    home: "Ana sayfa",
    keep: "Bu linki saklayın. Aynı link e-postanıza da gider.",
    portalMonthly:
      "Ay boyunca yeni yazılar: Hesabım sayfası — e-postanıza giriş linki gelir.",
    portalAccount:
      "Tüm dosyalarınız ve profil: Hesabım — e-postanıza giriş linki (şifre yok).",
    portalCta: "Hesabıma git",
    dossier: "Verilerimi indir (JSON)",
    notes: "Bizden notlar",
  };
}

export function CustomerCasePanel({
  locale,
  caseId,
  token,
  status,
  packageSlug,
  paid,
  amountCents,
  currency,
  mektup,
  sonuc,
  sharedNotes,
  brandName,
  dossierViewToken,
}: Props) {
  const L = copy(locale);
  const lead = !paid
    ? L.unpaid
    : sonuc.length > 0
      ? L.ready
      : status === "closed"
        ? L.paidWait
        : L.paidWait;

  function fileUrl(doc: DocRef) {
    if (doc.viewToken) {
      return `/api/cases/${caseId}/files/${doc.id}?vt=${encodeURIComponent(doc.viewToken)}`;
    }
    return `/api/cases/${caseId}/files/${doc.id}?token=${encodeURIComponent(token)}`;
  }

  const dossierUrl = dossierViewToken
    ? `/api/cases/${caseId}/dossier?vt=${encodeURIComponent(dossierViewToken)}`
    : `/api/cases/${caseId}/dossier?token=${encodeURIComponent(token)}`;

  return (
    <div>
      <h1 className="font-display text-3xl text-pt-navy-900">{L.title}</h1>
      <p className="mt-4 text-pt-slate-600">{lead}</p>
      <CaseStatusSteps
        steps={
          getContent(isLocale(locale) ? locale : "tr").portalSteps.steps
        }
        status={status}
        hasResult={sonuc.length > 0}
        paid={paid}
      />
      <p className="mt-4 text-sm text-pt-slate-500">{L.keep}</p>
      {paid ? (
        <div className="mt-3 rounded-lg border border-pt-emerald-600/20 bg-pt-emerald-50/60 px-4 py-3 text-sm text-pt-aws-ink">
          <p>
            {packageSlug === "aylik-paket" ? L.portalMonthly : L.portalAccount}
          </p>
          <a
            href={`/${locale}/hesabim`}
            className="mt-2 inline-block font-semibold text-pt-emerald-700 underline"
          >
            {L.portalCta} → /{locale}/hesabim
          </a>
        </div>
      ) : null}
      <p className="mt-1 text-sm font-medium text-pt-aws-ink">{L.files}</p>

      <dl className="mt-8 space-y-2 rounded-xl border border-pt-border bg-pt-surface px-4 py-4 text-sm shadow-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-pt-slate-500">{L.status}</dt>
          <dd className="font-medium text-pt-emerald-600">
            {statusLabel(status, locale)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-pt-slate-500">{L.package}</dt>
          <dd className="font-medium text-pt-aws-ink">
            {packageLabel(packageSlug, locale)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-pt-slate-500">{L.amount}</dt>
          <dd className="font-medium text-pt-aws-ink">
            {(amountCents / 100).toFixed(0)} {currency.toUpperCase()}
          </dd>
        </div>
      </dl>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-pt-slate-500">
          {L.letter}
        </h2>
        <ul className="mt-2 space-y-1">
          {mektup.map((d) => (
            <li key={d.id}>
              <a
                href={fileUrl(d)}
                className="text-sm text-pt-emerald-600 hover:underline"
              >
                {d.originalName}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-pt-emerald-600">
          {L.result}
        </h2>
        {sonuc.length === 0 ? (
          <p className="mt-2 text-sm text-pt-slate-500">{L.noResult}</p>
        ) : (
          <ul className="mt-2 space-y-1">
            {sonuc.map((d) => (
              <li key={d.id}>
                <a
                  href={fileUrl(d)}
                  className="text-base font-medium text-pt-emerald-600 hover:underline"
                >
                  {d.originalName}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      {Array.isArray(sharedNotes) && sharedNotes.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-pt-slate-500">
            {L.notes}
          </h2>
          <ul className="mt-2 space-y-2 text-sm text-pt-slate-600">
            {sharedNotes.map((n, i) => (
              <li
                key={`${n.createdAt}-${i}`}
                className="rounded-md border border-pt-border px-3 py-2"
              >
                <p>{n.body}</p>
                <p className="mt-1 text-[10px] text-pt-slate-400">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <a
        href={dossierUrl}
        className="mt-8 inline-block text-sm font-medium text-pt-aws-ink underline"
      >
        {L.dossier}
      </a>

      <Link
        href={`/${locale}`}
        className="mt-6 inline-block rounded-md bg-pt-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pt-emerald-500 sm:mt-10"
      >
        {brandName} — {L.home}
      </Link>
    </div>
  );
}
