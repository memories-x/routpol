export type LetterPackageSlug =
  | "tek-yazi"
  | "aylik-paket"
  | "surec-yonetimi";

/** Archived — keep for old case records on disk */
export type LegacyPackageSlug =
  | "oturum-dosyasi"
  | "okul-kaydi"
  | "genel-basvuru"
  | "dosya-takibi";

export type PackageSlug = LetterPackageSlug | LegacyPackageSlug;

export type DocumentSlotDef = {
  key: string;
  labelTr: string;
  labelPl: string;
  labelEn: string;
  required: boolean;
  maxFiles: number;
  /** Customer uploads before pay vs operator deliverable after pay */
  role: "customer" | "operator";
};

export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const ALLOWED_MIME = [
  "application/pdf",
  "image/jpeg",
  "image/png",
] as const;

export const MEKTUP_SLOT = "mektup";
export const SONUC_SLOT = "sonuc";

const mektupSlot: DocumentSlotDef = {
  key: MEKTUP_SLOT,
  labelTr: "Resmi yazı (fotoğraf / PDF)",
  labelPl: "Pismo urzędowe (zdjęcie / PDF)",
  labelEn: "Official letter (photo / PDF)",
  required: true,
  maxFiles: 4,
  role: "customer",
};

const sonucSlot: DocumentSlotDef = {
  key: SONUC_SLOT,
  labelTr: "Sonuç (PL / EN / TR özet)",
  labelPl: "Wynik (streszczenie PL / EN / TR)",
  labelEn: "Result (PL / EN / TR summary)",
  required: false,
  maxFiles: 4,
  role: "operator",
};

const letterPackageSlots: DocumentSlotDef[] = [mektupSlot, sonucSlot];

const legacyEmpty: DocumentSlotDef[] = [];

export const documentSlotsByPackage: Record<PackageSlug, DocumentSlotDef[]> = {
  "tek-yazi": letterPackageSlots,
  "aylik-paket": letterPackageSlots,
  "surec-yonetimi": letterPackageSlots,
  "oturum-dosyasi": legacyEmpty,
  "okul-kaydi": legacyEmpty,
  "genel-basvuru": legacyEmpty,
  "dosya-takibi": legacyEmpty,
};

export type TrackingMode = "self-apply" | "with-poa";

export function isTrackingMode(v: string): v is TrackingMode {
  return v === "self-apply" || v === "with-poa";
}

export const letterPackageSlugs: LetterPackageSlug[] = [
  "tek-yazi",
  "aylik-paket",
  "surec-yonetimi",
];

/** Public checkout products */
export const checkoutablePackageSlugs: LetterPackageSlug[] = [
  ...letterPackageSlugs,
];

export function isLetterPackage(value: string): value is LetterPackageSlug {
  return (letterPackageSlugs as string[]).includes(value);
}

export function isPackageSlug(value: string): value is PackageSlug {
  return value in documentSlotsByPackage;
}

export function isCheckoutablePackage(
  value: string,
): value is LetterPackageSlug {
  return isLetterPackage(value);
}

/** Customer must upload mektup before pay */
export function packageRequiresDocumentUploads(slug: string): boolean {
  return isLetterPackage(slug);
}

export function isSubscriptionPackage(_value: string): boolean {
  return false;
}

/** @deprecated alias */
export type PayablePackageSlug = LetterPackageSlug;
export const payablePackageSlugs = letterPackageSlugs;

export function customerSlotsFor(slug: PackageSlug): DocumentSlotDef[] {
  return (documentSlotsByPackage[slug] ?? []).filter(
    (s) => s.role === "customer",
  );
}

export function operatorSlotsFor(slug: PackageSlug): DocumentSlotDef[] {
  return (documentSlotsByPackage[slug] ?? []).filter(
    (s) => s.role === "operator",
  );
}

export function slotLabel(slot: DocumentSlotDef, locale: string): string {
  if (locale === "pl") return slot.labelPl;
  if (locale === "en") return slot.labelEn;
  return slot.labelTr;
}

/** Kept for legacy imports — unused for letter packages */
export const poaVekaletSlot: DocumentSlotDef = {
  key: "vekalet",
  labelTr: "Vekaletname",
  labelPl: "Pełnomocnictwo",
  labelEn: "Power of attorney",
  required: true,
  maxFiles: 2,
  role: "customer",
};

export function slotsForDosyaTakibi(_mode: TrackingMode): DocumentSlotDef[] {
  return [];
}
