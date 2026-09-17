import { describe, expect, it } from "vitest";
import { canUsePasswordReset, normalizeRegister } from "@/lib/customer-portal/membership";
import {
  hashCustomerPassword,
  verifyCustomerPassword,
} from "@/lib/customer-portal/password";

describe("normalizeRegister", () => {
  it("joins individual names", () => {
    const r = normalizeRegister({
      entityType: "sahis",
      firstName: "Ali",
      lastName: "Yılmaz",
      email: "Ali@Mail.COM",
      password: "password12",
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.email).toBe("ali@mail.com");
      expect(r.data.fullName).toBe("Ali Yılmaz");
      expect(r.data.companyName).toBeNull();
    }
  });

  it("requires company name for sirket", () => {
    const r = normalizeRegister({
      entityType: "sirket",
      email: "ops@firm.pl",
      password: "password12",
    });
    expect(r.ok).toBe(false);
  });

  it("uses company as fullName", () => {
    const r = normalizeRegister({
      entityType: "sirket",
      companyName: "Acme Sp. z o.o.",
      email: "ops@firm.pl",
      password: "password12",
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.fullName).toBe("Acme Sp. z o.o.");
      expect(r.data.companyName).toBe("Acme Sp. z o.o.");
    }
  });

  it("rejects short password", () => {
    const r = normalizeRegister({
      entityType: "sahis",
      firstName: "A",
      lastName: "B",
      email: "a@b.co",
      password: "short",
    });
    expect(r.ok).toBe(false);
  });
});

describe("password hash", () => {
  it("verifies argon2 roundtrip", async () => {
    const h = await hashCustomerPassword("password12");
    expect(h).not.toContain("password12");
    expect(await verifyCustomerPassword(h, "password12")).toBe(true);
    expect(await verifyCustomerPassword(h, "wrong-pass1")).toBe(false);
  });
});

describe("canUsePasswordReset", () => {
  it("needs a stored hash", () => {
    expect(canUsePasswordReset(null)).toBe(false);
    expect(canUsePasswordReset("x")).toBe(true);
  });
});
