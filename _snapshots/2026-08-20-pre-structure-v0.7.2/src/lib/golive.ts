/**
 * Production go-live gates — call at sensitive API entrypoints.
 * Secrets themselves stay in env (operator fills); this only fail-closes.
 *
 * Hosting: Plesk Node.js (default) or Vercel.
 * Files: disk (`STORAGE_BACKEND=fs`) on Plesk, or Vercel Blob.
 */

export type GoliveCheck = {
  ok: boolean;
  missing: string[];
  warnings: string[];
};

export function isProductionRuntime(): boolean {
  return (
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL_ENV === "production"
  );
}

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

/** Plesk / VPS: local disk for PDFs (no Vercel Blob). */
export function isDiskStorageEnabled(): boolean {
  const mode = (process.env.STORAGE_BACKEND ?? "").trim().toLowerCase();
  if (mode === "fs" || mode === "disk" || mode === "local") return true;
  if (process.env.STORAGE_ROOT?.trim()) return true;
  return false;
}

export function checkGoliveConfig(): GoliveCheck {
  const missing: string[] = [];
  const warnings: string[] = [];

  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    missing.push("NEXT_PUBLIC_SITE_URL");
  } else if (
    process.env.NEXT_PUBLIC_SITE_URL.includes("localhost") &&
    isProductionRuntime()
  ) {
    missing.push("NEXT_PUBLIC_SITE_URL (must be public https URL in production)");
  }

  if (!process.env.STRIPE_SECRET_KEY) missing.push("STRIPE_SECRET_KEY");
  if (!process.env.STRIPE_WEBHOOK_SECRET) missing.push("STRIPE_WEBHOOK_SECRET");
  if (!process.env.RESEND_API_KEY) missing.push("RESEND_API_KEY");
  if (!process.env.CONTACT_EMAIL_TO) missing.push("CONTACT_EMAIL_TO");
  if (!process.env.CONTACT_EMAIL_FROM) missing.push("CONTACT_EMAIL_FROM");
  if (!process.env.PANEL_PASSWORD) missing.push("PANEL_PASSWORD");
  if (!process.env.PANEL_AUTH_SECRET) missing.push("PANEL_AUTH_SECRET");
  if (!process.env.CUSTOMER_AUTH_SECRET) missing.push("CUSTOMER_AUTH_SECRET");
  if (!process.env.DATABASE_URL) missing.push("DATABASE_URL");

  if (!isBlobConfigured() && !isDiskStorageEnabled()) {
    missing.push("STORAGE_BACKEND=fs (Plesk) or BLOB_READ_WRITE_TOKEN (Vercel)");
  }

  if (!process.env.NEXT_PUBLIC_CONTACT_EMAIL) {
    warnings.push("NEXT_PUBLIC_CONTACT_EMAIL (site shows placeholder)");
  }
  if (!process.env.NEXT_PUBLIC_WHATSAPP_E164) {
    warnings.push("NEXT_PUBLIC_WHATSAPP_E164 (WhatsApp CTA hidden)");
  }
  if (!process.env.NEXT_PUBLIC_OPERATOR_LEGAL_NAME) {
    warnings.push("NEXT_PUBLIC_OPERATOR_LEGAL_NAME (privacy page)");
  }
  if (!process.env.CRON_SECRET) {
    warnings.push("CRON_SECRET (scheduled cleanup/outbox not configured)");
  }

  return { ok: missing.length === 0, missing, warnings };
}

/** Throws in production when critical env missing. */
export function assertProductionReady(scope: string): void {
  if (!isProductionRuntime()) return;
  const { ok, missing } = checkGoliveConfig();
  if (!ok) {
    console.error(`[golive:${scope}] missing`, missing);
    throw new Error(`PRODUCTION_MISCONFIGURED:${missing.join(",")}`);
  }
}
