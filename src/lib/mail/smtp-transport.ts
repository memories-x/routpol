import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let cached: Transporter | null = null;

export function isSmtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST?.trim());
}

export function getSmtpFrom(): string {
  return (
    process.env.SMTP_FROM?.trim() ||
    process.env.CONTACT_EMAIL_FROM?.trim() ||
    "ROUTEPOL <noreply@localhost>"
  );
}

export function getSmtpTransport(): Transporter {
  const host = process.env.SMTP_HOST?.trim();
  if (!host) throw new Error("SMTP_HOST missing");

  if (cached) return cached;

  const port = Number(process.env.SMTP_PORT?.trim() || "587");
  const secure =
    process.env.SMTP_SECURE?.trim() === "1" ||
    process.env.SMTP_SECURE?.toLowerCase() === "true" ||
    port === 465;

  cached = nodemailer.createTransport({
    host,
    port,
    secure,
    auth:
      process.env.SMTP_USER?.trim() || process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER?.trim() || "",
            pass: process.env.SMTP_PASS || "",
          }
        : undefined,
  });

  return cached;
}

/** Test hook — clear cached transporter. */
export function resetSmtpTransportCache(): void {
  cached = null;
}
