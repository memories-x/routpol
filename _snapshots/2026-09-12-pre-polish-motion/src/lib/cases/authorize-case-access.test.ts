import { describe, expect, it } from "vitest";
import {
  legacyTokenExpired,
  LEGACY_TOKEN_MAX_AGE_MS,
} from "./authorize-case-access";

describe("legacyTokenExpired", () => {
  it("allows open cases", () => {
    expect(
      legacyTokenExpired({
        id: "c1",
        accessToken: "t",
        status: "paid",
        updatedAt: new Date(0).toISOString(),
      }),
    ).toBe(false);
  });

  it("blocks closed case after 90 days", () => {
    const old = new Date(Date.now() - LEGACY_TOKEN_MAX_AGE_MS - 86_400_000);
    expect(
      legacyTokenExpired({
        id: "c1",
        accessToken: "t",
        status: "closed",
        updatedAt: old.toISOString(),
      }),
    ).toBe(true);
  });
});
