import { isDatabaseConfigured } from "@/lib/db";
import {
  bundleCustomer,
  panelStatsFromCases,
  summarizeCustomers as summarizeCustomersFn,
} from "./customers";
import type { CaseRecord } from "./types";
import * as fileStore from "./store-file";
import * as dbStore from "./store-db";

function useDb() {
  return isDatabaseConfigured();
}

export async function saveCase(record: CaseRecord): Promise<CaseRecord> {
  if (useDb()) return dbStore.saveCaseDb(record);
  return fileStore.saveCase(record);
}

export async function getCase(id: string): Promise<CaseRecord | null> {
  if (useDb()) return dbStore.getCaseDb(id);
  return fileStore.getCase(id);
}

export async function getCaseByAccessToken(
  token: string,
): Promise<CaseRecord | null> {
  if (useDb()) return dbStore.getCaseByAccessTokenDb(token);
  return fileStore.getCaseByAccessToken(token);
}

export async function getCaseByStripeSession(
  sessionId: string,
): Promise<CaseRecord | null> {
  if (useDb()) return dbStore.getCaseByStripeSessionDb(sessionId);
  return fileStore.getCaseByStripeSession(sessionId);
}

export async function listCases(): Promise<CaseRecord[]> {
  if (useDb()) return dbStore.listCasesDb();
  return fileStore.listCases();
}

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
  let saved = await saveCase(c);

  saved = await (
    await import("@/lib/services/case-paid-effects")
  ).runCasePaidEffects(saved, alreadyPaid);

  return saved;
}

export async function getCaseBySubscriptionId(
  subscriptionId: string,
): Promise<CaseRecord | null> {
  if (useDb()) return dbStore.getCaseBySubscriptionIdDb(subscriptionId);
  return fileStore.getCaseBySubscriptionId(subscriptionId);
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

export async function addCaseNote(params: {
  caseId: string;
  body: string;
  sharedWithCustomer?: boolean;
}): Promise<CaseRecord | null> {
  if (useDb()) return dbStore.addCaseNoteDb(params);
  // File store: append to in-memory notes on record
  const c = await getCase(params.caseId);
  if (!c) return null;
  const note = {
    id: `note_${Date.now().toString(36)}`,
    body: params.body.trim(),
    author: "operator",
    sharedWithCustomer: Boolean(params.sharedWithCustomer),
    createdAt: new Date().toISOString(),
  };
  c.notes = [...(c.notes ?? []), note];
  return saveCase(c);
}

export { buildCustomerDossier } from "./dossier";
export {
  filterCaseRecords,
  filterCustomers,
  summarizeCustomers,
} from "./customers";
export type {
  CustomerBundle,
  CustomerSummary,
  PanelStats,
} from "./customers";
export {
  listCompanies,
  listIndividuals,
  listPartners,
  listPayments,
  listInvoices,
  listPaidCases,
  listQueue,
} from "./panel-lists";
export type { PartnerGroup, PaymentRow, InvoiceRow } from "./panel-lists";
export {
  excludeSurecCases,
  groupSurecHubs,
  isSurecPackage,
} from "./surec-hub";
export type { SurecHub } from "./surec-hub";

export async function listCustomerSummaries() {
  if (useDb()) return dbStore.listCustomerSummariesDb();
  return summarizeCustomersFn(await listCases());
}

export async function getCustomerBundle(key: string) {
  return bundleCustomer(await listCases(), key);
}

export async function getPanelStats() {
  return panelStatsFromCases(await listCases());
}
