import { describe, expect, it } from "vitest";
import {
  isMosContentStale,
  MOS_CONTENT_VERIFIED_AT,
  MOS_REVIEW_INTERVAL_MS,
} from "@/lib/mos-content-review";

describe("MOS content review", () => {
  it("is fresh at verified date", () => {
    const verified = new Date(MOS_CONTENT_VERIFIED_AT).getTime();
    expect(isMosContentStale(verified + 1000)).toBe(false);
  });

  it("is stale after 90 days", () => {
    const verified = new Date(MOS_CONTENT_VERIFIED_AT).getTime();
    expect(
      isMosContentStale(verified + MOS_REVIEW_INTERVAL_MS + 86400000),
    ).toBe(true);
  });
});
