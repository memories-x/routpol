import { verifyCaseViewToken } from "@/lib/cases/case-view-token";
import { secureCompare } from "@/lib/secure-compare";

/** Kapalı dosyada legacy token en fazla 90 gün geçerli. */
export const LEGACY_TOKEN_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

export type CaseAccessRecord = {
  id: string;
  accessToken: string;
  status?: string;
  updatedAt?: string;
};

export function legacyTokenExpired(record: CaseAccessRecord): boolean {
  if (record.status !== "closed" || !record.updatedAt) return false;
  const updated = new Date(record.updatedAt).getTime();
  if (!Number.isFinite(updated)) return false;
  return Date.now() - updated > LEGACY_TOKEN_MAX_AGE_MS;
}

export function authorizeCaseAccess(
  record: CaseAccessRecord,
  request: Request,
  docId?: string,
): boolean {
  const url = new URL(request.url);
  const viewToken = url.searchParams.get("vt");
  if (viewToken && verifyCaseViewToken(viewToken, record.id, docId)) {
    return true;
  }
  if (legacyTokenExpired(record)) {
    return false;
  }
  const legacy =
    request.headers.get("x-case-token") ?? url.searchParams.get("token");
  return Boolean(legacy && secureCompare(legacy, record.accessToken));
}
