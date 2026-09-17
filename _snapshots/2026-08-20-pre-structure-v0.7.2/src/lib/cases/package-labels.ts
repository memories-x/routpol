import { formatMoney } from "./money";
import type { CasePricingMeta } from "./types";

const PACKAGE_TR: Record<string, string> = {
  "tek-yazi": "Tek yazı",
  "aylik-paket": "Aylık paket",
  "surec-yonetimi": "Süreç yönetimi",
  "oturum-dosyasi": "Oturum dosyası (eski)",
  "okul-kaydi": "Okul kaydı (eski)",
  "genel-basvuru": "Genel başvuru (eski)",
  "dosya-takibi": "Dosya takibi (eski)",
};

export function packageLabelTr(slug: string): string {
  return PACKAGE_TR[slug] ?? slug;
}

export function formatPricingLine(input: {
  amountCents?: number | null;
  currency?: string | null;
  packageSlug: string;
  pricingMeta?: CasePricingMeta | null;
}): string {
  const money =
    typeof input.amountCents === "number"
      ? formatMoney(input.amountCents, input.currency ?? "pln")
      : "—";
  const bits = [money];
  const meta = input.pricingMeta;
  if (input.packageSlug === "tek-yazi" && typeof meta?.pageCount === "number") {
    bits.push(`${meta.pageCount} sayfa`);
  } else if (
    input.packageSlug === "aylik-paket" &&
    typeof meta?.fileQuota === "number"
  ) {
    bits.push(`${meta.fileQuota} dosya`);
  } else if (input.packageSlug === "surec-yonetimi" && meta?.entityType) {
    bits.push(meta.entityType === "sirket" ? "şirket" : "şahıs");
  }
  return bits.join(" · ");
}
