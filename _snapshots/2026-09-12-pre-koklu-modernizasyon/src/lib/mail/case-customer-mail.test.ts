import { describe, expect, it } from "vitest";
import {
  buildCaseCustomerMailCopy,
  dualDoorLines,
} from "@/lib/mail/case-customer-mail";

describe("dualDoorLines", () => {
  it("lists case then hesabim for TR", () => {
    const lines = dualDoorLines("tr", "https://x.test/case", "tek-yazi");
    expect(lines.some((l) => l.includes("Bu dosya"))).toBe(true);
    expect(lines.some((l) => l.includes("Hesabım"))).toBe(true);
    expect(lines).toContain("https://x.test/case");
  });
});

describe("buildCaseCustomerMailCopy", () => {
  it("paid_link has both doors", () => {
    const { subject, text } = buildCaseCustomerMailCopy({
      locale: "tr",
      kind: "paid_link",
      caseUrl: "https://x.test/c",
      name: "Ali",
      packageSlug: "aylik-paket",
    });
    expect(subject).toMatch(/dosya/i);
    expect(text).toContain("https://x.test/c");
    expect(text).toMatch(/Hesabım/);
    expect(text).toMatch(/Aylık/);
  });

  it("paid_link for telefon includes preferred call slot", () => {
    const { subject, text } = buildCaseCustomerMailCopy({
      locale: "tr",
      kind: "paid_link",
      caseUrl: "https://x.test/c",
      name: "Ali",
      packageSlug: "telefon-gorusme",
      callRequestedAt: "2026-10-01T12:00:00.000Z",
    });
    expect(subject).toMatch(/telefon/i);
    expect(text).toMatch(/Tercih edilen görüşme/);
    expect(text).toMatch(/Varşova|Europe\/Warsaw/);
  });
});
