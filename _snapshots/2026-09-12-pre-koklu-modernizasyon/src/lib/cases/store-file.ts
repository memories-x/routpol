import { promises as fs } from "fs";
import path from "path";
import type { CaseRecord } from "./types";
import {
  blobGetJson,
  blobListPrefix,
  blobPutJson,
  useBlobBackend,
} from "./blob-io";
import {
  assertProductionReady,
  isDiskStorageEnabled,
  isProductionRuntime,
} from "@/lib/golive";
import { secureCompare } from "@/lib/secure-compare";

const DATA_DIR = path.join(process.cwd(), "data", "cases");
const INDEX_FILE = path.join(DATA_DIR, "index.json");
const BLOB_INDEX = "cases/index.json";

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readIndex(): Promise<string[]> {
  if (useBlobBackend()) {
    const idx = await blobGetJson<string[]>(BLOB_INDEX);
    return Array.isArray(idx) ? idx : [];
  }
  await ensureDir();
  try {
    const raw = await fs.readFile(INDEX_FILE, "utf8");
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeIndex(ids: string[]) {
  if (useBlobBackend()) {
    await blobPutJson(BLOB_INDEX, ids);
    return;
  }
  await ensureDir();
  await fs.writeFile(INDEX_FILE, JSON.stringify(ids, null, 2), "utf8");
}

function casePath(id: string) {
  return path.join(DATA_DIR, `${id}.json`);
}

function blobCasePath(id: string) {
  return `cases/${id}.json`;
}

export async function saveCase(record: CaseRecord): Promise<CaseRecord> {
  if (isProductionRuntime() && !useBlobBackend()) {
    assertProductionReady("case-store");
  }

  const next = { ...record, updatedAt: new Date().toISOString() };

  if (useBlobBackend()) {
    await blobPutJson(blobCasePath(next.id), next);
  } else {
    if (isProductionRuntime() && !isDiskStorageEnabled()) {
      throw new Error("STORAGE_REQUIRED_IN_PRODUCTION");
    }
    await ensureDir();
    await fs.writeFile(casePath(next.id), JSON.stringify(next, null, 2), "utf8");
  }

  const ids = await readIndex();
  if (!ids.includes(next.id)) {
    ids.unshift(next.id);
    await writeIndex(ids);
  }
  return next;
}

export async function getCase(id: string): Promise<CaseRecord | null> {
  if (useBlobBackend()) {
    return blobGetJson<CaseRecord>(blobCasePath(id));
  }
  try {
    const raw = await fs.readFile(casePath(id), "utf8");
    return JSON.parse(raw) as CaseRecord;
  } catch {
    return null;
  }
}

export async function getCaseByAccessToken(
  token: string,
): Promise<CaseRecord | null> {
  const ids = await readIndex();
  for (const id of ids) {
    const c = await getCase(id);
    if (c && secureCompare(c.accessToken, token)) return c;
  }
  return null;
}

export async function getCaseByStripeSession(
  sessionId: string,
): Promise<CaseRecord | null> {
  const ids = await readIndex();
  for (const id of ids) {
    const c = await getCase(id);
    if (c?.payment.stripeSessionId === sessionId) return c;
  }
  return null;
}

export async function listCases(): Promise<CaseRecord[]> {
  let ids = await readIndex();

  // Blob recovery: if index empty, list case JSON files
  if (ids.length === 0 && useBlobBackend()) {
    const paths = await blobListPrefix("cases/");
    ids = paths
      .map((p) => {
        const m = p.match(/^cases\/(case_[^/]+)\.json$/);
        return m?.[1] ?? null;
      })
      .filter((x): x is string => Boolean(x));
    if (ids.length > 0) await writeIndex(ids);
  }

  const out: CaseRecord[] = [];
  for (const id of ids) {
    const c = await getCase(id);
    if (c) out.push(c);
  }
  return out;
}

/** Panel: paid and active first; hide pure drafts by default */
export async function listPanelCases(): Promise<CaseRecord[]> {
  const all = await listCases();
  return all
    .filter((c) => c.status !== "draft")
    .sort((a, b) => {
      const rank = (s: CaseRecord["status"]) => {
        if (s === "paid") return 0;
        if (s === "in_progress") return 1;
        if (s === "awaiting_payment") return 2;
        if (s === "closed") return 3;
        return 4;
      };
      const d = rank(a.status) - rank(b.status);
      if (d !== 0) return d;
      return b.updatedAt.localeCompare(a.updatedAt);
    });
}

export async function markCasePaid(
  id: string,
  opts?: {
    stripeSessionId?: string;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
  },
): Promise<CaseRecord | null> {
  if (opts?.stripeSessionId) {
    const { claimCaseCheckout } = await import("@/lib/case-checkout-receipt");
    const claim = await claimCaseCheckout(opts.stripeSessionId, id);
    if (claim === "duplicate") {
      return getCase(id);
    }
  }

  const c = await getCase(id);
  if (!c) return null;
  const alreadyPaid = c.payment.status === "paid";
  c.status = "paid";
  c.payment.status = "paid";
  c.payment.paidAt = c.payment.paidAt ?? new Date().toISOString();
  if (opts?.stripeSessionId) {
    c.payment.stripeSessionId = opts.stripeSessionId;
  }
  if (opts?.stripeCustomerId) {
    c.payment.stripeCustomerId = opts.stripeCustomerId;
  }
  if (opts?.stripeSubscriptionId) {
    c.payment.stripeSubscriptionId = opts.stripeSubscriptionId;
  }
  const saved = await saveCase(c);

  return (
    await import("@/lib/services/case-paid-effects")
  ).runCasePaidEffects(saved, alreadyPaid);
}

export async function getCaseBySubscriptionId(
  subscriptionId: string,
): Promise<CaseRecord | null> {
  const ids = await readIndex();
  for (const id of ids) {
    const c = await getCase(id);
    if (c?.payment.stripeSubscriptionId === subscriptionId) return c;
  }
  return null;
}

export async function archiveStaleCases(opts?: {
  draftMaxAgeMs?: number;
  awaitingMaxAgeMs?: number;
}): Promise<{ archived: string[] }> {
  const draftMax = opts?.draftMaxAgeMs ?? 1000 * 60 * 60 * 48;
  const awaitingMax = opts?.awaitingMaxAgeMs ?? 1000 * 60 * 60 * 72;
  const now = Date.now();
  const archived: string[] = [];
  const all = await listCases();
  for (const c of all) {
    const age = now - new Date(c.updatedAt).getTime();
    if (c.status === "draft" && age > draftMax) {
      c.status = "unpaid_archived";
      await saveCase(c);
      archived.push(c.id);
    } else if (c.status === "awaiting_payment" && age > awaitingMax) {
      c.status = "unpaid_archived";
      c.payment.status = "failed";
      await saveCase(c);
      archived.push(c.id);
    }
  }
  return { archived };
}
