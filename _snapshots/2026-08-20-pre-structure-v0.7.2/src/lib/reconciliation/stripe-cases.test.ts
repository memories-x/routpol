import { describe, expect, it } from "vitest";
import { findCheckoutReceiptGaps } from "@/lib/reconciliation/stripe-cases";

describe("findCheckoutReceiptGaps", () => {
  it("flags paid case without matching receipt", () => {
    const result = findCheckoutReceiptGaps({
      paidCases: [{ id: "case-1", stripeSessionId: "cs_a" }],
      receiptSessionIds: new Set<string>(),
    });
    expect(result.paidWithoutReceipt).toEqual(["case-1"]);
    expect(result.receiptWithoutPaidCase).toEqual([]);
  });

  it("flags orphan receipt session", () => {
    const result = findCheckoutReceiptGaps({
      paidCases: [{ id: "case-1", stripeSessionId: "cs_a" }],
      receiptSessionIds: new Set(["cs_a", "cs_orphan"]),
    });
    expect(result.paidWithoutReceipt).toEqual([]);
    expect(result.receiptWithoutPaidCase).toEqual(["cs_orphan"]);
  });

  it("flags paid case missing stripeSessionId", () => {
    const result = findCheckoutReceiptGaps({
      paidCases: [{ id: "case-x", stripeSessionId: null }],
      receiptSessionIds: new Set(["cs_a"]),
    });
    expect(result.paidWithoutReceipt).toEqual(["case-x"]);
  });
});
