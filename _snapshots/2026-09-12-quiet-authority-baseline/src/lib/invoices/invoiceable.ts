import type { CaseRecord } from "@/lib/cases/types";

/** Tahsilat / muhasebe ZIP’e giren satışlar (0 zł kota yazıları hariç). */
export function isRevenueSale(record: CaseRecord): boolean {
  return (
    record.payment.status === "paid" &&
    typeof record.payment.amountCents === "number" &&
    record.payment.amountCents > 0
  );
}

export function isPaidCase(record: CaseRecord): boolean {
  return record.status !== "draft" && record.payment.status === "paid";
}
