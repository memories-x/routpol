import {
  agingDays,
  agingLabel,
  caseAgingIso,
  needsAttention,
} from "./aging";
import { nextChecklistLabel } from "./checklist";
import { customerKeyFromEmail } from "./customers";
import type { CaseRecord } from "./types";

export function isSurecPackage(slug: string): boolean {
  return slug === "surec-yonetimi";
}

export function excludeSurecCases(cases: CaseRecord[]): CaseRecord[] {
  return (Array.isArray(cases) ? cases : []).filter(
    (c) => !isSurecPackage(c.packageSlug),
  );
}

export type SurecHub = {
  key: string;
  title: string;
  email: string;
  openCount: number;
  totalCount: number;
  waitDays: number;
  waitLabel: string;
  attention: boolean;
  matters: string[];
  lawyerPartner?: string;
  nextAction: string;
};

function waitDaysOf(c: CaseRecord): number {
  return agingDays(
    caseAgingIso({
      status: c.status,
      updatedAt: c.updatedAt,
      paidAt: c.payment?.paidAt,
    }),
  );
}

export function groupSurecHubs(cases: CaseRecord[]): SurecHub[] {
  const surec = (Array.isArray(cases) ? cases : []).filter(
    (c) => isSurecPackage(c.packageSlug) && c.status !== "draft",
  );
  const map = new Map<string, CaseRecord[]>();
  for (const c of surec) {
    const key = customerKeyFromEmail(c.customer.email);
    if (!key) continue;
    const list = map.get(key) ?? [];
    list.push(c);
    map.set(key, list);
  }

  const hubs: SurecHub[] = [];
  for (const [key, list] of map) {
    const open = list.filter(
      (c) =>
        c.status === "paid" ||
        c.status === "in_progress" ||
        c.status === "awaiting_payment",
    );
    const queueOpen = open.filter(
      (c) => c.status === "paid" || c.status === "in_progress",
    );
    let worst: CaseRecord | undefined;
    let waitDays = 0;
    for (const c of queueOpen) {
      const d = waitDaysOf(c);
      if (!worst || d > waitDays) {
        worst = c;
        waitDays = d;
      }
    }
    if (!worst && open[0]) worst = open[0];
    const sample = worst ?? list[0];
    if (!sample) continue;
    const matters = [
      ...new Set(
        open
          .map((c) => c.customer.matter?.trim())
          .filter((m): m is string => Boolean(m)),
      ),
    ].slice(0, 4);
    const attention = queueOpen.some((c) =>
      needsAttention(c.status, waitDaysOf(c)),
    );
    hubs.push({
      key,
      title:
        sample.customer.companyName?.trim() || sample.customer.fullName,
      email: sample.customer.email,
      openCount: open.length,
      totalCount: list.length,
      waitDays,
      waitLabel: queueOpen.length > 0 ? agingLabel(waitDays) : "—",
      attention,
      matters,
      lawyerPartner: sample.lawyerPartner,
      nextAction: worst
        ? nextChecklistLabel(worst.packageSlug, worst.checklist, worst.status)
        : "—",
    });
  }

  return hubs.sort((a, b) => {
    if (a.attention !== b.attention) return a.attention ? -1 : 1;
    if (b.openCount !== a.openCount) return b.openCount - a.openCount;
    return b.waitDays - a.waitDays;
  });
}
