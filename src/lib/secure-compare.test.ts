import { describe, expect, it } from "vitest";
import { secureCompare } from "./secure-compare";

describe("secureCompare", () => {
  it("matches equal strings", () => {
    expect(secureCompare("abc", "abc")).toBe(true);
  });

  it("rejects different strings", () => {
    expect(secureCompare("abc", "abd")).toBe(false);
  });

  it("rejects different lengths without leaking", () => {
    expect(secureCompare("short", "much-longer")).toBe(false);
  });
});
