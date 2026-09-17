"use client";

import { OrderFileField } from "@/components/cases/OrderFileField";
import { OrderStepIndicator } from "@/components/cases/OrderStepIndicator";
import { OrderSummaryCard } from "@/components/cases/OrderSummaryCard";
import { getContent } from "@/content";
import { orderFormLabels } from "@/content/order-form";
import { isLocale } from "@/lib/i18n";
import {
  tekYaziAmountCents,
  aylikPaketAmountCents,
  surecYonetimiAmountCents,
  telefonGorusmeAmountCents,
  yerindeEslikAmountCents,
  datetimeLocalMin,
} from "@/lib/cases/pricing";
import {
  TEK_YAZI_MAX_PAGES,
  sumPagesInBrowserFiles,
} from "@/lib/cases/count-pages";
import type { EntityType } from "@/lib/cases/types";
import {
  companyRequiresNip,
  isValidPlNip,
  normalizeNip,
} from "@/lib/invoices/nip";
import {
  EK_FORM_SLOT,
  MEKTUP_SLOT,
  checkoutablePackageSlugs,
  isCheckoutablePackage,
  type LetterPackageSlug,
} from "@/lib/cases/document-slots";
import {
  btnPrimaryClassName,
  btnSecondaryClassName,
  inputClassName,
  labelClassName,
  pageTitleClassName,
} from "@/lib/ui-classes";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type OrderFormProps = {
  locale: string;
};

function formatPln(cents: number): string {
  return `${(cents / 100).toFixed(0)} zł`;
}

