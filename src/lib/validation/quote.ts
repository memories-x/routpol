export const serviceTypeValues = [
  "aylik-paket",
  "surec-yonetimi",
  "tek-yazi",
  "ticaret-masasi",
  "yatirimci",
  "isletme",
  "egitim",
  "eslik-firma",
  "eslik-sahis",
  "diger",
  // legacy BPO lead values (still accepted)
  "idari",
  "tedarik",
  "talepler",
  "saha",
] as const;

export const phoneCountryCodes = [
  "+48",
  "+90",
  "+49",
  "+44",
  "+1",
  "+31",
  "+43",
] as const;

import { z } from "zod";

export const quoteRequestSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phoneCountryCode: z.enum(phoneCountryCodes),
  phone: z
    .string()
    .trim()
    .min(6)
    .max(15)
    .regex(/^[0-9\s-]+$/, "Geçersiz telefon"),
  serviceType: z.enum(serviceTypeValues),
  message: z.string().trim().max(2000).optional(),
  privacyAccepted: z
    .boolean()
    .refine((value) => value === true, { message: "required" }),
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
  formStartedAt: z.number().int().positive().optional(),
  locale: z.enum(["tr", "pl", "en"]).optional(),
  source: z.enum(["landing", "contact"]).optional(),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

export function toE164Phone(countryCode: string, phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const local = digits.replace(/^0+/, "");
  return `${countryCode}${local}`;
}
