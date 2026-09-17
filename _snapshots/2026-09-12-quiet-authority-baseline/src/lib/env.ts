export type PublicEnv = {
  siteUrl: string;
  whatsappE164: string | null;
  defaultLocale: string;
  contactEmail: string | null;
  contactPhone: string | null;
  operatorLegalName: string | null;
  operatorNip: string | null;
  operatorAddress: string | null;
};

export function getPublicEnv(): PublicEnv {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_E164?.replace(/\D/g, "");
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || null;
  return {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    whatsappE164: whatsapp && whatsapp.length >= 8 ? whatsapp : null,
    defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? "tr",
    contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null,
    contactPhone: phone,
    operatorLegalName:
      process.env.NEXT_PUBLIC_OPERATOR_LEGAL_NAME?.trim() || null,
    operatorNip: process.env.NEXT_PUBLIC_OPERATOR_NIP?.trim() || null,
    operatorAddress: process.env.NEXT_PUBLIC_OPERATOR_ADDRESS?.trim() || null,
  };
}

export function getContactEmailTo(): string | null {
  return process.env.CONTACT_EMAIL_TO ?? null;
}

/** Overlay content.contact with public env (no .example in production). */
export function resolvePublicContact(base: {
  emailValue: string;
  phoneValue: string;
}): { emailValue: string; phoneValue: string } {
  const env = getPublicEnv();
  return {
    emailValue: env.contactEmail ?? base.emailValue,
    phoneValue: env.contactPhone ?? base.phoneValue,
  };
}
