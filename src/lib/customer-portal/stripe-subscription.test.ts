import { describe, expect, it } from "vitest";
import { isSubscriptionPackage } from "@/lib/cases/document-slots";
import {
  isLiveSubscriptionStatus,
  isRecurringCheckoutPackage,
} from "@/lib/customer-portal/stripe-subscription";

describe("stripe subscription helpers", () => {
  it("marks aylik and surec as subscription packages", () => {
    expect(isSubscriptionPackage("aylik-paket")).toBe(true);
    expect(isSubscriptionPackage("surec-yonetimi")).toBe(true);
    expect(isSubscriptionPackage("tek-yazi")).toBe(false);
    expect(isSubscriptionPackage("yerinde-eslik")).toBe(false);
  });

  it("aliases recurring checkout packages", () => {
    expect(isRecurringCheckoutPackage("aylik-paket")).toBe(true);
    expect(isRecurringCheckoutPackage("surec-yonetimi")).toBe(true);
    expect(isRecurringCheckoutPackage("tek-yazi")).toBe(false);
  });

  it("treats active-like Stripe statuses as live", () => {
    expect(isLiveSubscriptionStatus("active")).toBe(true);
    expect(isLiveSubscriptionStatus("past_due")).toBe(true);
    expect(isLiveSubscriptionStatus("canceled")).toBe(false);
    expect(isLiveSubscriptionStatus(null)).toBe(false);
  });
});
