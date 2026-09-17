"use client";

import { CaseStatusSteps } from "@/components/customer/CaseStatusSteps";
import { CustomerMembershipGate } from "@/components/customer/CustomerMembershipGate";
import { PortalCaseTable } from "@/components/customer/PortalCaseTable";
import { Card } from "@/components/ui/Card";
import {
  groupHistoryByYear,
  historyCases,
  splitPortfolio,
} from "@/lib/customer-portal/portfolio-buckets";
import { getContent } from "@/content";
import { isLocale } from "@/lib/i18n";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Profile = {
  email: string;
  fullName: string;
  phone: string;
  companyName: string | null;
  nip: string | null;
  entityType: string | null;
  preferredResultLocale: string | null;
};

type Period = {
  id: string;
  quota: number;
  usedCount: number;
  overageCredits: number;
  remaining: number;
  periodStart: string;
  periodEnd: string;
};

type Summary = {
  inProgress: number;
  ready: number;
  total: number;
  periodRemaining: number | null;
};

type CaseRow = {
  id: string;
  packageSlug: string;
  status: string;
  matter: string | null;
  updatedAt: string;
  createdAt?: string;
  accessToken: string;
  locale: string;
  hasResult: boolean;
  hasLetter?: boolean;
  amountCents?: number;
  currency?: string;
  callRequestedAt?: string | null;
};

type MeData = {
  profile: Profile;
  activePeriod: Period | null;
  queuedPeriod: Period | null;
  canBuyMonthly: boolean;
  summary: Summary;
  cases: CaseRow[];
};

