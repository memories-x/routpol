import { MEKTUP_SLOT } from "./document-slots";
import { sumStoredMektupPages, TEK_YAZI_MAX_PAGES } from "./count-pages";
import { tekYaziAmountCents } from "./pricing";

export type TekYaziPriceResult =
  | {
      ok: true;
      pageCount: number;
      amountCents: number;
    }
  | {
      ok: false;
      code: "NO_DOCS" | "PAGES_MISSING" | "TOO_MANY_PAGES";
      message: string;
    };

/**
 * Tek yazı fiyatı yalnızca yüklenen mektup sayfalarından.
 * Checkout öncesi zorunlu yeniden hesap.
 */
export function resolveTekYaziPriceFromCase(
  record: {
    packageSlug: string;
    documents: Array<{ slotKey: string; pageCount?: number }>;
  },
): TekYaziPriceResult {
  if (record.packageSlug !== "tek-yazi") {
    return { ok: false, code: "NO_DOCS", message: "Not a tek-yazi case" };
  }

  const total = sumStoredMektupPages(record.documents, MEKTUP_SLOT);
  if (total == null) {
    const hasDocs = record.documents.some((d) => d.slotKey === MEKTUP_SLOT);
    return {
      ok: false,
      code: hasDocs ? "PAGES_MISSING" : "NO_DOCS",
      message: hasDocs
        ? "Page count missing on uploaded letter"
        : "Upload the letter first",
    };
  }

  if (total > TEK_YAZI_MAX_PAGES) {
    return {
      ok: false,
      code: "TOO_MANY_PAGES",
      message: `Max ${TEK_YAZI_MAX_PAGES} pages`,
    };
  }

  return {
    ok: true,
    pageCount: total,
    amountCents: tekYaziAmountCents(total),
  };
}
