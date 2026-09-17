import {
  customerSlotsFor,
  documentSlotsByPackage,
  isLetterPackage,
  packageRequiresDocumentUploads,
  type DocumentSlotDef,
  type PackageSlug,
  type TrackingMode,
} from "./document-slots";
import type { CaseDocument, CaseRecord } from "./types";

export function resolveSlotsForCase(
  packageSlug: PackageSlug,
  _residence?: unknown,
  _legacyStatus?: string | null,
  _wojewodztwo?: string | null,
  _trackingMode?: TrackingMode | null,
): DocumentSlotDef[] {
  return documentSlotsByPackage[packageSlug] ?? [];
}

export function resolveSlotsForRecord(record: CaseRecord): DocumentSlotDef[] {
  return resolveSlotsForCase(record.packageSlug);
}

export function resolveCustomerSlots(record: CaseRecord): DocumentSlotDef[] {
  return customerSlotsFor(record.packageSlug);
}

export function missingRequiredSlots(
  packageSlug: PackageSlug,
  documents: CaseDocument[],
  _residence?: unknown,
  _legacyStatus?: string | null,
  _wojewodztwo?: string | null,
  _trackingMode?: TrackingMode | null,
): string[] {
  if (!packageRequiresDocumentUploads(packageSlug)) return [];
  const slots = isLetterPackage(packageSlug)
    ? customerSlotsFor(packageSlug)
    : resolveSlotsForCase(packageSlug);
  return slots
    .filter((s) => s.required)
    .filter((s) => !documents.some((d) => d.slotKey === s.key))
    .map((s) => s.key);
}

export function assertOturumResidence(
  _packageSlug: string,
  _residence: unknown,
): boolean {
  return true;
}
