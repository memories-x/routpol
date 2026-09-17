import { describe, expect, it } from "vitest";
import {
  datetimeLocalMinWarsaw,
  formatCallSlot,
  parseCallRequestedAt,
  toWarsawDatetimeLocal,
} from "./call-schedule";
import {
  EK_FORM_SLOT,
  customerSlotsFor,
  isCheckoutablePackage,
  isLetterPackage,
  packageAllowsCustomerUploads,
  packageRequiresDocumentUploads,
} from "./document-slots";
import {
  getAmountCentsForMeta,
  normalizePricingMeta,
  telefonGorusmeAmountCents,
} from "./pricing";

/** ~30 days ahead, Warsaw wall — always inside 90-day window. */
function futureLocal(daysAhead: number, hour = 14, minute = 0): string {
  const utc = Date.now() + daysAhead * 24 * 60 * 60 * 1000;
  const local = toWarsawDatetimeLocal(new Date(utc));
  // Force hour/minute for deterministic CET/CEST checks when possible
  return `${local.slice(0, 11)}${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

describe("call-schedule Europe/Warsaw", () => {
  it("round-trips datetime-local as Warsaw wall clock", () => {
    const local = futureLocal(20, 14, 0);
    const iso = parseCallRequestedAt(local);
    expect(typeof iso).toBe("string");
    if (typeof iso === "string") {
      expect(toWarsawDatetimeLocal(iso)).toBe(local);
      // Offset should be CET (+1) or CEST (+2)
      const utcHour = new Date(iso).getUTCHours();
      const wallHour = Number(local.slice(11, 13));
      const diff = (wallHour - utcHour + 24) % 24;
      expect([1, 2]).toContain(diff);
    }
  });

  it("rejects past and too-far slots", () => {
    expect(parseCallRequestedAt("2020-01-01T12:00")).toEqual({
      error: "callRequestedAt must be in the future",
    });
    expect(parseCallRequestedAt("2030-06-01T10:00")).toEqual({
      error: "callRequestedAt too far",
    });
    expect(datetimeLocalMinWarsaw().length).toBe(16);
    const ok = parseCallRequestedAt(futureLocal(10, 11, 30));
    expect(typeof ok).toBe("string");
    if (typeof ok === "string") {
      expect(formatCallSlot(ok, "tr").length).toBeGreaterThan(4);
    }
  });
});

describe("telefon-gorusme package (not sold — legacy)", () => {
  it("is not checkoutable; pricing/slots still work for legacy cases", () => {
    expect(isCheckoutablePackage("telefon-gorusme")).toBe(false);
    expect(isLetterPackage("telefon-gorusme")).toBe(true);
    expect(packageRequiresDocumentUploads("telefon-gorusme")).toBe(false);
    expect(packageAllowsCustomerUploads("telefon-gorusme")).toBe(true);
    expect(
      customerSlotsFor("telefon-gorusme").some(
        (s) => s.key === EK_FORM_SLOT && !s.required,
      ),
    ).toBe(true);
    expect(telefonGorusmeAmountCents()).toBe(15000);
    expect(getAmountCentsForMeta("telefon-gorusme", {})).toBe(15000);
    expect(normalizePricingMeta("telefon-gorusme", {})).toEqual({
      error: "callRequestedAt required",
    });

    const slot = futureLocal(12, 11, 30);
    expect(
      normalizePricingMeta("telefon-gorusme", {
        callRequestedAt: slot,
      }),
    ).toEqual({ error: "entityType must be sahis or sirket" });

    const meta = normalizePricingMeta("telefon-gorusme", {
      callRequestedAt: slot,
      entityType: "sahis",
    });
    expect(meta).toMatchObject({ entityType: "sahis" });
    expect(typeof (meta as { callRequestedAt?: string }).callRequestedAt).toBe(
      "string",
    );
  });
});
