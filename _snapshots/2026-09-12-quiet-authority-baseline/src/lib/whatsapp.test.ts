import { describe, expect, it } from "vitest";
import {
  buildCustomerWhatsAppUrl,
  operatorWhatsAppPrefill,
} from "@/lib/whatsapp";
import { leadServiceLabel } from "@/lib/leads/labels";

describe("buildCustomerWhatsAppUrl", () => {
  it("builds wa.me link from E164", () => {
    const url = buildCustomerWhatsAppUrl("+905551112233", "Merhaba");
    expect(url).toBe(
      `https://wa.me/905551112233?text=${encodeURIComponent("Merhaba")}`,
    );
  });

  it("returns null for short numbers", () => {
    expect(buildCustomerWhatsAppUrl("+12", "x")).toBeNull();
  });
});

describe("operatorWhatsAppPrefill", () => {
  it("uses Turkish by default with human label", () => {
    const text = operatorWhatsAppPrefill(
      "Ayşe Yılmaz",
      "yatirimci",
      "tr",
      leadServiceLabel("yatirimci"),
    );
    expect(text).toContain("Ayşe Yılmaz");
    expect(text).toContain("işletmeci");
    expect(text).toContain("POL-TURK");
  });

  it("uses Polish when locale=pl", () => {
    const text = operatorWhatsAppPrefill("Jan", "isletme", "pl", "Firma w PL");
    expect(text).toContain("Dzień dobry");
    expect(text).toContain("Jan");
  });

  it("uses English when locale=en", () => {
    const text = operatorWhatsAppPrefill("Sam", "egitim", "en");
    expect(text).toContain("Hello Sam");
  });
});

describe("leadServiceLabel", () => {
  it("maps yatirimci slug", () => {
    expect(leadServiceLabel("yatirimci")).toMatch(/işletmeci/);
  });
});