export function OrderForm({ locale }: OrderFormProps) {
  const sp = useSearchParams();
  const L = orderFormLabels(locale);
  const content = getContent(isLocale(locale) ? locale : "tr");
  const preset = sp.get("paket");
  const initialSlug: LetterPackageSlug =
    preset && isCheckoutablePackage(preset)
      ? preset
      : preset === "telefon-gorusme"
        ? "tek-yazi"
        : "aylik-paket";

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [packageSlug, setPackageSlug] =
    useState<LetterPackageSlug>(initialSlug);
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [nip, setNip] = useState("");
  const [matter, setMatter] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [callAt, setCallAt] = useState("");
  const [city, setCity] = useState("");
  const [resultLocale, setResultLocale] = useState<"tr" | "pl" | "en">(
    locale === "pl" || locale === "en" ? locale : "tr",
  );
  const [detectedPages, setDetectedPages] = useState<number | null>(null);
  const [pagesBusy, setPagesBusy] = useState(false);
  const [fileQuota, setFileQuota] = useState(4);
  const [entityType, setEntityType] = useState<EntityType>("sahis");
  const [entityChosen, setEntityChosen] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(
    sp.get("cancelled") ? L.cancelled : null,
  );
  const [error, setError] = useState<string | null>(null);
  const [emailLocked, setEmailLocked] = useState(false);
  const [canBuyMonthly, setCanBuyMonthly] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/customer/me");
        const json = await res.json();
        if (cancelled || !json.success || !json.data?.profile) return;
        const p = json.data.profile as {
          fullName: string;
          email: string;
          phone: string;
          companyName: string | null;
          nip: string | null;
          entityType: string | null;
          preferredResultLocale: string | null;
        };
        setFullName(p.fullName);
        setEmail(p.email);
        setPhone(p.phone);
        setEmailLocked(true);
        if (json.data.canBuyMonthly === false) {
          setCanBuyMonthly(false);
        }
        if (p.companyName) setCompanyName(p.companyName);
        if (p.nip) setNip(p.nip);
        if (p.entityType === "sahis" || p.entityType === "sirket") {
          setEntityType(p.entityType);
          setEntityChosen(true);
        } else if (p.companyName) {
          setEntityType("sirket");
          setEntityChosen(true);
        }
        if (
          p.preferredResultLocale === "tr" ||
          p.preferredResultLocale === "pl" ||
          p.preferredResultLocale === "en"
        ) {
          setResultLocale(p.preferredResultLocale);
        }
      } catch {
        /* not signed in */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (packageSlug !== "tek-yazi" || !files || files.length === 0) {
      setDetectedPages(null);
      setPagesBusy(false);
      return;
    }
    let cancelled = false;
    setPagesBusy(true);
    setDetectedPages(null);
    void (async () => {
      try {
        const total = await sumPagesInBrowserFiles(files);
        if (cancelled) return;
        if (total > TEK_YAZI_MAX_PAGES) {
          setDetectedPages(null);
          setError(L.pagesTooMany);
        } else {
          setDetectedPages(total);
          setError((prev) => (prev === L.pagesTooMany ? null : prev));
        }
      } catch {
        if (!cancelled) {
          setDetectedPages(null);
          setError(L.pagesFail);
        }
      } finally {
        if (!cancelled) setPagesBusy(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [files, packageSlug, L.pagesFail, L.pagesTooMany]);

  useEffect(() => {
    if (!canBuyMonthly && packageSlug === "aylik-paket") {
      setPackageSlug("tek-yazi");
    }
  }, [canBuyMonthly, packageSlug]);

  const amountCents = useMemo(() => {
    if (packageSlug === "tek-yazi") {
      return tekYaziAmountCents(detectedPages ?? 1);
    }
    if (packageSlug === "aylik-paket") return aylikPaketAmountCents(fileQuota);
    if (packageSlug === "telefon-gorusme") return telefonGorusmeAmountCents();
    if (packageSlug === "yerinde-eslik") return yerindeEslikAmountCents();
    return surecYonetimiAmountCents(entityType);
  }, [packageSlug, detectedPages, fileQuota, entityType]);

  const isOptionalDocs =
    packageSlug === "telefon-gorusme" || packageSlug === "yerinde-eslik";

  const summaryAmount =
    packageSlug === "tek-yazi" && step === 4 && (pagesBusy || !files?.length)
      ? "—"
      : packageSlug === "tek-yazi" && step < 4
        ? `${formatPln(tekYaziAmountCents(1))}+`
        : formatPln(amountCents);

  function pickEntity(next: EntityType) {
    setError(null);
    setEntityType(next);
    setEntityChosen(true);
    if (next === "sahis") {
      setCompanyName("");
      setNip("");
    }
    setStep(3);
  }

  function validateStep2(): boolean {
    if (!fullName.trim() || !email.trim() || !phone.trim() || !matter.trim()) {
      setError(L.step2Required);
      return false;
    }
    if (entityType === "sirket" && !companyName.trim()) {
      setError(L.step2Required);
      return false;
    }
    const needNip = companyRequiresNip({
      companyName: entityType === "sirket" ? companyName : "",
      entityType,
    });
    const nipDigits = nip ? normalizeNip(nip) : "";
    if (needNip && !nipDigits) {
      setError(L.nipRequired);
      return false;
    }
    if (nipDigits && !isValidPlNip(nipDigits)) {
      setError(L.nipInvalid);
      return false;
    }
    if (packageSlug === "telefon-gorusme") {
      if (!callAt) {
        setError(L.callAtRequired);
        return false;
      }
      if (notes.trim().length < 10) {
        setError(L.phoneBriefRequired);
        return false;
      }
    }
    if (packageSlug === "yerinde-eslik") {
      if (city.trim().length < 2) {
        setError(L.cityRequired);
        return false;
      }
      if (notes.trim().length < 10) {
        setError(L.onsiteBriefRequired);
        return false;
      }
    }
    return true;
  }

  function goNext() {
    setError(null);
    if (step === 1) {
      if (packageSlug === "aylik-paket" && !canBuyMonthly) {
        setError(L.monthlyBlocked);
        return;
      }
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!entityChosen) {
        setError(L.entityPickRequired);
        return;
      }
      setStep(3);
      return;
    }
    if (step === 3 && validateStep2()) {
      setStep(4);
    }
  }

  function goBack() {
    setError(null);
    setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3 | 4) : s));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const needsDocs = !isOptionalDocs;
    if (needsDocs && (!files || files.length === 0)) {
      setError(L.fileRequired);
      return;
    }

    if (packageSlug === "aylik-paket" && !canBuyMonthly) {
      setError(L.monthlyBlocked);
      return;
    }

    if (packageSlug === "tek-yazi") {
      if (pagesBusy || detectedPages == null) {
        setError(L.pagesFail);
        return;
      }
      if (detectedPages > TEK_YAZI_MAX_PAGES) {
        setError(L.pagesTooMany);
        return;
      }
    }

    if (!validateStep2()) return;

    const nipDigits = nip ? normalizeNip(nip) : "";

    setBusy(true);
    try {
      const createRes = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageSlug,
          locale,
          fullName,
          companyName:
            entityType === "sirket" ? companyName || undefined : undefined,
          nip: entityType === "sirket" ? nipDigits || undefined : undefined,
          matter,
          resultLocale,
          email,
          phone,
          notes: notes || undefined,
          fileQuota: packageSlug === "aylik-paket" ? fileQuota : undefined,
          entityType,
          callRequestedAt:
            packageSlug === "telefon-gorusme" ? callAt : undefined,
          city: packageSlug === "yerinde-eslik" ? city.trim() : undefined,
        }),
      });
      const createJson = await createRes.json();
      if (!createRes.ok || !createJson.success) {
        throw new Error(createJson?.error?.message ?? L.error);
      }

      const { id, accessToken } = createJson.data as {
        id: string;
        accessToken: string;
      };

      if ((needsDocs || isOptionalDocs) && files) {
        const slotKey = isOptionalDocs ? EK_FORM_SLOT : MEKTUP_SLOT;
        for (const file of Array.from(files)) {
          const fd = new FormData();
          fd.set("slotKey", slotKey);
          fd.set("file", file);
          const up = await fetch(`/api/cases/${id}/documents`, {
            method: "POST",
            headers: { "x-case-token": accessToken },
            body: fd,
          });
          const upJson = await up.json();
          if (!up.ok || !upJson.success) {
            throw new Error(upJson?.error?.message ?? L.error);
          }
          if (
            packageSlug === "tek-yazi" &&
            typeof upJson.data?.pageCount === "number"
          ) {
            setDetectedPages(upJson.data.pageCount);
          }
        }
      }

      const payRes = await fetch(`/api/cases/${id}/checkout`, {
        method: "POST",
        headers: { "x-case-token": accessToken },
      });
      const payJson = await payRes.json();
      if (!payRes.ok || !payJson.success) {
        throw new Error(payJson?.error?.message ?? L.error);
      }

      if (payJson.data.mode === "stripe" && payJson.data.checkoutUrl) {
        window.location.href = payJson.data.checkoutUrl;
        return;
      }

      setMessage(L.successDev);
      const dev = await fetch(`/api/cases/${id}/dev-pay`, {
        method: "POST",
        headers: { "x-case-token": accessToken },
      });
      if (!dev.ok) throw new Error(L.error);
      window.location.href = `/${locale}/basvuru/basarili?case=${id}&token=${accessToken}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : L.error);
      setBusy(false);
    }
  }

  const summary = (
    <OrderSummaryCard
      title={L.summaryTitle}
      packageLabel={L.package}
      packageName={L.packages[packageSlug]}
      amountLabel={L.amount}
      amount={summaryAmount}
      disclaimer={content.footer.disclaimer}
    />
  );

  return (
    <form
      onSubmit={onSubmit}
      className="lg:grid lg:grid-cols-[minmax(0,1fr)_15.5rem] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_17rem] xl:gap-12"
    >
      <div>
        <h1 className={pageTitleClassName("text-3xl md:text-4xl")}>{L.title}</h1>

        {message ? (
          <p className="mt-4 rounded-2xl border border-amber-200/80 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="mt-4 rounded-2xl border border-red-200/80 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        ) : null}
        {!canBuyMonthly ? (
          <p className="mt-4 rounded-2xl border border-pt-emerald-600/20 bg-pt-emerald-50 px-4 py-3 text-sm text-pt-navy-900">
            {L.monthlyBlocked}{" "}
            <a href={`/${locale}/hesabim`} className="font-medium underline">
              /{locale}/hesabim
            </a>
          </p>
        ) : null}

        <div className="mt-8">
          <OrderStepIndicator
            steps={
              packageSlug === "telefon-gorusme"
                ? L.stepsPhone
                : packageSlug === "yerinde-eslik"
                  ? L.stepsOnsite
                  : L.steps
            }
            current={step}
            stepWord={L.stepWord}
          />
        </div>

        {step === 1 ? (
          <div className="space-y-8">
            <fieldset disabled={busy}>
              <legend className="sr-only">{L.package}</legend>
              <div className="divide-y divide-pt-border/80 overflow-hidden rounded-2xl border border-pt-border/80 bg-pt-surface">
                {checkoutablePackageSlugs.map((slug) => {
                  const blocked = slug === "aylik-paket" && !canBuyMonthly;
                  const selected = packageSlug === slug;
                  const svc = (
                    Array.isArray(content.services.items)
                      ? content.services.items
                      : []
                  ).find((s) => s.slug === slug);
                  const priceHint =
                    slug === "tek-yazi"
                      ? `${formatPln(tekYaziAmountCents(1))}+`
                      : slug === "aylik-paket"
                        ? formatPln(aylikPaketAmountCents(4))
                        : slug === "yerinde-eslik"
                          ? formatPln(yerindeEslikAmountCents())
                          : formatPln(surecYonetimiAmountCents("sahis"));
                  return (
                    <button
                      key={slug}
                      type="button"
                      disabled={blocked || busy}
                      onClick={() => setPackageSlug(slug)}
                      className={`flex w-full items-start gap-3 px-4 py-4 text-left transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 sm:gap-4 sm:px-5 sm:py-5 ${
                        selected
                          ? "bg-pt-emerald-50/90"
                          : "bg-pt-surface hover:bg-pt-bg/80"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                          selected
                            ? "border-pt-emerald-600 bg-pt-emerald-600"
                            : "border-pt-border bg-pt-surface"
                        }`}
                        aria-hidden
                      >
                        {selected ? (
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        ) : null}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-start justify-between gap-3">
                          <span className="font-display text-base font-semibold text-pt-navy-950">
                            {L.packages[slug]}
                          </span>
                          <span
                            className={`shrink-0 text-sm font-semibold tabular-nums ${
                              selected
                                ? "text-pt-emerald-800"
                                : "text-pt-navy-800"
                            }`}
                          >
                            {priceHint}
                          </span>
                        </span>
                        {svc?.shortDescription ? (
                          <span className="mt-1 block text-sm leading-relaxed text-pt-slate-500">
                            {svc.shortDescription}
                          </span>
                        ) : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {packageSlug === "tek-yazi" ? (
              <p className="rounded-2xl bg-pt-bg px-4 py-3 text-sm text-pt-slate-600">
                {L.pagesAuto}
              </p>
            ) : null}

            {packageSlug === "aylik-paket" ? (
              <fieldset disabled={busy}>
                <legend className="mb-3 text-sm font-semibold text-pt-navy-900">
                  {L.quota}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {[4, 6, 8, 10].map((n) => {
                    const selected = fileQuota === n;
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setFileQuota(n)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold tabular-nums transition-all duration-200 ${
                          selected
                            ? "border-pt-emerald-600 bg-pt-emerald-600 text-white"
                            : "border-pt-border bg-pt-surface text-pt-navy-900 hover:border-pt-emerald-500 hover:bg-pt-emerald-50"
                        }`}
                      >
                        {n} · {formatPln(aylikPaketAmountCents(n))}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 rounded-2xl border border-pt-border bg-pt-bg px-4 py-3 text-sm text-pt-slate-600">
                  <span className="font-semibold text-pt-navy-900">
                    {L.quotaQuoteLabel}
                  </span>
                  {" — "}
                  <Link
                    href={`/${locale}?process=aylik-paket#iletisim`}
                    className="font-semibold text-pt-emerald-700 hover:underline"
                  >
                    {L.quotaGetPrice}
                  </Link>
                  {" · "}
                  <Link
                    href={`/${locale}?process=aylik-paket#iletisim`}
                    className="font-semibold text-pt-navy-900 hover:text-pt-emerald-700 hover:underline"
                  >
                    {L.quotaTalk}
                  </Link>
                </p>
              </fieldset>
            ) : null}

            {packageSlug === "telefon-gorusme" ? (
              <p className="rounded-2xl bg-pt-bg px-4 py-3 text-sm text-pt-slate-600">
                {L.phonePayNote} — {formatPln(telefonGorusmeAmountCents())}
              </p>
            ) : null}

            {packageSlug === "yerinde-eslik" ? (
              <p className="rounded-2xl bg-pt-bg px-4 py-3 text-sm text-pt-slate-600">
                {L.onsitePayNote} — {formatPln(yerindeEslikAmountCents())}
              </p>
            ) : null}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-5">
            <p className="text-sm text-pt-slate-500">{L.entityPickLead}</p>
            <div className="divide-y divide-pt-border/80 overflow-hidden rounded-2xl border border-pt-border/80">
              <button
                type="button"
                disabled={busy}
                onClick={() => pickEntity("sahis")}
                className={`flex w-full items-start gap-3 px-4 py-4 text-left transition-colors duration-200 sm:gap-4 sm:px-5 sm:py-5 ${
                  entityChosen && entityType === "sahis"
                    ? "bg-pt-emerald-50/90"
                    : "bg-pt-surface hover:bg-pt-bg/80"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    entityChosen && entityType === "sahis"
                      ? "border-pt-emerald-600 bg-pt-emerald-600"
                      : "border-pt-border bg-pt-surface"
                  }`}
                  aria-hidden
                >
                  {entityChosen && entityType === "sahis" ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  ) : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-base font-semibold text-pt-navy-950">
                    {L.sahis}
                    {packageSlug === "surec-yonetimi"
                      ? ` · ${formatPln(surecYonetimiAmountCents("sahis"))}`
                      : ""}
                  </span>
                  <span className="mt-1 block text-sm text-pt-slate-500">
                    {L.entitySahisHint}
                  </span>
                </span>
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => pickEntity("sirket")}
                className={`flex w-full items-start gap-3 px-4 py-4 text-left transition-colors duration-200 sm:gap-4 sm:px-5 sm:py-5 ${
                  entityChosen && entityType === "sirket"
                    ? "bg-pt-emerald-50/90"
                    : "bg-pt-surface hover:bg-pt-bg/80"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    entityChosen && entityType === "sirket"
                      ? "border-pt-emerald-600 bg-pt-emerald-600"
                      : "border-pt-border bg-pt-surface"
                  }`}
                  aria-hidden
                >
                  {entityChosen && entityType === "sirket" ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  ) : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-base font-semibold text-pt-navy-950">
                    {L.sirket}
                    {packageSlug === "surec-yonetimi"
                      ? ` · ${formatPln(surecYonetimiAmountCents("sirket"))}`
                      : ""}
                  </span>
                  <span className="mt-1 block text-sm text-pt-slate-500">
                    {L.entitySirketHint}
                  </span>
                </span>
              </button>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-5">
            {entityType === "sahis" ? (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-pt-navy-900">
                  {L.personHeading}
                </h2>
                <label className={labelClassName}>
                  {L.fullName}
                  <input
                    required
                    className={inputClassName}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={busy}
                    autoComplete="name"
                  />
                </label>
              </div>
            ) : (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-pt-navy-900">
                  {L.companyHeading}
                </h2>
                <label className={labelClassName}>
                  {L.companyName}
                  <input
                    required
                    className={inputClassName}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    disabled={busy}
                    autoComplete="organization"
                  />
                </label>
                <label className={labelClassName}>
                  {L.nip}
                  <input
                    required
                    className={inputClassName}
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    disabled={busy}
                    inputMode="numeric"
                    autoComplete="off"
                  />
                  <span className="mt-1 block text-xs font-normal text-pt-slate-500">
                    {L.nipHint}
                  </span>
                </label>
                <label className={labelClassName}>
                  {L.contactName}
                  <input
                    required
                    className={inputClassName}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={busy}
                    autoComplete="name"
                  />
                </label>
              </div>
            )}

            <label className={labelClassName}>
              {L.matter}
              <input
                required
                className={inputClassName}
                value={matter}
                onChange={(e) => setMatter(e.target.value)}
                disabled={busy}
                placeholder={
                  packageSlug === "telefon-gorusme" ||
                  packageSlug === "yerinde-eslik"
                    ? locale === "pl"
                      ? "ZUS — składki, prawo jazdy…"
                      : locale === "en"
                        ? "ZUS — contributions, driving licence…"
                        : "ZUS — katkı, ehliyet…"
                    : locale === "pl"
                      ? "ZUS — składki"
                      : locale === "en"
                        ? "ZUS — contributions"
                        : "ZUS — katkı"
                }
              />
            </label>
            {packageSlug === "yerinde-eslik" ? (
              <label className={labelClassName}>
                {L.city}
                <input
                  required
                  className={inputClassName}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={busy}
                  placeholder={
                    locale === "pl"
                      ? "Warszawa"
                      : locale === "en"
                        ? "Warsaw"
                        : "Warszawa"
                  }
                />
                <span className="mt-1 block text-xs font-normal text-pt-slate-500">
                  {L.cityHint}
                </span>
              </label>
            ) : null}
            {packageSlug === "telefon-gorusme" ? (
              <label className={labelClassName}>
                {L.callAt}
                <input
                  required
                  type="datetime-local"
                  className={inputClassName}
                  value={callAt}
                  min={datetimeLocalMin()}
                  onChange={(e) => setCallAt(e.target.value)}
                  disabled={busy}
                />
                <span className="mt-1 block text-xs font-normal text-pt-slate-500">
                  {L.callAtHint}
                </span>
              </label>
            ) : null}
            <label className={labelClassName}>
              {L.resultLocale}
              <select
                className={inputClassName}
                value={resultLocale}
                onChange={(e) =>
                  setResultLocale(e.target.value as "tr" | "pl" | "en")
                }
                disabled={busy}
              >
                <option value="pl">Polski / Lehçe</option>
                <option value="en">English / İngilizce</option>
                <option value="tr">Türkçe</option>
              </select>
            </label>
            <label className={labelClassName}>
              {L.email}
              <input
                required
                type="email"
                className={inputClassName}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={busy || emailLocked}
                readOnly={emailLocked}
              />
              {emailLocked ? (
                <span className="mt-1 block text-xs font-normal text-pt-slate-500">
                  {L.emailLocked}
                </span>
              ) : null}
            </label>
            <label className={labelClassName}>
              {L.phone}
              <input
                required
                className={inputClassName}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={busy}
              />
            </label>
            <label className={labelClassName}>
              {packageSlug === "telefon-gorusme"
                ? L.phoneBrief
                : packageSlug === "yerinde-eslik"
                  ? L.onsiteBrief
                  : L.notes}
              <textarea
                className={inputClassName}
                rows={
                  packageSlug === "telefon-gorusme" ||
                  packageSlug === "yerinde-eslik"
                    ? 5
                    : 3
                }
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={busy}
                required={
                  packageSlug === "telefon-gorusme" ||
                  packageSlug === "yerinde-eslik"
                }
              />
              {packageSlug === "telefon-gorusme" ? (
                <span className="mt-1 block text-xs font-normal text-pt-slate-500">
                  {L.phoneBriefHint}
                </span>
              ) : null}
              {packageSlug === "yerinde-eslik" ? (
                <span className="mt-1 block text-xs font-normal text-pt-slate-500">
                  {L.onsiteBriefHint}
                </span>
              ) : null}
            </label>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="space-y-5">
            {packageSlug === "tek-yazi" ? (
              <p className="rounded-2xl bg-pt-bg px-4 py-3 text-sm text-pt-slate-600">
                {L.pagesAuto}
                {pagesBusy
                  ? ` — ${L.pagesCounting}`
                  : detectedPages != null
                    ? ` — ${detectedPages} · ${formatPln(tekYaziAmountCents(detectedPages))}`
                    : null}
              </p>
            ) : null}

            {packageSlug === "telefon-gorusme" ||
            packageSlug === "yerinde-eslik" ? (
              <>
                <p className="rounded-2xl bg-pt-bg px-4 py-3 text-sm text-pt-slate-600">
                  {packageSlug === "telefon-gorusme"
                    ? L.phonePayNote
                    : L.onsitePayNote}
                </p>
                <OrderFileField
                  label={
                    packageSlug === "telefon-gorusme"
                      ? L.phoneUpload
                      : L.onsiteUpload
                  }
                  hint={
                    packageSlug === "telefon-gorusme"
                      ? L.phoneUploadHint
                      : L.onsiteUploadHint
                  }
                  disabled={busy}
                  files={files}
                  onFiles={(next) => {
                    setError(null);
                    setFiles(next);
                  }}
                  chooseLabel={L.uploadChoose}
                  dropLabel={L.uploadDrop}
                  formatsLabel={L.uploadFormats}
                  clearLabel={L.uploadClear}
                />
              </>
            ) : (
              <OrderFileField
                label={L.upload}
                required
                disabled={busy}
                files={files}
                onFiles={(next) => {
                  setError(null);
                  setFiles(next);
                }}
                chooseLabel={L.uploadChoose}
                dropLabel={L.uploadDrop}
                formatsLabel={L.uploadFormats}
                clearLabel={L.uploadClear}
              />
            )}

            <div className="lg:hidden">{summary}</div>

            <button
              type="submit"
              disabled={
                busy ||
                pagesBusy ||
                (packageSlug === "tek-yazi" && detectedPages == null)
              }
              className={`${btnPrimaryClassName} w-full rounded-full py-3.5 text-base`}
            >
              {busy ? L.paying : L.submit}
            </button>
          </div>
        ) : null}

        {step < 4 ? (
          <div className="mt-10 flex flex-wrap gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={goBack}
                disabled={busy}
                className={`${btnSecondaryClassName} rounded-full`}
              >
                {L.back}
              </button>
            ) : null}
            {step === 2 ? null : (
              <button
                type="button"
                onClick={goNext}
                disabled={busy}
                className={`${btnPrimaryClassName} rounded-full px-7`}
              >
                {L.next}
              </button>
            )}
          </div>
        ) : (
          <div className="mt-6">
            <button
              type="button"
              onClick={goBack}
              disabled={busy}
              className={`${btnSecondaryClassName} rounded-full`}
            >
              {L.back}
            </button>
          </div>
        )}
      </div>

      <div className="hidden lg:block">{summary}</div>
    </form>
  );
}
