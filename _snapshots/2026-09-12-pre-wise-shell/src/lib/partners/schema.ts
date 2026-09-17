import { z } from "zod";

const optionalText = (max: number) =>
  z
    .string()
    .max(max)
    .optional()
    .transform((v) => {
      const t = v?.trim();
      return t ? t : undefined;
    });

export const lawyerPartnerInputSchema = z.object({
  name: z.string().trim().min(2).max(160),
  officeName: optionalText(160),
  email: z
    .string()
    .trim()
    .max(160)
    .optional()
    .transform((v) => {
      const t = v?.trim();
      return t ? t : undefined;
    })
    .refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), {
      message: "Geçerli e-posta girin",
    }),
  phone: optionalText(40),
  nip: optionalText(20),
  barNumber: optionalText(40),
  city: optionalText(80),
  address: optionalText(240),
  website: optionalText(200),
  specialty: optionalText(160),
  languages: z.array(z.enum(["pl", "en", "tr"])).max(3).optional(),
  contractStatus: z.enum(["none", "draft", "signed"]).optional(),
  notes: optionalText(2000),
  active: z.boolean().optional(),
});
