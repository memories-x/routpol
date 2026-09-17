import type { CaseRecord, CaseStatus } from "./types";

export type CustomerSummary = {
  /** URL anahtarı — lowercase e-posta */
  key: string;
  email: string;
  fullName: string;
  phone: string;
  companyName?: string;
  caseCount: number;
  /** draft / unpaid_archived / closed dışı */
  activeCount: number;
  lastUpdatedAt: string;
  packages: string[];
};

export type CustomerCaseRow = {
  id: string;
  status: CaseStatus;
  packageSlug: string;
  matter?: string;
  amountCents: number;
  currency: string;
  paymentStatus: string;
  paidAt?: string;
  documentCount: number;
  updatedAt: string;
  createdAt: string;
  archiveFolder?: string;
  lawyerPartner?: string;
  checklist?: CaseRecord["checklist"];
};

export type CustomerBundle = CustomerSummary & {
  cases: CustomerCaseRow[];
  recentNotes: Array<{
    caseId: string;
    body: string;
    sharedWithCustomer: boolean;
    createdAt: string;
  }>;
};

export type PanelStats = {
  customers: number;
  cases: number;
  paid: number;
  inProgress: number;
  awaitingPayment: number;
  closed: number;
  unpaidArchived: number;
};

const INACTIVE: Set<CaseStatus> = new Set([
  "draft",
  "closed",
  "unpaid_archived",
]);

export function customerKeyFromEmail(email: string): string {
  return email.trim().toLowerCase();
}

function toRow(c: CaseRecord): CustomerCaseRow {
  return {
    id: c.id,
    status: c.status,
    packageSlug: c.packageSlug,
    matter: c.customer.matter,
    amountCents: c.payment.amountCents,
    currency: c.payment.currency,
    paymentStatus: c.payment.status,
    paidAt: c.payment.paidAt,
    documentCount: c.documents.length,
    updatedAt: c.updatedAt,
    createdAt: c.createdAt,
    archiveFolder: c.archiveFolder,
    lawyerPartner: c.lawyerPartner,
    checklist: c.checklist,
  };
}

/** E-posta bazlı müşteri kartları (draft hariç). */
export function summarizeCustomers(cases: CaseRecord[]): CustomerSummary[] {
  const map = new Map<string, CaseRecord[]>();

  for (const c of cases) {
    if (c.status === "draft") continue;
    const key = customerKeyFromEmail(c.customer.email);
    if (!key) continue;
    const arr = map.get(key);
    if (arr) arr.push(c);
    else map.set(key, [c]);
  }

  const list: CustomerSummary[] = [];
  for (const [key, group] of map) {
    const newest = group.reduce((a, b) =>
      a.updatedAt >= b.updatedAt ? a : b,
    );
    list.push({
      key,
      email: key,
      fullName: newest.customer.fullName,
      phone: newest.customer.phone,
      companyName:
        group.find((c) => c.customer.companyName)?.customer.companyName,
      caseCount: group.length,
      activeCount: group.filter((c) => !INACTIVE.has(c.status)).length,
      lastUpdatedAt: newest.updatedAt,
      packages: [...new Set(group.map((c) => c.packageSlug))],
    });
  }

  return list.sort((a, b) => b.lastUpdatedAt.localeCompare(a.lastUpdatedAt));
}

export function bundleCustomer(
  cases: CaseRecord[],
  keyRaw: string,
): CustomerBundle | null {
  const key = decodeURIComponent(keyRaw).trim().toLowerCase();
  if (!key) return null;

  const matched = cases
    .filter(
      (c) =>
        c.status !== "draft" &&
        customerKeyFromEmail(c.customer.email) === key,
    )
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  if (matched.length === 0) return null;

  const head = matched[0]!;
  const recentNotes = matched
    .flatMap((c) =>
      (c.notes ?? []).map((n) => ({
        caseId: c.id,
        body: n.body,
        sharedWithCustomer: n.sharedWithCustomer,
        createdAt: n.createdAt,
      })),
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 3);

  return {
    key,
    email: key,
    fullName: head.customer.fullName,
    phone: head.customer.phone,
    companyName:
      matched.find((c) => c.customer.companyName)?.customer.companyName,
    caseCount: matched.length,
    activeCount: matched.filter((c) => !INACTIVE.has(c.status)).length,
    lastUpdatedAt: head.updatedAt,
    packages: [...new Set(matched.map((c) => c.packageSlug))],
    cases: matched.map(toRow),
    recentNotes,
  };
}

export function panelStatsFromCases(cases: CaseRecord[]): PanelStats {
  const visible = cases.filter((c) => c.status !== "draft");
  const customers = summarizeCustomers(visible);
  return {
    customers: customers.length,
    cases: visible.length,
    paid: visible.filter((c) => c.status === "paid").length,
    inProgress: visible.filter((c) => c.status === "in_progress").length,
    awaitingPayment: visible.filter((c) => c.status === "awaiting_payment")
      .length,
    closed: visible.filter((c) => c.status === "closed").length,
    unpaidArchived: visible.filter((c) => c.status === "unpaid_archived")
      .length,
  };
}

export function filterCustomers(
  list: CustomerSummary[],
  q: string,
): CustomerSummary[] {
  const s = q.trim().toLowerCase();
  if (!s) return list;
  return list.filter((c) => {
    const hay = [
      c.fullName,
      c.email,
      c.phone,
      c.companyName ?? "",
      ...c.packages,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(s);
  });
}

export function filterCaseRecords(
  cases: CaseRecord[],
  opts: { q?: string; status?: string; packageSlug?: string },
): CaseRecord[] {
  let list = cases.filter((c) => c.status !== "draft");
  if (opts.status) {
    list = list.filter((c) => c.status === opts.status);
  }
  if (opts.packageSlug) {
    list = list.filter((c) => c.packageSlug === opts.packageSlug);
  }
  const s = (opts.q ?? "").trim().toLowerCase();
  if (s) {
    list = list.filter((c) => {
      const hay = [
        c.customer.fullName,
        c.customer.email,
        c.customer.phone,
        c.customer.companyName ?? "",
        c.customer.matter ?? "",
        c.packageSlug,
        c.id,
        c.archiveFolder ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(s);
    });
  }
  return list.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
