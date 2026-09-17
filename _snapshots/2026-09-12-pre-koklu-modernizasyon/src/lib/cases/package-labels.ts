import { formatMoney } from "./money";
import { formatCallSlotTr } from "./call-schedule";
import type { CasePricingMeta } from "./types";

const PACKAGE_TR: Record<string, string> = {
  "tek-yazi": "Tek yazı",
  "aylik-paket": "Aylık paket",
  "surec-yonetimi": "Süreç yönetimi",
  "telefon-gorusme": "Telefon görüşmesi (1 saat)",
  "oturum-dosyasi": "Oturum dosyası (eski)",
  "okul-kaydi": "Okul kaydı (eski)",
  "genel-basvuru": "Genel başvuru (eski)",
  "dosya-takibi": "Dosya takibi (eski)",
};

export function packageLabelTr(slug: string): string {
  return PACKAGE_TR[slug] ?? slug;
}

export { formatCallSlotTr, formatCallSlot } from "./call-schedule";

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
  } else if (
    input.packageSlug === "surec-yonetimi" &&
    meta?.entityType
  ) {
    bits.push(meta.entityType === "sirket" ? "şirket" : "şahıs");
  } else if (input.packageSlug === "telefon-gorusme") {
    bits.push("1 saat");
    if (meta?.entityType) {
      bits.push(meta.entityType === "sirket" ? "şirket" : "şahıs");
    }
    if (meta?.callRequestedAt) {
      bits.push(formatCallSlotTr(meta.callRequestedAt));
    }
  }
  return bits.join(" · ");
}
