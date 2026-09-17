import type { PackageSlug } from "./document-slots";
import type { CaseChecklistItem, CaseStatus } from "./types";

const TEMPLATES: Record<string, Array<{ key: string; label: string }>> = {
  "tek-yazi": [
    { key: "letter_downloaded", label: "Mektup indirildi" },
    { key: "lang_page_check", label: "Dil / sayfa kontrolü" },
    { key: "result_uploaded", label: "Sonuç üretildi / yüklendi" },
    { key: "customer_notified", label: "Müşteri bilgilendirildi" },
  ],
  "aylik-paket": [
    { key: "matter_clear", label: "Takip konusu net" },
    { key: "period_check", label: "Dönem kontrolü yapıldı" },
    { key: "summary_shared", label: "Özet müşteri dilinde paylaşıldı" },
    { key: "next_check_note", label: "Sonraki kontrol tarihi notu" },
  ],
  "surec-yonetimi": [
    { key: "poa_confirmed", label: "POA / yetki teyidi" },
    { key: "sent_to_partner", label: "Avukat ortağına iletildi" },
    { key: "partner_reply", label: "Ortak dönüşü alındı" },
    { key: "summary_shared", label: "Müşteri dilinde özet paylaşıldı" },
    { key: "archive_updated", label: "Evrak arşiv klasörü güncel" },
  ],
};

export function checklistTemplateForPackage(
  slug: PackageSlug | string,
): Array<{ key: string; label: string }> {
  return TEMPLATES[slug] ?? [
    { key: "intake", label: "Başvuru alındı" },
    { key: "work", label: "İşlem yapıldı" },
    { key: "done", label: "Kapatıldı / bildirildi" },
  ];
}

/** Merge stored progress with package template (template wins on labels). */
export function resolveChecklist(
  slug: PackageSlug | string,
  stored?: CaseChecklistItem[] | null,
): CaseChecklistItem[] {
  const template = checklistTemplateForPackage(slug);
  const byKey = new Map((stored ?? []).map((i) => [i.key, i]));
  return template.map((t) => {
    const prev = byKey.get(t.key);
    return {
      key: t.key,
      label: t.label,
      doneAt: prev?.doneAt,
    };
  });
}

export function toggleChecklistItem(
  items: CaseChecklistItem[],
  key: string,
  done: boolean,
): CaseChecklistItem[] {
  return items.map((i) =>
    i.key === key
      ? { ...i, doneAt: done ? new Date().toISOString() : undefined }
      : i,
  );
}

/** Only sets doneAt on listed keys that are still open. */
export function markChecklistKeysDone(
  slug: string,
  stored: CaseChecklistItem[] | null | undefined,
  keys: string[],
): CaseChecklistItem[] {
  const items = resolveChecklist(slug, stored);
  if (!Array.isArray(keys) || keys.length === 0) return items;
  const want = new Set(keys);
  const now = new Date().toISOString();
  return items.map((i) =>
    want.has(i.key) && !i.doneAt ? { ...i, doneAt: now } : i,
  );
}

export function nextChecklistLabel(
  slug: string,
  stored: CaseChecklistItem[] | null | undefined,
  status: string,
): string {
  if (
    status === "closed" ||
    status === "unpaid_archived" ||
    status === "draft"
  ) {
    return "—";
  }
  const items = resolveChecklist(slug, stored);
  const next = items.find((i) => !i.doneAt);
  return next?.label ?? "Bitti";
}

const STATUS_TR: Record<CaseStatus, string> = {
  draft: "Taslak",
  awaiting_payment: "Ödeme bekleniyor",
  paid: "Ödendi — kuyruk",
  in_progress: "Hazırlanıyor / takipte",
  closed: "Tamamlandı",
  unpaid_archived: "Ödenmedi — arşiv",
};

export function statusLabelTr(status: string): string {
  return STATUS_TR[status as CaseStatus] ?? status;
}

const PAYMENT_TR: Record<string, string> = {
  none: "yok",
  pending: "bekliyor",
  paid: "ödendi",
  failed: "başarısız",
};

export function paymentLabelTr(status: string): string {
  return PAYMENT_TR[status] ?? status;
}
