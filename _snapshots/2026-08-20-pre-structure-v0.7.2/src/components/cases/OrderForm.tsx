"use client";

import { OrderStepIndicator } from "@/components/cases/OrderStepIndicator";
import { OrderSummaryCard } from "@/components/cases/OrderSummaryCard";
import { getContent } from "@/content";
import { isLocale } from "@/lib/i18n";
import {
  tekYaziAmountCents,
  aylikPaketAmountCents,
  surecYonetimiAmountCents,
} from "@/lib/cases/pricing";
import {
  TEK_YAZI_MAX_PAGES,
  sumPagesInBrowserFiles,
} from "@/lib/cases/count-pages";
import type { LetterPackageSlug } from "@/lib/cases/document-slots";
import type { EntityType } from "@/lib/cases/types";
import {
  companyRequiresNip,
  isValidPlNip,
  normalizeNip,
} from "@/lib/invoices/nip";
import { MEKTUP_SLOT } from "@/lib/cases/document-slots";
import {
  btnPrimaryClassName,
  btnSecondaryClassName,
  inputClassName,
  labelClassName,
  pageTitleClassName,
} from "@/lib/ui-classes";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type OrderFormProps = {
  locale: string;
};

type Labels = {
  title: string;
  package: string;
  fullName: string;
  companyName: string;
  nip: string;
  nipHint: string;
  nipRequired: string;
  nipInvalid: string;
  matter: string;
  email: string;
  phone: string;
  notes: string;
  resultLocale: string;
  pagesAuto: string;
  pagesCounting: string;
  pagesFail: string;
  pagesTooMany: string;
  quota: string;
  entity: string;
  sahis: string;
  sirket: string;
  upload: string;
  amount: string;
  submit: string;
  uploading: string;
  paying: string;
  successDev: string;
  error: string;
  cancelled: string;
  monthlyBlocked: string;
  emailLocked: string;
  packages: Record<LetterPackageSlug, string>;
  steps: [string, string, string];
  summaryTitle: string;
  next: string;
  back: string;
  step2Required: string;
  fileRequired: string;
};

