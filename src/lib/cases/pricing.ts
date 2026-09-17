import type { LetterPackageSlug } from "./document-slots";
import type { CasePricingMeta, EntityType } from "./types";
import { parseCallRequestedAt } from "./call-schedule";

export {
  parseCallRequestedAt,
  datetimeLocalMinWarsaw as datetimeLocalMin,
  formatCallSlot,
  formatCallSlotTr,
  callTzHint,
  CALL_TIME_ZONE,
  toWarsawDatetimeLocal,
} from "./call-schedule";

export function getPackageCurrency(): string {
  return (process.env.PACKAGE_CURRENCY ?? "pln").toLowerCase();
}

/** Tek yazı: first 2 pages 50 zł, each extra page +25 zł (grosz). */
export function tekYaziAmountCents(pageCount: number): number {
  const pages = Math.max(1, Math.min(20, Math.floor(pageCount)));
  if (pages <= 2) return 5000;
  return 5000 + (pages - 2) * 2500;
}

/** Aylık okuma: 40 zł × fileQuota, minimum 4. */
export function aylikPaketAmountCents(fileQuota: number): number {
  const q = Math.max(4, Math.min(24, Math.floor(fileQuota)));
  return q * 4000;
}

/** Aylık paket aşım — ek yazı başına 40 zł. */
export function aylikOverageAmountCents(): number {
  return 4000;
}

/** Vekaletli süreç: şahıs 650 zł / şirket 1 200 zł. */
export function surecYonetimiAmountCents(entity: EntityType): number {
  return entity === "sirket" ? 120000 : 65000;
}

/** Saatlik telefon görüşmesi — 150 zł / 1 saat. */
export function telefonGorusmeAmountCents(): number {
  return 15000;
}

/** Yerinde eşlik — yarı gün (≈3–4 saat, 1 kurum); şehir dışı ulaşım ayrıca. */
export function yerindeEslikAmountCents(): number {
  return 45000;
}

export function getAmountCentsForMeta(
  slug: LetterPackageSlug,
  meta: CasePricingMeta,
): number {
  if (slug === "tek-yazi") {
    return tekYaziAmountCents(meta.pageCount ?? 2);
  }
  if (slug === "aylik-paket") {
    return aylikPaketAmountCents(meta.fileQuota ?? 4);
  }
  if (slug === "telefon-gorusme") {
    return telefonGorusmeAmountCents();
  }
  if (slug === "yerinde-eslik") {
    return yerindeEslikAmountCents();
  }
  return surecYonetimiAmountCents(meta.entityType ?? "sahis");
}

/** @deprecated use getAmountCentsForMeta — fixed amount without meta */
export function getPackageAmountCents(
  slug: string,
  meta?: CasePricingMeta | null,
): number {
  if (
    slug === "tek-yazi" ||
    slug === "aylik-paket" ||
    slug === "surec-yonetimi" ||
    slug === "telefon-gorusme" ||
    slug === "yerinde-eslik"
  ) {
    return getAmountCentsForMeta(slug, meta ?? {});
  }
  return 0;
}

export function getStripePriceId(_slug: string): string | null {
  return null;
}

export function productNameFor(
  slug: LetterPackageSlug,
  meta: CasePricingMeta,
  locale = "tr",
): string {
  if (slug === "tek-yazi") {
    const p = meta.pageCount ?? 2;
    if (locale === "pl") return `ROUTEPOL — Jedno pismo (${p} str.)`;
    if (locale === "en") return `ROUTEPOL — Single letter (${p} pages)`;
    return `ROUTEPOL — Tek yazı (${p} sayfa)`;
  }
  if (slug === "aylik-paket") {
    const q = meta.fileQuota ?? 4;
    if (locale === "pl") return `ROUTEPOL — Pakiet miesięczny (${q} plików)`;
    if (locale === "en") return `ROUTEPOL — Monthly package (${q} files)`;
    return `ROUTEPOL — Aylık mektup paketi (${q} dosya)`;
  }
  if (slug === "telefon-gorusme") {
    if (locale === "pl") return "ROUTEPOL — Konsultacja telefoniczna (1 godz.)";
    if (locale === "en") return "ROUTEPOL — Phone consultation (1 hour)";
    return "ROUTEPOL — Telefon görüşmesi (1 saat)";
  }
  if (slug === "yerinde-eslik") {
    const city = meta.city?.trim();
    if (locale === "pl") {
      return city
        ? `ROUTEPOL — Towarzyszenie na miejscu (${city})`
        : "ROUTEPOL — Towarzyszenie na miejscu (pół dnia)";
    }
    if (locale === "en") {
      return city
        ? `ROUTEPOL — On-site accompaniment (${city})`
        : "ROUTEPOL — On-site accompaniment (half day)";
    }
    return city
      ? `ROUTEPOL — Yerinde eşlik (${city})`
      : "ROUTEPOL — Yerinde eşlik (yarı gün)";
  }
  const e = meta.entityType === "sirket" ? "şirket" : "şahıs";
  if (locale === "pl") {
    return `ROUTEPOL — Pełnomocnictwo (${meta.entityType === "sirket" ? "firma" : "osoba"})`;
  }
  if (locale === "en") {
    return `ROUTEPOL — POA process (${meta.entityType === "sirket" ? "company" : "individual"})`;
  }
  return `ROUTEPOL — Vekaletli süreç (${e})`;
}

export function normalizePricingMeta(
  slug: LetterPackageSlug,
  raw: Partial<CasePricingMeta> | undefined,
): CasePricingMeta | { error: string } {
  if (slug === "tek-yazi") {
    void raw;
    return { pageCount: 1, pagesFromUpload: false };
  }
  if (slug === "aylik-paket") {
    const fileQuota = Number(raw?.fileQuota ?? 4);
    if (
      !Number.isFinite(fileQuota) ||
      fileQuota < 4 ||
      fileQuota > 24 ||
      fileQuota % 2 !== 0
    ) {
      return { error: "fileQuota must be even 4–24" };
    }
    return { fileQuota: Math.floor(fileQuota) };
  }
  if (slug === "telefon-gorusme") {
    const callRequestedAt = parseCallRequestedAt(raw?.callRequestedAt);
    if (typeof callRequestedAt !== "string") return callRequestedAt;
    const entityType = raw?.entityType;
    if (entityType !== "sahis" && entityType !== "sirket") {
      return { error: "entityType must be sahis or sirket" };
    }
    return { callRequestedAt, entityType };
  }
  if (slug === "yerinde-eslik") {
    const city = typeof raw?.city === "string" ? raw.city.trim() : "";
    if (city.length < 2 || city.length > 80) {
      return { error: "city required (2–80 chars)" };
    }
    const entityType = raw?.entityType;
    if (entityType !== "sahis" && entityType !== "sirket") {
      return { error: "entityType must be sahis or sirket" };
    }
    return { city, entityType };
  }
  const entityType = raw?.entityType;
  if (entityType !== "sahis" && entityType !== "sirket") {
    return { error: "entityType must be sahis or sirket" };
  }
  return { entityType };
}
