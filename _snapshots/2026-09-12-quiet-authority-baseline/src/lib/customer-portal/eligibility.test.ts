import { describe, expect, it } from "vitest";
import {
  isPortalEligibleStatus,
  PORTAL_ELIGIBLE_STATUSES,
} from "@/lib/customer-portal/eligibility";

describe("portal eligibility", () => {
  it("eligible statuses are paid pipeline only", () => {
    expect(PORTAL_ELIGIBLE_STATUSES).toEqual(["paid", "in_progress", "closed"]);
  });

  it("rejects draft and awaiting_payment", () => {
    expect(isPortalEligibleStatus("draft")).toBe(false);
    expect(isPortalEligibleStatus("awaiting_payment")).toBe(false);
  });

  it("accepts paid pipeline statuses", () => {
    for (const s of PORTAL_ELIGIBLE_STATUSES) {
      expect(isPortalEligibleStatus(s)).toBe(true);
    }
  });
});