function labelsFor(locale: string): Labels {
  if (locale === "pl") {
    return {
      title: "Wniosek",
      package: "Usługa",
      fullName: "Imię i nazwisko",
      companyName: "Nazwa firmy (osoba — puste)",
      nip: "NIP nabywcy",
      nipHint: "Wymagany, gdy podano firmę (faktura KSeF).",
      nipRequired: "NIP firmy jest wymagany.",
      nipInvalid: "Niepoprawny NIP (10 cyfr).",
      matter: "Temat / urząd (np. ZUS — składki)",
      email: "E-mail",
      phone: "Telefon",
      notes: "Uwagi (opcjonalnie)",
      resultLocale: "Język streszczenia",
      pagesAuto: "Liczba stron z pliku — cena ustala się automatycznie",
      pagesCounting: "Liczenie stron…",
      pagesFail: "Nie udało się odczytać liczby stron z pliku.",
      pagesTooMany: `Maks. ${TEK_YAZI_MAX_PAGES} stron w pakiecie jedno pismo.`,
      quota: "Liczba pism w miesiącu",
      entity: "Osoba lub firma",
      sahis: "Osoba",
      sirket: "Firma",
      upload: "Pismo (PDF / JPG / PNG)",
      amount: "Do zapłaty",
      submit: "Zapłać i wyślij",
      uploading: "Wysyłanie…",
      paying: "Przetwarzanie…",
      successDev: "Płatność przyjęta. Otwieramy Twoją sprawę…",
      error: "Nie udało się. Spróbuj ponownie.",
      cancelled: "Płatność anulowana. Możesz spróbować ponownie.",
      monthlyBlocked:
        "Masz już aktywny pakiet miesięczny. Kolejne pisma: Konto. Nowy pakiet po zakończeniu okresu.",
      emailLocked: "E-mail z konta — nie można zmienić przy zamówieniu.",
      packages: {
        "tek-yazi": "Jedno pismo (firma lub osoba)",
        "aylik-paket": "Miesięczna opieka administracyjna",
        "surec-yonetimi": "Prowadzenie z pełnomocnictwem",
      },
      steps: ["Usługa", "Dane", "Plik i płatność"],
      summaryTitle: "Podsumowanie",
      next: "Dalej",
      back: "Wstecz",
      step2Required: "Uzupełnij wymagane pola.",
      fileRequired: "Dodaj pismo.",
    };
  }
  if (locale === "en") {
    return {
      title: "Apply",
      package: "Service",
      fullName: "Full name",
      companyName: "Company name (individual — leave blank)",
      nip: "Buyer NIP",
      nipHint: "Required when a company name is given (KSeF invoice).",
      nipRequired: "Company NIP is required.",
      nipInvalid: "Invalid NIP (10 digits).",
      matter: "Subject / office (e.g. ZUS — contributions)",
      email: "Email",
      phone: "Phone",
      notes: "Notes (optional)",
      resultLocale: "Summary language",
      pagesAuto: "Page count from file — price is set automatically",
      pagesCounting: "Counting pages…",
      pagesFail: "Could not read page count from the file.",
      pagesTooMany: `Max ${TEK_YAZI_MAX_PAGES} pages on the single-letter package.`,
      quota: "Letters per month",
      entity: "Individual or company",
      sahis: "Individual",
      sirket: "Company",
      upload: "Letter (PDF / JPG / PNG)",
      amount: "Amount due",
      submit: "Pay and submit",
      uploading: "Uploading…",
      paying: "Processing…",
      successDev: "Payment received. Opening your case…",
      error: "Something went wrong. Try again.",
      cancelled: "Payment cancelled. You can try again.",
      monthlyBlocked:
        "You already have an active monthly package. Extra letters: Account. New package after the period ends.",
      emailLocked: "Email is locked to your account for this order.",
      packages: {
        "tek-yazi": "Single letter (company or individual)",
        "aylik-paket": "Monthly admin tracking",
        "surec-yonetimi": "Admin execution with POA",
      },
      steps: ["Service", "Details", "Upload & pay"],
      summaryTitle: "Summary",
      next: "Continue",
      back: "Back",
      step2Required: "Fill in the required fields.",
      fileRequired: "Add the letter file.",
    };
  }
  return {
    title: "Başvuru",
    package: "Hizmet",
    fullName: "Ad Soyad",
    companyName: "Şirket unvanı (şahısta boş)",
    nip: "Alıcı NIP",
    nipHint: "Şirket unvanı varsa zorunlu (KSeF faturası).",
    nipRequired: "Firma NIP zorunlu.",
    nipInvalid: "Geçersiz NIP (10 hane).",
    matter: "Konu / kurum (ör. ZUS — katkı)",
    email: "E-posta",
    phone: "Telefon",
    notes: "Not (isteğe bağlı)",
    resultLocale: "Özet dili",
    pagesAuto: "Sayfa sayısı dosyadan — fiyat otomatik",
    pagesCounting: "Sayfa sayılıyor…",
    pagesFail: "Dosyadan sayfa sayısı okunamadı.",
    pagesTooMany: `Tek yazıda en fazla ${TEK_YAZI_MAX_PAGES} sayfa.`,
    quota: "Ayda kaç yazı",
    entity: "Şahıs veya şirket",
    sahis: "Şahıs",
    sirket: "Şirket",
    upload: "Yazı (PDF / JPG / PNG)",
    amount: "Ödenecek tutar",
    submit: "Öde ve gönder",
    uploading: "Yükleniyor…",
    paying: "İşleniyor…",
    successDev: "Ödeme alındı. Başvurunuz açılıyor…",
    error: "İşlem başarısız. Tekrar deneyin.",
    cancelled: "Ödeme iptal edildi. Tekrar deneyebilirsiniz.",
    monthlyBlocked:
      "Aktif aylık paketiniz var. Ek yazı: Hesabım. Yeni paket dönem bitince.",
    emailLocked: "E-posta hesabınıza kilitli — siparişte değiştirilemez.",
    packages: {
      "tek-yazi": "Tek yazı (şirket veya şahıs)",
      "aylik-paket": "Aylık idari takip",
      "surec-yonetimi": "Vekaletli idari yürütme",
    },
    steps: ["Hizmet", "Bilgiler", "Yükleme & ödeme"],
    summaryTitle: "Özet",
    next: "Devam",
    back: "Geri",
    step2Required: "Zorunlu alanları doldurun.",
    fileRequired: "Yazı dosyası ekleyin.",
  };
}

