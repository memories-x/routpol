import { describe, expect, it } from "vitest";
import {
  RETENTION_CLOSED_MS,
  RETENTION_UNPAID_MS,
} from "@/lib/data-retention/purge";

describe("retention windows", () => {
  it("unpaid retention is 30 days", () => {
    expect(RETENTION_UNPAID_MS).toBe(30 * 24 * 60 * 60 * 1000);
  });

  it("closed retention is 24 months (30-day months)", () => {
    expect(RETENTION_CLOSED_MS).toBe(24 * 30 * 24 * 60 * 60 * 1000);
  });
});