function labels(locale: string) {
  const tr = {
    title: "Hesabınız",
    loginTitle: "Hesabınız",
    loginLead:
      "E-posta ve şifre. Bireysel veya kurumsal üyelik.",
    email: "E-posta",
    sendLink: "Link gönder",
    sending: "Gönderiliyor…",
    sent: "Bu e-postada ödeme varsa link gitti. Tek dosya linkiniz ayrı mailde durur.",
    verify: "Giriş yapılıyor…",
    verifyFail: "Link süresi doldu veya kullanıldı.",
    logout: "Çıkış",
    summary: "Özet",
    summaryLine: (s: Summary) =>
      `${s.inProgress} işleniyor · ${s.ready} hazır · ${s.total} dosya` +
      (s.periodRemaining != null ? ` · ${s.periodRemaining} yazı hakkı` : ""),
    profile: "Profil",
    editProfile: "Profili düzenle",
    saveProfile: "Kaydet",
    saving: "Kaydediliyor…",
    saved: "Profil güncellendi.",
    newApply: "Yeni başvuru",
    renewPack: "Aylık paketi yenile",
    period: "Aylık paket",
    used: "Kullanılan",
    remaining: "Kalan",
    until: "Bitiş",
    upload: "Yazı yükle",
    uploading: "Yükleniyor…",
    overage: "Kota doldu — ek yazı için 40 zł",
    payOverage: "40 zł öde ve yükle",
    allCases: "Tüm kayıtlar",
    openWork: "Açık işler",
    readyWork: "Hazır teslimatlar",
    archiveWork: "Arşiv — kapanan işler",
    emptyOpen: "Açık iş yok.",
    emptyReady: "Hazır dosya yok.",
    emptyArchive: "Arşiv boş.",
    historyTitle: "Geçmiş işler",
    historyLead:
      "Teslim edilen işler yıl yıl durur. Aç ile aynı dosyayı yeniden indirirsiniz.",
    emptyHistory: "Henüz teslim edilmiş iş yok.",
    deskLead:
      "Profiliniz, satın al ve işleriniz. Tek yazı da burada kalır.",
    buyTitle: "Satın al",
    buyLead: "Paket ve hizmet — her zaman bu sayfadan.",
    buyCta: "Satın al",
    skuTek: "Tek yazı",
    skuTekBody: "Bir resmi yazı: dilde açıklama, sonraki adım.",
    skuTekPrice: "50 zł’den",
    skuAylik: "Aylık idari takip",
    skuAylikBody: "Ay boyunca gelen yazılar; kota net.",
    skuAylikPrice: "160 zł’den / ay",
    skuSurec: "Vekaletli idari yürütme",
    skuSurecBody: "Noter idari vekaletiyle evrak ve randevu koordinasyonu.",
    skuSurecPrice: "650 zł’den / ay",
    openCase: "Aç / indir",
    noPeriod: "Aktif aylık paket yok.",
    queued:
      "Sonraki dönem kuyrukta — mevcut paket bitince otomatik başlar.",
    renewHint: "Yeni dönem için paket satın alın — bilgileriniz hazır dolacak.",
    statusReady: "Hazır",
    statusProgress: "İşleniyor",
    statusPaid: "Ödendi",
    statusClosed: "Tamamlandı",
    fullName: "Ad Soyad",
    phone: "Telefon",
    company: "Firma",
    nip: "NIP",
    caseProgress: "Aktif dosya durumu",
    tableMatter: "Konu",
    tableDate: "Tarih",
    tableStatus: "Durum",
    tableAction: "Aç",
    tableAmount: "Tutar",
    noCases: "Henüz dosya yok. Yeni başvuru ile başlayın.",
  };
  if (locale === "pl") {
    return {
      ...tr,
      title: "Wasze konto",
      loginTitle: "Wasze konto",
      loginLead: "E-mail i hasło. Konto indywidualne lub firmowe.",
      sendLink: "Wyślij link",
      sent: "Jeśli ten e-mail ma płatność — link wyszedł. Osobny link do jednej sprawy jest też na e-mailu.",
      summary: "Podsumowanie",
      summaryLine: (s: Summary) =>
        `${s.inProgress} w toku · ${s.ready} gotowe · ${s.total} spraw` +
        (s.periodRemaining != null ? ` · ${s.periodRemaining} pism` : ""),
      profile: "Profil",
      editProfile: "Edytuj profil",
      saveProfile: "Zapisz",
      queued:
        "Następny okres w kolejce — zacznie się po zakończeniu bieżącego.",
      logout: "Wyloguj",
      renewPack: "Odśwież pakiet miesięczny",
      allCases: "Wszystkie sprawy",
      openWork: "Sprawy otwarte",
      readyWork: "Gotowe wyniki",
      archiveWork: "Archiwum — zamknięte",
      emptyOpen: "Brak otwartych spraw.",
      emptyReady: "Brak gotowych plików.",
      emptyArchive: "Archiwum puste.",
      historyTitle: "Historia spraw",
      historyLead:
        "Dostarczone sprawy według roku. Otwórz — ten sam plik do pobrania.",
      emptyHistory: "Brak dostarczonych spraw.",
      deskLead:
        "Profil, zakup i sprawy. Także pojedyncze pismo zostaje tu.",
      buyTitle: "Kup",
      buyLead: "Pakiety i usługi — zawsze z tej strony.",
      buyCta: "Kup",
      skuTek: "Jedno pismo",
      skuTekBody: "Jedno pismo urzędowe: streszczenie, następny krok.",
      skuTekPrice: "od 50 zł",
      skuAylik: "Miesięczna opieka administracyjna",
      skuAylikBody: "Pisma w ciągu miesiąca; limit jasny.",
      skuAylikPrice: "od 160 zł / mc",
      skuSurec: "Pełnomocnictwo administracyjne",
      skuSurecBody: "Koordynacja pism i wizyt z pełnomocnictwem notarialnym.",
      skuSurecPrice: "od 650 zł / mc",
      renewHint: "Nowy okres — kup pakiet; dane uzupełnią się same.",
      caseProgress: "Status bieżącej sprawy",
      tableMatter: "Temat",
      tableDate: "Aktualizacja",
      tableStatus: "Status",
      tableAction: "Otwórz",
      noCases: "Brak spraw. Zacznij od nowego wniosku.",
    };
  }
  if (locale === "en") {
    return {
      ...tr,
      title: "Your account",
      loginTitle: "Your account",
      loginLead: "Email and password. Individual or company account.",
      sendLink: "Send link",
      sent: "If this email has a payment, the link was sent. Your single-case link is also in email separately.",
      summary: "Summary",
      summaryLine: (s: Summary) =>
        `${s.inProgress} in progress · ${s.ready} ready · ${s.total} cases` +
        (s.periodRemaining != null ? ` · ${s.periodRemaining} letters left` : ""),
      profile: "Profile",
      editProfile: "Edit profile",
      saveProfile: "Save",
      queued: "Next period is queued — it starts when the current one ends.",
      logout: "Sign out",
      renewPack: "Renew monthly package",
      allCases: "All cases",
      openWork: "Open work",
      readyWork: "Ready deliveries",
      archiveWork: "Archive — closed",
      emptyOpen: "No open work.",
      emptyReady: "No ready files.",
      emptyArchive: "Archive is empty.",
      historyTitle: "Work history",
      historyLead:
        "Delivered jobs by year. Open re-downloads the same file.",
      emptyHistory: "No delivered work yet.",
      deskLead:
        "Profile, purchase and jobs. A one-off letter stays here too.",
      buyTitle: "Buy",
      buyLead: "Packages and services — always from this page.",
      buyCta: "Buy",
      skuTek: "Single letter",
      skuTekBody: "One official letter: summary, next step.",
      skuTekPrice: "from 50 zł",
      skuAylik: "Monthly admin tracking",
      skuAylikBody: "Letters through the month; quota is clear.",
      skuAylikPrice: "from 160 zł / mo",
      skuSurec: "Mandate admin track",
      skuSurecBody: "Papers and appointments with a notarial admin POA.",
      skuSurecPrice: "from 650 zł / mo",
      renewHint: "New period — buy a package; your details pre-fill.",
      caseProgress: "Active case status",
      tableMatter: "Subject",
      tableDate: "Updated",
      tableStatus: "Status",
      tableAction: "Open",
      noCases: "No cases yet. Start with a new application.",
    };
  }
  return tr;
}