function formatPln(cents: number): string {
  return `${(cents / 100).toFixed(0)} zł`;
}

export function OrderForm({ locale }: OrderFormProps) {
  const sp = useSearchParams();
  const L = labelsFor(locale);
  const content = getContent(isLocale(locale) ? locale : "tr");
  const preset = sp.get("paket");
  const initialSlug: LetterPackageSlug =
    preset === "aylik-paket" ||
    preset === "surec-yonetimi" ||
    preset === "tek-yazi"
      ? preset
      : "aylik-paket";

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [packageSlug, setPackageSlug] =
    useState<LetterPackageSlug>(initialSlug);
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [nip, setNip] = useState("");
  const [matter, setMatter] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [resultLocale, setResultLocale] = useState<"tr" | "pl" | "en">(
    locale === "pl" || locale === "en" ? locale : "tr",
  );
  const [detectedPages, setDetectedPages] = useState<number | null>(null);
  const [pagesBusy, setPagesBusy] = useState(false);
  const [fileQuota, setFileQuota] = useState(4);
  const [entityType, setEntityType] = useState<EntityType>("sirket");
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
    return surecYonetimiAmountCents(entityType);
  }, [packageSlug, detectedPages, fileQuota, entityType]);

  const summaryAmount =
    packageSlug === "tek-yazi" && step === 3 && (pagesBusy || !files?.length)
      ? "—"
      : packageSlug === "tek-yazi" && step < 3
        ? `${formatPln(tekYaziAmountCents(1))}+`
        : formatPln(amountCents);

  function validateStep2(): boolean {
    if (!fullName.trim() || !email.trim() || !phone.trim() || !matter.trim()) {
      setError(L.step2Required);
      return false;
    }
    const needNip = companyRequiresNip({
      companyName,
      entityType: packageSlug === "surec-yonetimi" ? entityType : undefined,
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
    if (step === 2 && validateStep2()) {
      setStep(3);
    }
  }

  function goBack() {
    setError(null);
    setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!files || files.length === 0) {
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
          companyName: companyName || undefined,
          nip: nipDigits || undefined,
          matter,
          resultLocale,
          email,
          phone,
          notes: notes || undefined,
          fileQuota: packageSlug === "aylik-paket" ? fileQuota : undefined,
          entityType:
            packageSlug === "surec-yonetimi" ? entityType : undefined,
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

      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.set("slotKey", MEKTUP_SLOT);
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
    <form onSubmit={onSubmit} className="lg:grid lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,1fr)_18rem]">
      <div>
        <h1 className={pageTitleClassName("text-3xl")}>{L.title}</h1>

        {message ? (
          <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        ) : null}
        {!canBuyMonthly ? (
          <p className="mt-4 rounded-md border border-pt-emerald-600/30 bg-pt-emerald-50 px-3 py-2 text-sm text-pt-navy-900">
            {L.monthlyBlocked}{" "}
            <a href={`/${locale}/hesabim`} className="font-medium underline">
              /{locale}/hesabim
            </a>
          </p>
        ) : null}

        <div className="mt-6">
          <OrderStepIndicator steps={L.steps} current={step} />
        </div>

        {step === 1 ? (
          <div className="space-y-5">
            <label className={labelClassName}>
              {L.package}
              <select
                className={inputClassName}
                value={packageSlug}
                onChange={(e) =>
                  setPackageSlug(e.target.value as LetterPackageSlug)
                }
                disabled={busy}
              >
                {(Object.keys(L.packages) as LetterPackageSlug[]).map(
                  (slug) => (
                    <option
                      key={slug}
                      value={slug}
                      disabled={slug === "aylik-paket" && !canBuyMonthly}
                    >
                      {L.packages[slug]}
                    </option>
                  ),
                )}
              </select>
            </label>

            {packageSlug === "tek-yazi" ? (
              <p className="rounded-md border border-pt-border bg-pt-bg px-3 py-2 text-sm text-pt-slate-600">
                {L.pagesAuto}
              </p>
            ) : null}

            {packageSlug === "aylik-paket" ? (
              <label className={labelClassName}>
                {L.quota}
                <select
                  className={inputClassName}
                  value={fileQuota}
                  onChange={(e) => setFileQuota(Number(e.target.value))}
                  disabled={busy}
                >
                  {[4, 6, 8, 10, 12].map((n) => (
                    <option key={n} value={n}>
                      {n} — {formatPln(aylikPaketAmountCents(n))}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            {packageSlug === "surec-yonetimi" ? (
              <fieldset className="text-sm">
                <legend className="font-medium text-pt-navy-800">
                  {L.entity}
                </legend>
                <div className="mt-2 flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="entity"
                      checked={entityType === "sirket"}
                      onChange={() => setEntityType("sirket")}
                      disabled={busy}
                    />
                    {L.sirket} ({formatPln(surecYonetimiAmountCents("sirket"))})
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="entity"
                      checked={entityType === "sahis"}
                      onChange={() => setEntityType("sahis")}
                      disabled={busy}
                    />
                    {L.sahis} ({formatPln(surecYonetimiAmountCents("sahis"))})
                  </label>
                </div>
              </fieldset>
            ) : null}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-5">
            <label className={labelClassName}>
              {L.fullName}
              <input
                required
                className={inputClassName}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={busy}
              />
            </label>
            <label className={labelClassName}>
              {L.companyName}
              <input
                className={inputClassName}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                disabled={busy}
              />
            </label>
            <label className={labelClassName}>
              {L.nip}
              <input
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
              {L.matter}
              <input
                required
                className={inputClassName}
                value={matter}
                onChange={(e) => setMatter(e.target.value)}
                disabled={busy}
                placeholder={
                  locale === "pl"
                    ? "ZUS — składki"
                    : locale === "en"
                      ? "ZUS — contributions"
                      : "ZUS — katkı"
                }
              />
            </label>
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
              {L.notes}
              <textarea
                className={inputClassName}
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={busy}
              />
            </label>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-5">
            {packageSlug === "tek-yazi" ? (
              <p className="rounded-md border border-pt-border bg-pt-bg px-3 py-2 text-sm text-pt-slate-600">
                {L.pagesAuto}
                {pagesBusy
                  ? ` — ${L.pagesCounting}`
                  : detectedPages != null
                    ? ` — ${detectedPages} · ${formatPln(tekYaziAmountCents(detectedPages))}`
                    : null}
              </p>
            ) : null}

            <label className={labelClassName}>
              {L.upload}
              <input
                required
                type="file"
                accept=".pdf,image/jpeg,image/png"
                multiple
                className="mt-1 block w-full text-sm"
                onChange={(e) => {
                  setError(null);
                  setFiles(e.target.files);
                }}
                disabled={busy}
              />
            </label>

            <div className="lg:hidden">{summary}</div>

            <button
              type="submit"
              disabled={
                busy ||
                pagesBusy ||
                (packageSlug === "tek-yazi" && detectedPages == null)
              }
              className={`${btnPrimaryClassName} w-full py-3`}
            >
              {busy ? L.paying : L.submit}
            </button>
          </div>
        ) : null}

        {step < 3 ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={goBack}
                disabled={busy}
                className={btnSecondaryClassName}
              >
                {L.back}
              </button>
            ) : null}
            <button
              type="button"
              onClick={goNext}
              disabled={busy}
              className={btnPrimaryClassName}
            >
              {L.next}
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <button
              type="button"
              onClick={goBack}
              disabled={busy}
              className={btnSecondaryClassName}
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
