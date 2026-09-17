import { describe, expect, it } from "vitest";
import {
  isWithinRenewalReminderWindow,
  RENEWAL_REMINDER_DAYS,
} from "./period-renewal";

describe("period renewal reminder window", () => {
  it("matches ~5 days before end", () => {
    const now = new Date("2026-08-19T12:00:00Z");
    const end = new Date(now);
    end.setDate(end.getDate() + RENEWAL_REMINDER_DAYS);
    expect(isWithinRenewalReminderWindow(end, now)).toBe(true);
  });

  it("rejects far future end", () => {
    const now = new Date("2026-08-19T12:00:00Z");
    const end = new Date(now);
    end.setDate(end.getDate() + 20);
    expect(isWithinRenewalReminderWindow(end, now)).toBe(false);
  });
});
