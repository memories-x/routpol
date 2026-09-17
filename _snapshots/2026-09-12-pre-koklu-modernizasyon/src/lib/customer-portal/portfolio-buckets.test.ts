import { describe, expect, it } from "vitest";
import {
  groupHistoryByYear,
  historyCases,
  splitPortfolio,
} from "@/lib/customer-portal/portfolio-buckets";

describe("splitPortfolio", () => {
  it("splits open / ready / archive", () => {
    const { open, ready, archive } = splitPortfolio([
      { status: "paid", hasResult: false },
      { status: "in_progress", hasResult: false },
      { status: "in_progress", hasResult: true },
      { status: "closed", hasResult: true },
    ]);
    expect(open).toHaveLength(2);
    expect(ready).toHaveLength(1);
    expect(archive).toHaveLength(1);
  });

  it("guards non-arrays", () => {
    expect(splitPortfolio(undefined).open).toEqual([]);
  });
});

describe("historyCases", () => {
  it("keeps delivered work newest first, skips open", () => {
    const rows = historyCases([
      {
        status: "paid",
        hasResult: false,
        updatedAt: "2026-09-01T00:00:00.000Z",
      },
      {
        status: "in_progress",
        hasResult: true,
        updatedAt: "2026-03-01T00:00:00.000Z",
      },
      {
        status: "closed",
        hasResult: true,
        updatedAt: "2026-08-01T00:00:00.000Z",
      },
    ]);
    expect(rows).toHaveLength(2);
    expect(rows[0]?.updatedAt).toContain("2026-08");
    expect(rows[1]?.updatedAt).toContain("2026-03");
  });
});

describe("groupHistoryByYear", () => {
  it("groups by year descending", () => {
    const groups = groupHistoryByYear([
      { updatedAt: "2025-12-01T00:00:00.000Z" },
      { updatedAt: "2026-01-15T00:00:00.000Z" },
      { updatedAt: "2026-06-01T00:00:00.000Z" },
    ]);
    expect(groups.map((g) => g.year)).toEqual(["2026", "2025"]);
    expect(groups[0]?.rows).toHaveLength(2);
  });
});
