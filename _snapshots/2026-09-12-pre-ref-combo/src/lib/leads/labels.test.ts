import { describe, expect, it } from "vitest";
import { leadServiceLabel, leadStatusLabel } from "@/lib/leads/labels";

describe("lead labels", () => {
  it("maps known service types", () => {
    expect(leadServiceLabel("yatirimci")).toMatch(/işletmeci/);
    expect(leadServiceLabel("aylik-paket")).toMatch(/Aylık/);
  });

  it("falls back to raw slug", () => {
    expect(leadServiceLabel("unknown-x")).toBe("unknown-x");
  });

  it("maps statuses", () => {
    expect(leadStatusLabel("new")).toBe("Yeni");
    expect(leadStatusLabel("contacted")).toBe("Dönüldü");
  });
});