export function CustomerPortalApp({ locale }: { locale: string }) {
  const L = labels(locale);
  const sp = useSearchParams();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [me, setMe] = useState<MeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    companyName: "",
    nip: "",
    entityType: "sirket" as "sahis" | "sirket",
    preferredResultLocale: "tr" as "tr" | "pl" | "en",
  });

  const loadMe = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/customer/me");
      const json = await res.json();
      if (json.success) {
        setMe(json.data);
        const pr = json.data.profile as Profile;
        setForm({
          fullName: pr.fullName,
          phone: pr.phone,
          companyName: pr.companyName ?? "",
          nip: pr.nip ?? "",
          entityType:
            pr.entityType === "sahis" || pr.entityType === "sirket"
              ? pr.entityType
              : "sirket",
          preferredResultLocale:
            pr.preferredResultLocale === "pl" ||
            pr.preferredResultLocale === "en"
              ? pr.preferredResultLocale
              : "tr",
        });
      } else {
        setMe(null);
      }
    } catch {
      setMe(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMe();
  }, [loadMe]);

  useEffect(() => {
    const token = sp.get("t");
    if (!token) return;
    let cancelled = false;
    setBusy(true);
    setMessage(L.verify);
    void (async () => {
      try {
        const res = await fetch("/api/customer/login/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const json = await res.json();
        if (cancelled) return;
        if (json.success) {
          router.replace(`/${locale}/hesabim`);
          await loadMe();
          setMessage(null);
        } else {
          setError(L.verifyFail);
        }
      } catch {
        if (!cancelled) setError(L.verifyFail);
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sp, locale, router, loadMe, L.verify, L.verifyFail]);

  async function logout() {
    await fetch("/api/customer/logout", { method: "POST" });
    setMe(null);
    setEditing(false);
  }

  async function saveProfile() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/customer/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          companyName: form.companyName || undefined,
          nip: form.nip || undefined,
          entityType: form.entityType,
          preferredResultLocale: form.preferredResultLocale,
        }),
      });
      const json = await res.json();
      if (json.success) {
        await loadMe();
        setEditing(false);
        setMessage(L.saved);
      } else {
        setError(json.error?.message ?? "Error");
      }
    } catch {
      setError("Error");
    } finally {
      setBusy(false);
    }
  }

  async function uploadLetter() {
    if (!me?.activePeriod || !file) return;
    setError(null);
    setBusy(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("locale", locale);
      const res = await fetch(
        `/api/customer/periods/${me.activePeriod.id}/letters`,
        { method: "POST", body: fd },
      );
      const json = await res.json();
      if (json.success) {
        setFile(null);
        await loadMe();
        setMessage(
          locale === "pl"
            ? "Pismo dodane."
            : locale === "en"
              ? "Letter uploaded."
              : "Yazı yüklendi.",
        );
      } else if (json.error?.code === "OVERAGE_REQUIRED") {
        setError(L.overage);
      } else {
        setError(json.error?.message ?? "Error");
      }
    } catch {
      setError("Error");
    } finally {
      setBusy(false);
    }
  }

  async function payOverage() {
    if (!me?.activePeriod) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/customer/periods/${me.activePeriod.id}/overage-checkout`,
        { method: "POST" },
      );
      const json = await res.json();
      if (json.success && json.data.checkoutUrl) {
        window.location.href = json.data.checkoutUrl;
        return;
      }
      if (json.success && json.data.devPaid) {
        await loadMe();
        setMessage(
          locale === "pl"
            ? "Dopłata (dev)."
            : locale === "en"
              ? "Overage paid (dev)."
              : "Aşım ödendi (dev).",
        );
      } else {
        setError(json.error?.message ?? "Error");
      }
    } catch {
      setError("Error");
    } finally {
      setBusy(false);
    }
  }

  if (loading && !me) {
    return <p className="text-pt-slate-600">…</p>;
  }

  if (!me) {
    return (
      <CustomerMembershipGate locale={locale} onAuthed={loadMe} />
    );
  }

  const p = me.profile;
  const period = me.activePeriod;
  const cases = Array.isArray(me.cases) ? me.cases : [];
  const buckets = splitPortfolio(cases);
  const delivered = historyCases(cases);
  const historyYears = groupHistoryByYear(delivered);
  const summary = me.summary ?? {
    inProgress: 0,
    ready: 0,
    total: cases.length,
    periodRemaining: period?.remaining ?? null,
  };
  const portalContent = getContent(isLocale(locale) ? locale : "tr");
  const featured =
    cases.find((c) => c.status === "in_progress") ??
    cases.find((c) => !c.hasResult && c.status !== "closed") ??
    cases[0] ??
    null;
  const tableL = {
    matter: L.tableMatter,
    date: L.tableDate,
    status: L.tableStatus,
    action: L.openCase,
    statusReady: L.statusReady,
    statusProgress: L.statusProgress,
    statusPaid: L.statusPaid,
    statusClosed: L.statusClosed,
    amount: L.tableAmount,
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-pt-navy-900 md:text-3xl">
            {L.title}
          </h1>
          <p className="mt-1 text-sm text-pt-slate-600">{p.email}</p>
          <p className="mt-2 max-w-xl text-sm text-pt-slate-600">{L.deskLead}</p>
        </div>
        <button
          type="button"
          onClick={() => void logout()}
          className="text-sm text-pt-slate-600 underline"
        >
          {L.logout}
        </button>
      </div>

      <Card className="border-pt-emerald-600/30 bg-pt-emerald-50/40">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-pt-emerald-700">
          {L.summary}
        </h2>
        <p className="mt-2 text-lg font-light text-pt-navy-900">
          {L.summaryLine(summary)}
        </p>
      </Card>

      <section>
        <h2 className="text-lg font-semibold text-pt-navy-900">{L.buyTitle}</h2>
        <p className="mt-1 text-sm text-pt-slate-600">{L.buyLead}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {(
            [
              {
                slug: "tek-yazi",
                title: L.skuTek,
                body: L.skuTekBody,
                price: L.skuTekPrice,
              },
              {
                slug: "aylik-paket",
                title: L.skuAylik,
                body: L.skuAylikBody,
                price: L.skuAylikPrice,
              },
              {
                slug: "surec-yonetimi",
                title: L.skuSurec,
                body: L.skuSurecBody,
                price: L.skuSurecPrice,
              },
            ] as const
          ).map((sku) => (
            <Card key={sku.slug}>
              <h3 className="font-semibold text-pt-navy-900">{sku.title}</h3>
              <p className="mt-2 text-sm text-pt-slate-600">{sku.body}</p>
              <p className="mt-3 text-sm font-medium text-pt-navy-800">
                {sku.price}
              </p>
              <Link
                href={`/${locale}/basvuru?paket=${sku.slug}`}
                className="mt-4 inline-block rounded-md bg-pt-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-pt-emerald-500"
              >
                {L.buyCta}
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {featured ? (
        <Card className="border-pt-emerald-600/25">
          <h2 className="text-lg font-semibold text-pt-navy-900">
            {L.caseProgress}
          </h2>
          <p className="mt-1 text-sm text-pt-slate-600">
            {featured.matter ?? featured.packageSlug}
          </p>
          <CaseStatusSteps
            steps={portalContent.portalSteps.steps}
            status={featured.status}
            hasResult={featured.hasResult}
            paid={
              featured.status !== "awaiting_payment" &&
              featured.status !== "draft"
            }
          />
        </Card>
      ) : null}

      <section>
        <h2 className="text-lg font-semibold text-pt-navy-900">{L.openWork}</h2>
        <PortalCaseTable
          cases={buckets.open}
          locale={locale}
          labels={{ ...tableL, empty: L.emptyOpen }}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-pt-navy-900">{L.historyTitle}</h2>
        <p className="mt-1 max-w-2xl text-sm text-pt-slate-600">{L.historyLead}</p>
        {historyYears.length === 0 ? (
          <PortalCaseTable
            cases={[]}
            locale={locale}
            labels={{ ...tableL, empty: L.emptyHistory }}
          />
        ) : (
          historyYears.map((group) => (
            <div key={group.year} className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-pt-slate-500">
                {group.year}
              </h3>
              <PortalCaseTable
                cases={group.rows}
                locale={locale}
                labels={{ ...tableL, empty: L.emptyHistory }}
              />
            </div>
          ))
        )}
      </section>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-pt-navy-900">{L.profile}</h2>
          {!editing ? (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-sm font-medium text-pt-emerald-600 underline"
            >
              {L.editProfile}
            </button>
          ) : null}
        </div>
        {editing ? (
          <form
            className="mt-4 space-y-3 text-sm"
            onSubmit={(e) => {
              e.preventDefault();
              void saveProfile();
            }}
          >
            <label className="block">
              {L.fullName}
              <input
                required
                value={form.fullName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, fullName: e.target.value }))
                }
                className="mt-1 w-full rounded-md border border-pt-border px-3 py-2"
              />
            </label>
            <label className="block">
              {L.phone}
              <input
                required
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="mt-1 w-full rounded-md border border-pt-border px-3 py-2"
              />
            </label>
            <label className="block">
              {L.company}
              <input
                value={form.companyName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, companyName: e.target.value }))
                }
                className="mt-1 w-full rounded-md border border-pt-border px-3 py-2"
              />
            </label>
            <label className="block">
              {L.nip}
              <input
                value={form.nip}
                onChange={(e) =>
                  setForm((f) => ({ ...f, nip: e.target.value }))
                }
                className="mt-1 w-full rounded-md border border-pt-border px-3 py-2"
              />
            </label>
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="submit"
                disabled={busy}
                className="rounded-md bg-pt-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-pt-emerald-500 disabled:opacity-60"
              >
                {busy ? L.saving : L.saveProfile}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="rounded-md border border-pt-border px-3 py-1.5 text-sm font-semibold text-pt-navy-800 hover:bg-pt-bg disabled:opacity-60"
              >
                {locale === "pl" ? "Anuluj" : locale === "en" ? "Cancel" : "İptal"}
              </button>
            </div>
          </form>
        ) : (
          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-pt-slate-500">{L.fullName}</dt>
              <dd>{p.fullName}</dd>
            </div>
            <div>
              <dt className="text-pt-slate-500">{L.phone}</dt>
              <dd>{p.phone}</dd>
            </div>
            {p.companyName ? (
              <div>
                <dt className="text-pt-slate-500">{L.company}</dt>
                <dd>{p.companyName}</dd>
              </div>
            ) : null}
          </dl>
        )}
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-pt-navy-900">{L.period}</h2>
        {period ? (
          <>
            <p className="mt-2 text-sm text-pt-slate-700">
              {L.used}: {period.usedCount} / {period.quota}
              {period.overageCredits > 0
                ? ` (+${period.overageCredits})`
                : ""}{" "}
              · {L.remaining}: {period.remaining}
            </p>
            <p className="text-sm text-pt-slate-500">
              {L.until}:{" "}
              {new Date(period.periodEnd).toLocaleDateString(locale)}
            </p>
            {me.queuedPeriod ? (
              <p className="mt-2 text-sm text-pt-emerald-800">
                {L.queued}{" "}
                {new Date(me.queuedPeriod.periodStart).toLocaleDateString(
                  locale,
                )}
              </p>
            ) : null}
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <label className="block text-sm">
                {L.upload}
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="mt-1 block text-sm"
                />
              </label>
              <button
                type="button"
                disabled={busy || !file || period.remaining <= 0}
                onClick={() => void uploadLetter()}
                className="rounded-md bg-pt-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-pt-emerald-500 disabled:opacity-60"
              >
                {busy ? L.uploading : L.upload}
              </button>
              {period.remaining <= 0 ? (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void payOverage()}
                  className="rounded-md border border-pt-border px-3 py-1.5 text-sm font-semibold text-pt-navy-800 hover:bg-pt-bg disabled:opacity-60"
                >
                  {L.payOverage}
                </button>
              ) : null}
            </div>
          </>
        ) : (
          <div className="mt-2">
            <p className="text-sm text-pt-slate-600">{L.noPeriod}</p>
            {me.queuedPeriod ? (
              <p className="mt-1 text-sm text-pt-emerald-800">
                {L.queued}{" "}
                {new Date(me.queuedPeriod.periodStart).toLocaleDateString(
                  locale,
                )}
              </p>
            ) : (
              <p className="mt-1 text-sm text-pt-slate-500">{L.renewHint}</p>
            )}
            {me.canBuyMonthly !== false ? (
              <Link
                href={`/${locale}/basvuru?paket=aylik-paket`}
                className="mt-4 inline-block rounded-md bg-pt-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-pt-emerald-500"
              >
                {L.renewPack}
              </Link>
            ) : null}
          </div>
        )}
      </Card>

      {message ? (
        <p className="text-sm text-pt-emerald-700">{message}</p>
      ) : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
