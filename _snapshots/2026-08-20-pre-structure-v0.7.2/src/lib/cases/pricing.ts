import type { LetterPackageSlug } from "./document-slots";
import type { CasePricingMeta, EntityType } from "./types";

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
  return surecYonetimiAmountCents(meta.entityType ?? "sahis");
}

/** @deprecated use getAmountCentsForMeta — fixed amount without meta */
export function getPackageAmountCents(
  slug: string,
  meta?: CasePricingMeta | null,
): number {
  if (slug === "tek-yazi" || slug === "aylik-paket" || slug === "surec-yonetimi") {
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
    if (locale === "pl") return `POL-TURK — Jedno pismo (${p} str.)`;
    if (locale === "en") return `POL-TURK — Single letter (${p} pages)`;
    return `POL-TURK — Tek yazı (${p} sayfa)`;
  }
  if (slug === "aylik-paket") {
    const q = meta.fileQuota ?? 4;
    if (locale === "pl") return `POL-TURK — Pakiet miesięczny (${q} plików)`;
    if (locale === "en") return `POL-TURK — Monthly package (${q} files)`;
    return `POL-TURK — Aylık mektup paketi (${q} dosya)`;
  }
  const e = meta.entityType === "sirket" ? "şirket" : "şahıs";
  if (locale === "pl") {
    return `POL-TURK — Pełnomocnictwo (${meta.entityType === "sirket" ? "firma" : "osoba"})`;
  }
  if (locale === "en") {
    return `POL-TURK — POA process (${meta.entityType === "sirket" ? "company" : "individual"})`;
  }
  return `POL-TURK — Vekaletli süreç (${e})`;
}

export function normalizePricingMeta(
  slug: LetterPackageSlug,
  raw: Partial<CasePricingMeta> | undefined,
): CasePricingMeta | { error: string } {
  if (slug === "tek-yazi") {
    // Client pageCount ignored — upload/checkout measure from file.
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
  const entityType = raw?.entityType;
  if (entityType !== "sahis" && entityType !== "sirket") {
    return { error: "entityType must be sahis or sirket" };
  }
  return { entityType };
}
