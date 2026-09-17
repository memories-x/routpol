import { afterEach, describe, expect, it, vi } from "vitest";
import { checkGoliveConfig, isStripeTestSecret } from "@/lib/golive";

function fillRequired(overrides: Record<string, string> = {}) {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.pl");
  vi.stubEnv("STRIPE_SECRET_KEY", "sk_live_x");
  vi.stubEnv("STRIPE_WEBHOOK_SECRET", "whsec_x");
  vi.stubEnv("RESEND_API_KEY", "re_x");
  vi.stubEnv("CONTACT_EMAIL_TO", "ops@example.pl");
  vi.stubEnv("CONTACT_EMAIL_FROM", "ROUTEPOL <noreply@example.pl>");
  vi.stubEnv("PANEL_PASSWORD", "x");
  vi.stubEnv("PANEL_AUTH_SECRET", "x");
  vi.stubEnv("CUSTOMER_AUTH_SECRET", "x");
  vi.stubEnv("DATABASE_URL", "postgresql://x");
  vi.stubEnv("STORAGE_BACKEND", "fs");
  vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "hello@example.pl");
  vi.stubEnv("NEXT_PUBLIC_OPERATOR_LEGAL_NAME", "Example Sp. z o.o.");
  vi.stubEnv("NEXT_PUBLIC_OPERATOR_NIP", "1234567890");
  vi.stubEnv("NEXT_PUBLIC_OPERATOR_ADDRESS", "Warszawa");
  vi.stubEnv("CRON_SECRET", "cron-x");
  for (const [k, v] of Object.entries(overrides)) {
    vi.stubEnv(k, v);
  }
}

describe("golive", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("detects Stripe test secrets", () => {
    expect(isStripeTestSecret("sk_test_abc")).toBe(true);
    expect(isStripeTestSecret("sk_live_abc")).toBe(false);
  });

  it("accepts a complete live config in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    fillRequired();
    const check = checkGoliveConfig();
    expect(check.missing).toEqual([]);
    expect(check.ok).toBe(true);
  });

  it("rejects sk_test_ in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    fillRequired({ STRIPE_SECRET_KEY: "sk_test_abc" });
    const check = checkGoliveConfig();
    expect(check.ok).toBe(false);
    expect(check.missing.join(" ")).toMatch(/sk_live_/);
  });

  it("rejects missing operator identity in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    fillRequired({ NEXT_PUBLIC_OPERATOR_NIP: "" });
    const check = checkGoliveConfig();
    expect(check.ok).toBe(false);
    expect(check.missing).toContain("NEXT_PUBLIC_OPERATOR_NIP");
  });
});
