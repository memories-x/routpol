import { describe, expect, it } from "vitest";
import {
  buildInvoicePositions,
  invoicePositionSummary,
  invoicePositionsGrossSum,
} from "@/lib/invoices/line-item";
import type { CaseRecord } from "@/lib/cases/types";

function base(partial: Partial<CaseRecord> & Pick<CaseRecord, "packageSlug">): CaseRecord {
  return {
    id: "case_line_1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locale: "tr",
    status: "paid",
    customer: {
      fullName: "Jan Test",
      email: "jan@example.com",
      phone: "+48111",
      matter: "ZUS — skladki",
    },
    documents: [],
    payment: {
      amountCents: partial.payment?.amountCents ?? 5000,
      currency: "pln",
      status: "paid",
      billingKind: partial.payment?.billingKind,
    },
    accessToken: "t",
    pricingMeta: partial.pricingMeta,
    ...partial,
  } as CaseRecord;
}

describe("buildInvoicePositions", () => {
  it("tek-yazi <=2 pages: one position", () => {
    const positions = buildInvoicePositions(
      base({
        packageSlug: "tek-yazi",
        pricingMeta: { pageCount: 2, pagesFromUpload: true },
        payment: { amountCents: 5000, currency: "pln", status: "paid" },
      }),
    );
    expect(positions).toHaveLength(1);
    expect(positions[0]!.name).toMatch(/Jedno pismo/);
    expect(positions[0]!.details.some((d) => d.includes("Liczba stron: 2"))).toBe(
      true,
    );
    expect(invoicePositionsGrossSum(positions)).toBe(5000);
  });

  it("tek-yazi extra pages: two positions summing to paid", () => {
    const positions = buildInvoicePositions(
      base({
        packageSlug: "tek-yazi",
        pricingMeta: { pageCount: 5, pagesFromUpload: true },
        payment: { amountCents: 12500, currency: "pln", status: "paid" },
      }),
    );
    expect(positions).toHaveLength(2);
    expect(positions[1]!.quantity).toBe(3);
    expect(invoicePositionsGrossSum(positions)).toBe(12500);
  });

  it("aylik-paket includes quota", () => {
    const positions = buildInvoicePositions(
      base({
        packageSlug: "aylik-paket",
        pricingMeta: { fileQuota: 8 },
        payment: { amountCents: 32000, currency: "pln", status: "paid" },
      }),
    );
    expect(positions[0]!.name).toMatch(/8/);
    expect(positions[0]!.details.some((d) => d.includes("8"))).toBe(true);
    expect(invoicePositionsGrossSum(positions)).toBe(32000);
  });

  it("overage billingKind", () => {
    const positions = buildInvoicePositions(
      base({
        packageSlug: "aylik-paket",
        pricingMeta: { fileQuota: 4 },
        payment: {
          amountCents: 4000,
          currency: "pln",
          status: "paid",
          billingKind: "overage",
        },
      }),
    );
    expect(positions[0]!.name).toMatch(/poza limitem/i);
    expect(positions[0]!.details.some((d) => /overage|limicie/i.test(d))).toBe(
      true,
    );
  });

  it("surec-yonetimi sirket", () => {
    const positions = buildInvoicePositions(
      base({
        packageSlug: "surec-yonetimi",
        pricingMeta: { entityType: "sirket" },
        payment: { amountCents: 120000, currency: "pln", status: "paid" },
      }),
    );
    expect(positions[0]!.name).toMatch(/firma|Pelnomocnictwo|Pełnomocnictwo/i);
    expect(positions[0]!.details.some((d) => /firma/i.test(d))).toBe(true);
  });

  it("telefon-gorusme includes slot", () => {
    const positions = buildInvoicePositions(
      base({
        packageSlug: "telefon-gorusme",
        pricingMeta: {
          entityType: "sahis",
          callRequestedAt: "2026-09-20T14:00:00.000Z",
        },
        payment: { amountCents: 15000, currency: "pln", status: "paid" },
      }),
    );
    expect(positions[0]!.details.some((d) => /Preferowany termin/i.test(d))).toBe(
      true,
    );
  });

  it("yerinde-eslik includes city", () => {
    const positions = buildInvoicePositions(
      base({
        packageSlug: "yerinde-eslik",
        pricingMeta: { entityType: "sahis", city: "Krakow" },
        payment: { amountCents: 45000, currency: "pln", status: "paid" },
      }),
    );
    expect(positions[0]!.name).toMatch(/Krakow/);
    expect(positions[0]!.details.some((d) => d.includes("Krakow"))).toBe(true);
  });

  it("summary is non-empty and capped", () => {
    const s = invoicePositionSummary(
      base({
        packageSlug: "tek-yazi",
        pricingMeta: { pageCount: 2 },
        payment: { amountCents: 5000, currency: "pln", status: "paid" },
      }),
    );
    expect(s.length).toBeGreaterThan(10);
    expect(s.length).toBeLessThanOrEqual(240);
  });
});
