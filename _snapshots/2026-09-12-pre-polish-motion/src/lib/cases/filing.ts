/** Operatör arşiv / panel satırı için tek satır etiket. */
export function caseFilingLabel(input: {
  companyName?: string;
  fullName: string;
  matter?: string;
}): string {
  const who = (input.companyName?.trim() || input.fullName).trim();
  const matter = input.matter?.trim();
  return matter ? `${who} — ${matter}` : who;
}

/** Yerel klasör adı: 2026-08_Firma_Konu (güvenli karakterler). */
export function caseArchiveFolderName(input: {
  paidAt?: string;
  createdAt: string;
  companyName?: string;
  fullName: string;
  matter?: string;
  caseId: string;
}): string {
  const when = (input.paidAt ?? input.createdAt).slice(0, 7);
  const who = slugPart(input.companyName?.trim() || input.fullName, 40);
  const matter = slugPart(input.matter ?? "genel", 40);
  const shortId = input.caseId.replace(/^case_/, "").slice(0, 8);
  return `${when}_${who}_${matter}_${shortId}`;
}

function slugPart(raw: string, max: number): string {
  const s = raw
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ\- ]+/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, max);
  return s || "kayit";
}
