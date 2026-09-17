import { describe, expect, it } from "vitest";
import {
  chainQueuedPeriodEnds,
  computePeriodWindow,
  periodsOverlap,
} from "@/lib/customer-portal/period-planning";

describe("period planning (roadmap #8)", () => {
  it("queues when an unfinished period exists", () => {
    const paidAt = new Date("2026-01-01T12:00:00Z");
    const latestEnd = new Date("2026-02-01T12:00:00Z");
    const window = computePeriodWindow({ paidAt, latestUnfinishedEnd: latestEnd });
    expect(window.status).toBe("queued");
    expect(window.start.toISOString()).toBe(latestEnd.toISOString());
  });

  it("chains three queued purchases without overlap", () => {
    const anchorEnd = new Date("2026-02-01T00:00:00Z");
    const ends = chainQueuedPeriodEnds(
      [
        new Date("2026-03-01T00:00:00Z"),
        new Date("2026-04-01T00:00:00Z"),
        new Date("2026-05-01T00:00:00Z"),
      ],
      anchorEnd,
    );
    expect(ends).toHaveLength(3);
    for (let i = 1; i < ends.length; i++) {
      expect(ends[i]!.getTime()).toBeGreaterThan(ends[i - 1]!.getTime());
    }
    const windows = ends.map((end, i) => {
      const start = i === 0 ? anchorEnd : ends[i - 1]!;
      return { start, end };
    });
    for (let i = 0; i < windows.length; i++) {
      for (let j = i + 1; j < windows.length; j++) {
        expect(periodsOverlap(windows[i]!, windows[j]!)).toBe(false);
      }
    }
  });
});

describe("quota remaining (roadmap #2 helper)", () => {
  it("allows only one slot when quota=1 and no overage", async () => {
    const { periodRemaining } = await import(
      "@/lib/customer-portal/subscription-period"
    );
    expect(periodRemaining({ quota: 1, usedCount: 0, overageCredits: 0 })).toBe(
      1,
    );
    expect(periodRemaining({ quota: 1, usedCount: 1, overageCredits: 0 })).toBe(
      0,
    );
  });
});
