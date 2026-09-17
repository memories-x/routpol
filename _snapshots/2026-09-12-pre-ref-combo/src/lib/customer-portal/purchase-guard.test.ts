import { describe, expect, it } from "vitest";
import { ACTIVE_PERIOD_CODE } from "@/lib/customer-portal/purchase-guard";

describe("purchase guard", () => {
  it("exports stable ACTIVE_PERIOD conflict code", () => {
    expect(ACTIVE_PERIOD_CODE).toBe("ACTIVE_PERIOD");
  });
});
