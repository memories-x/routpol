import type { PackageSlug, TrackingMode } from "./document-slots";
import type {
  ResidenceSelection,
  ResidenceStatusKey,
} from "./residence-slots";
import type { VoivodeshipKey } from "./voivodeships";

export type CaseStatus =
  | "draft"
  | "awaiting_payment"
  | "paid"
  | "in_progress"
  | "closed"
  | "unpaid_archived";

export type EntityType = "sahis" | "sirket";

export type CasePricingMeta = {
  pageCount?: number;
  /** true = sayfa sayısı yüklenen dosyadan ölçüldü (tek-yazi) */
  pagesFromUpload?: boolean;
  fileQuota?: number;
  entityType?: EntityType;
};

export type CaseDocument = {
  id: string;
  slotKey: string;
  originalName: string;
  mime: string;
  size: number;
  storagePath: string;
  uploadedAt: string;
  /** Sayfa sayısı (PDF veya görsel=1) */
  pageCount?: number;
};

export type InvoiceStatus = "none" | "pending" | "issued" | "failed";

/** Yasal fatura (Fakturownia / KSeF). Stripe makbuzu değil. */
export type CaseInvoice = {
  status: InvoiceStatus;
  number?: string;
  ksefNumber?: string;
  pdfUrl?: string;
  issuedAt?: string;
  providerId?: string;
  emailSentAt?: string;
  lastError?: string;
};

export type CasePayment = {
  stripeSessionId?: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  amountCents: number;
  currency: string;
  status: "none" | "pending" | "paid" | "failed";
  paidAt?: string;
  /** sale | quota_letter | overage — muhasebe ayrımı */
  billingKind?: "sale" | "quota_letter" | "overage";
  invoice?: CaseInvoice;
};

export type CaseChecklistItem = {
  key: string;
  label: string;
  doneAt?: string;
};

export type CaseRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  packageSlug: PackageSlug;
  pricingMeta?: CasePricingMeta;
  /** Legacy fields — optional on old records */
  residence?: ResidenceSelection;
  wojewodztwo?: VoivodeshipKey;
  residenceStatus?: ResidenceStatusKey;
  status: CaseStatus;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    /** Firma unvanı — şahısta boş olabilir */
    companyName?: string;
    /** Alıcı NIP — firma siparişinde zorunlu (KSeF B2B) */
    nip?: string;
    /** Kısa konu: kurum + ne (ör. ZUS — katkı, US — PIT) */
    matter?: string;
    /** Özet dili tercihi */
    resultLocale?: "tr" | "pl" | "en";
    notes?: string;
    shippingAddress?: string;
  };
  documents: CaseDocument[];
  payment: CasePayment;
  accessToken: string;
  trackingMode?: TrackingMode;
  poaAcceptedAt?: string;
  /** Idempotent customer notifications (link only, no file attach). */
  notifications?: {
    paidLinkSentAt?: string;
    readyLinkSentAt?: string;
    inProgressLinkSentAt?: string;
  };
  /** Drive / yerel klasör etiketi */
  archiveFolder?: string;
  /** Köprü: avukat ortağı adı / etiket (hukuk yürütmez) */
  lawyerPartner?: string;
  lawyerPartnerId?: string;
  /** Paket checklist ilerlemesi */
  checklist?: CaseChecklistItem[];
  /** Operatör süreç notları (DB); paylaşılanlar müşteri dosyasına gider */
  notes?: Array<{
    id: string;
    body: string;
    author: string;
    sharedWithCustomer: boolean;
    createdAt: string;
  }>;
};

export function createId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}
