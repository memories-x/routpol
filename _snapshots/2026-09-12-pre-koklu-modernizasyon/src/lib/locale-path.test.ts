import { describe, expect, it } from "vitest";
import { swapLocalePath } from "@/lib/locale-path";

describe("swapLocalePath", () => {
  it("swaps locale and keeps path", () => {
    expect(swapLocalePath("/tr/hizmetler/eslik", "pl")).toBe(
      "/pl/hizmetler/eslik",
    );
    expect(swapLocalePath("/en/basvuru", "tr")).toBe("/tr/basvuru");
  });

  it("falls back to locale root when path has no locale", () => {
    expect(swapLocalePath("/", "en")).toBe("/en");
    expect(swapLocalePath("/panel", "pl")).toBe("/pl");
  });
});
