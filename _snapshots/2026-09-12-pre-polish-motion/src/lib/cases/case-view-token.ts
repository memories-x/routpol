import { createHmac, timingSafeEqual } from "crypto";

const VIEW_TTL_MS = 24 * 60 * 60 * 1000;

function secret(): string {
  const value =
    process.env.CASE_VIEW_SECRET ?? process.env.CUSTOMER_AUTH_SECRET;
  if (!value) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("CASE_VIEW_SECRET or CUSTOMER_AUTH_SECRET required");
    }
    return "dev-case-view-secret";
  }
  return value;
}

/** Kısa ömürlü dosya/dossier erişimi — query’de uzun accessToken taşımaya alternatif. */
export function createCaseViewToken(params: {
  caseId: string;
  docId?: string;
}): string {
  const exp = Date.now() + VIEW_TTL_MS;
  const doc = params.docId ?? "";
  const payload = `cid=${params.caseId}&doc=${doc}&exp=${exp}`;
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyCaseViewToken(
  token: string | undefined | null,
  expectedCaseId: string,
  expectedDocId?: string,
): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expectedSig = createHmac("sha256", secret())
    .update(payload)
    .digest("hex");
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) {
      return false;
    }
  } catch {
    return false;
  }
  const m = payload.match(/^cid=([^&]+)&doc=([^&]*)&exp=(\d+)$/);
  if (!m) return false;
  const cid = m[1];
  const doc = m[2] ?? "";
  const exp = Number(m[3]);
  if (!cid || cid !== expectedCaseId) return false;
  if (expectedDocId && doc !== expectedDocId) return false;
  if (!Number.isFinite(exp) || exp <= Date.now()) return false;
  return true;
}

export function viewTokenTtlMs(): number {
  return VIEW_TTL_MS;
}
