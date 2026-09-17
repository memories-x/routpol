"use client";

import { CaseStatusSteps } from "@/components/customer/CaseStatusSteps";
import { getContent } from "@/content";
import { callTzHint, formatCallSlot } from "@/lib/cases/call-schedule";
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
  /** ISO — case.updatedAt or latest activity */
  lastUpdatedAt?: string;
  /** telefon-gorusme preferred slot (ISO UTC) */
  callRequestedAt?: string;
  customerNotes?: string;
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
    "telefon-gorusme": {
      tr: "Telefon görüşmesi (1 saat)",
      pl: "Konsultacja telefoniczna (1 godz.)",
      en: "Phone consultation (1 hour)",
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

function formatWhen(iso: string, locale: string): string {
  try {
    const loc =
      locale === "pl" ? "pl-PL" : locale === "en" ? "en-GB" : "tr-TR";
    return new Date(iso).toLocaleString(loc, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

function copy(locale: string) {
  if (locale === "pl") {
    return {
      title: "Twoja sprawa",
      unpaid: "Oczekiwanie na płatność.",
      paidWait:
        "Płatność przyjęta. Potwierdzimy termin rozmowy — odświeżcie stronę później.",
      ready: "Notatka / wynik gotowy — pobierz poniżej.",
      callSlot: "Preferowany termin",
      callTz: "czas warszawski",
      briefing: "Wasze briefowanie",
      phoneNext:
        "Operator potwierdzi slot i oddzwoni. Notatka po rozmowie pojawi się tutaj.",
      status: "Status",
      package: "Usługa",
      amount: "Kwota",
      letter: "Twoje pismo (wgrane przez Ciebie)",
      letterOptional: "Ewentualny formularz / pismo (jeśli wgraliście)",
      result: "Wynik do pobrania",
      noResult: "Wynik pojawi się tutaj.",
      home: "Strona główna",
      keep: "Zachowaj ten link (ta sprawa). Ten sam link jest też na e-mailu.",
      portalMonthly:
        "Kolejne pisma w pakiecie: e-mail z płatności — wyślemy krótki link (bez loginu).",
      portalAccount:
        "Wszystkie sprawy: ten sam e-mail — krótki link, bez loginu.",
      portalCta: "Poprzednie pliki",
      dossier: "Pobierz moje dane (JSON)",
      notes: "Notatki od nas",
      lastUpdated: "Ostatnia aktualizacja",
      nextStep: "Co dalej / od nas",
      nextDefault:
        "Przygotowujemy wynik. Gdy będzie gotowy, pojawi się duży przycisk pobierania — i wyślemy e-mail.",
      download: "Pobierz wynik",
      downloadAll: "Pobierz",
      doorsTitle: "Dwa wejścia",
      doorCase: "Ta sprawa — ten link (bez logowania)",
      doorAccount: "Wszystkie sprawy — e-mail z płatności (krótki link)",
    };
  }
  if (locale === "en") {
    return {
      title: "Your case",
      unpaid: "Awaiting payment.",
      paidWait:
        "Payment received. We will confirm the call slot — refresh later.",
      ready: "Note / result ready — download below.",
      callSlot: "Preferred call time",
      callTz: "Warsaw time",
      briefing: "Your briefing",
      phoneNext:
        "The operator will confirm the slot and call you. A note after the call appears here.",
      status: "Status",
      package: "Service",
      amount: "Amount",
      letter: "Your uploaded letter",
      letterOptional: "Related form / letter (if you uploaded one)",
      result: "Result — download here",
      noResult: "The result will appear here.",
      home: "Home",
      keep: "Keep this link (this case). The same link is also in your email.",
      portalMonthly:
        "More letters this month: we email a short link to the address you paid with (no username).",
      portalAccount:
        "All cases: same payment email — short link, no username.",
      portalCta: "Previous files",
      dossier: "Download my data (JSON)",
      notes: "Notes from us",
      lastUpdated: "Last update",
      nextStep: "What’s next / from us",
      nextDefault:
        "We are preparing your result. When it is ready, a large Download button appears here — and we email you.",
      download: "Download result",
      downloadAll: "Download",
      doorsTitle: "Two doors",
      doorCase: "This case — this link (no login)",
      doorAccount: "All cases — payment email (short link)",
    };
  }
  return {
    title: "Dosya sayfanız",
    unpaid: "Ödeme bekleniyor.",
    paidWait:
      "Ödeme alındı. Görüşme saatini teyit edeceğiz — sonra bu sayfayı yenileyin.",
    ready: "Not / sonuç hazır — aşağıdan indirin.",
    callSlot: "Tercih edilen görüşme",
    callTz: "Varşova saati",
    briefing: "Bilgilendirmeniz",
    phoneNext:
      "Operatör slotu teyit edip arayacak. Görüşme sonrası not burada görünür.",
    status: "Durum",
    package: "Hizmet",
    amount: "Tutar",
    letter: "Yüklediğiniz yazı",
    letterOptional: "Yüklediğiniz ilgili form / yazı (varsa)",
    result: "Sonuç — buradan indirin",
    noResult: "Sonuç burada görünecek.",
    home: "Ana sayfa",
    keep: "Bu linki saklayın (bu dosya). Aynı link e-postanıza da gider.",
    portalMonthly:
      "Ay boyunca yeni yazılar: ödeme e-postanıza kısa link (kullanıcı adı yok).",
    portalAccount:
      "Tüm işleriniz: aynı e-posta — kısa link, kullanıcı adı yok.",
    portalCta: "Önceki dosyalar",
    dossier: "Verilerimi indir (JSON)",
    notes: "Bizden notlar",
    lastUpdated: "Son güncelleme",
    nextStep: "Sıradaki adım / bizden",
    nextDefault:
      "Sonucu hazırlıyoruz. Hazır olunca burada büyük İndir düğmesi çıkar — ve e-posta gider.",
    download: "Sonucu indir",
    downloadAll: "İndir",
    doorsTitle: "İki kapı",
    doorCase: "Bu dosya — bu link (giriş yok)",
    doorAccount: "Tüm işler — ödeme e-postası (kısa link)",
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
  lastUpdatedAt,
  callRequestedAt,
  customerNotes,
}: Props) {
  const L = copy(locale);
  const notes = Array.isArray(sharedNotes) ? sharedNotes : [];
  const results = Array.isArray(sonuc) ? sonuc : [];
  const letters = Array.isArray(mektup) ? mektup : [];
  const ready = results.length > 0;
  const latestNote = notes[0] ?? null;
  const isPhone = packageSlug === "telefon-gorusme";

  const lead = !paid
    ? L.unpaid
    : ready
      ? L.ready
      : isPhone
        ? L.paidWait
        : L.paidWait;

  const nextBody = ready
    ? L.ready
    : latestNote?.body?.trim()
      ? latestNote.body.trim()
      : paid
        ? isPhone
          ? L.phoneNext
          : L.nextDefault
        : L.unpaid;

  function fileUrl(doc: DocRef) {
    if (doc.viewToken) {
      return `/api/cases/${caseId}/files/${doc.id}?vt=${encodeURIComponent(doc.viewToken)}`;
    }
    return `/api/cases/${caseId}/files/${doc.id}?token=${encodeURIComponent(token)}`;
  }

  const dossierUrl = dossierViewToken
    ? `/api/cases/${caseId}/dossier?vt=${encodeURIComponent(dossierViewToken)}`
    : `/api/cases/${caseId}/dossier?token=${encodeURIComponent(token)}`;

  const primaryResult = results[0];

  return (
    <div>
      <h1 className="font-display text-3xl text-pt-navy-900">{L.title}</h1>
      <p className="mt-4 text-pt-slate-600">{lead}</p>
      {lastUpdatedAt ? (
        <p className="mt-2 text-xs text-pt-slate-500">
          {L.lastUpdated}: {formatWhen(lastUpdatedAt, locale)}
        </p>
      ) : null}

      <CaseStatusSteps
        steps={
          getContent(isLocale(locale) ? locale : "tr").portalSteps.steps
        }
        status={status}
        hasResult={ready}
        paid={paid}
      />

      {ready && primaryResult ? (
        <div className="mt-8 rounded-xl border-2 border-pt-emerald-600 bg-pt-emerald-50/70 px-5 py-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-pt-emerald-700">
            {L.result}
          </p>
          <p className="mt-1 text-sm text-pt-slate-600">
            {primaryResult.originalName}
            {results.length > 1
              ? ` (+${results.length - 1})`
              : ""}
          </p>
          <a
            href={fileUrl(primaryResult)}
            className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-pt-emerald-600 px-5 py-3.5 text-base font-semibold text-white hover:bg-pt-emerald-500 sm:w-auto"
          >
            {L.download}
          </a>
          {results.length > 1 ? (
            <ul className="mt-4 space-y-2 border-t border-pt-emerald-600/20 pt-4">
              {results.slice(1).map((d) => (
                <li key={d.id}>
                  <a
                    href={fileUrl(d)}
                    className="text-sm font-medium text-pt-emerald-700 hover:underline"
                  >
                    {L.downloadAll}: {d.originalName}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <section className="mt-8 rounded-xl border border-pt-border bg-pt-surface px-4 py-4 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-pt-slate-500">
          {L.nextStep}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-pt-navy-900">{nextBody}</p>
        {latestNote && !ready ? (
          <p className="mt-2 text-[10px] text-pt-slate-400">
            {formatWhen(latestNote.createdAt, locale)}
          </p>
        ) : null}
      </section>

      <p className="mt-6 text-sm text-pt-slate-500">{L.keep}</p>

      <div className="mt-3 rounded-lg border border-pt-border bg-pt-bg px-4 py-3 text-sm text-pt-aws-ink">
        <p className="text-xs font-semibold uppercase tracking-wide text-pt-slate-500">
          {L.doorsTitle}
        </p>
        <ul className="mt-2 space-y-1.5 text-sm">
          <li>{L.doorCase}</li>
          <li>
            {packageSlug === "aylik-paket" ? L.portalMonthly : L.portalAccount}{" "}
            <a
              href={`/${locale}/hesabim`}
              className="font-semibold text-pt-emerald-700 underline"
            >
              {L.portalCta} →
            </a>
          </li>
        </ul>
      </div>

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
        {isPhone && callRequestedAt ? (
          <div className="flex justify-between gap-4">
            <dt className="text-pt-slate-500">{L.callSlot}</dt>
            <dd className="text-right font-medium text-pt-aws-ink">
              {formatCallSlot(callRequestedAt, locale)}
              <span className="mt-0.5 block text-[10px] font-normal text-pt-slate-500">
                {L.callTz} · {callTzHint(locale)}
              </span>
            </dd>
          </div>
        ) : null}
        {isPhone && customerNotes?.trim() ? (
          <div className="border-t border-pt-border pt-2">
            <dt className="text-pt-slate-500">{L.briefing}</dt>
            <dd className="mt-1 whitespace-pre-wrap text-pt-aws-ink">
              {customerNotes.trim()}
            </dd>
          </div>
        ) : null}
      </dl>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-pt-slate-500">
          {packageSlug === "telefon-gorusme" ? L.letterOptional : L.letter}
        </h2>
        {letters.length === 0 ? (
          <p className="mt-2 text-sm text-pt-slate-500">—</p>
        ) : (
          <ul className="mt-2 space-y-1">
            {letters.map((d) => (
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
        )}
      </section>

      {!ready ? (
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-pt-emerald-600">
            {L.result}
          </h2>
          <p className="mt-2 text-sm text-pt-slate-500">{L.noResult}</p>
        </section>
      ) : null}

      {notes.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-pt-slate-500">
            {L.notes}
          </h2>
          <ul className="mt-2 space-y-2 text-sm text-pt-slate-600">
            {notes.map((n, i) => (
              <li
                key={`${n.createdAt}-${i}`}
                className="rounded-md border border-pt-border px-3 py-2"
              >
                <p>{n.body}</p>
                <p className="mt-1 text-[10px] text-pt-slate-400">
                  {formatWhen(n.createdAt, locale)}
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
        className="mt-6 inline-block rounded-md border border-pt-border bg-pt-surface px-4 py-2 text-sm font-semibold text-pt-navy-800 hover:bg-pt-bg sm:mt-10"
      >
        {brandName} — {L.home}
      </Link>
    </div>
  );
}
