export type PaidCaseRow = {
  id: string;
  stripeSessionId: string | null;
};

/** Saf mutabakat — DB/Stripe adapter'ları bunu besler. */
export function findCheckoutReceiptGaps(params: {
  paidCases: PaidCaseRow[];
  receiptSessionIds: Set<string>;
}): {
  paidWithoutReceipt: string[];
  receiptWithoutPaidCase: string[];
} {
  const paidWithoutReceipt: string[] = [];
  const caseSessionIds = new Set<string>();

  for (const c of params.paidCases) {
    if (!c.stripeSessionId) {
      paidWithoutReceipt.push(c.id);
      continue;
    }
    caseSessionIds.add(c.stripeSessionId);
    if (!params.receiptSessionIds.has(c.stripeSessionId)) {
      paidWithoutReceipt.push(c.id);
    }
  }

  const receiptWithoutPaidCase: string[] = [];
  for (const sid of params.receiptSessionIds) {
    if (!caseSessionIds.has(sid)) {
      receiptWithoutPaidCase.push(sid);
    }
  }

  return { paidWithoutReceipt, receiptWithoutPaidCase };
}
