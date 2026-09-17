import { describe, expect, it } from "vitest";
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
  yerindeEslikAmountCents,
} from "./pricing";

describe("yerinde-eslik package", () => {
  it("is checkoutable; docs optional; fixed half-day price", () => {
    expect(isCheckoutablePackage("yerinde-eslik")).toBe(true);
    expect(isLetterPackage("yerinde-eslik")).toBe(true);
    expect(packageRequiresDocumentUploads("yerinde-eslik")).toBe(false);
    expect(packageAllowsCustomerUploads("yerinde-eslik")).toBe(true);
    expect(
      customerSlotsFor("yerinde-eslik").some(
        (s) => s.key === EK_FORM_SLOT && !s.required,
      ),
    ).toBe(true);
    expect(yerindeEslikAmountCents()).toBe(45000);
    expect(
      getAmountCentsForMeta("yerinde-eslik", {
        city: "Kraków",
        entityType: "sahis",
      }),
    ).toBe(45000);
  });

  it("requires city and entityType", () => {
    expect(normalizePricingMeta("yerinde-eslik", {})).toEqual({
      error: "city required (2–80 chars)",
    });
    expect(
      normalizePricingMeta("yerinde-eslik", { city: "Warszawa" }),
    ).toEqual({ error: "entityType must be sahis or sirket" });
    expect(
      normalizePricingMeta("yerinde-eslik", {
        city: "Gdańsk",
        entityType: "sirket",
      }),
    ).toEqual({ city: "Gdańsk", entityType: "sirket" });
  });
});
