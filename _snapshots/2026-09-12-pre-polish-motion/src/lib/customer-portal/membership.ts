import { CUSTOMER_PASSWORD_MAX, CUSTOMER_PASSWORD_MIN } from "./password";

export type EntityType = "sahis" | "sirket";

export type RegisterBody = {
  entityType?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  companyName?: unknown;
  email?: unknown;
  password?: unknown;
  phone?: unknown;
  locale?: unknown;
};

export type NormalizedRegister = {
  entityType: EntityType;
  fullName: string;
  companyName: string | null;
  email: string;
  password: string;
  phone: string;
  locale: "tr" | "pl" | "en";
};

function asTrimmed(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeRegister(
  body: RegisterBody,
): { ok: true; data: NormalizedRegister } | { ok: false; message: string } {
  const entityType = body.entityType;
  if (entityType !== "sahis" && entityType !== "sirket") {
    return { ok: false, message: "entityType must be sahis or sirket" };
  }

  const email = asTrimmed(body.email).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
    return { ok: false, message: "Valid email required" };
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (
    password.length < CUSTOMER_PASSWORD_MIN ||
    password.length > CUSTOMER_PASSWORD_MAX
  ) {
    return {
      ok: false,
      message: `Password must be ${CUSTOMER_PASSWORD_MIN}–${CUSTOMER_PASSWORD_MAX} characters`,
    };
  }

  const localeRaw = asTrimmed(body.locale);
  const locale =
    localeRaw === "pl" || localeRaw === "en" ? localeRaw : "tr";

  const phone = asTrimmed(body.phone).slice(0, 30);

  if (entityType === "sahis") {
    const firstName = asTrimmed(body.firstName);
    const lastName = asTrimmed(body.lastName);
    if (firstName.length < 1 || lastName.length < 1) {
      return { ok: false, message: "First and last name required" };
    }
    if (firstName.length > 80 || lastName.length > 80) {
      return { ok: false, message: "Name too long" };
    }
    return {
      ok: true,
      data: {
        entityType,
        fullName: `${firstName} ${lastName}`.trim(),
        companyName: null,
        email,
        password,
        phone,
        locale,
      },
    };
  }

  const companyName = asTrimmed(body.companyName);
  if (companyName.length < 2) {
    return { ok: false, message: "Company name required" };
  }
  if (companyName.length > 120) {
    return { ok: false, message: "Company name too long" };
  }
  return {
    ok: true,
    data: {
      entityType,
      fullName: companyName,
      companyName,
      email,
      password,
      phone,
      locale,
    },
  };
}

export function canUsePasswordReset(passwordHash: string | null | undefined): boolean {
  return Boolean(passwordHash);
}
