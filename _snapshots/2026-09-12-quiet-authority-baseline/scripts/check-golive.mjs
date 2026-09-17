/**
 * Go-live env check (no secrets printed).
 * Run: npm run golive:check
 *
 * In CI/production without vars, exits 1.
 * Locally without vars, prints missing list and exits 0 with WARN
 * unless --strict is passed.
 */
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const strict =
  process.argv.includes("--strict") ||
  process.env.VERCEL_ENV === "production" ||
  process.env.PLESK_ENV === "production";

function loadDotEnvFile(p) {
  if (!existsSync(p)) return;
  const raw = readFileSync(p, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (process.env[k] === undefined) process.env[k] = v;
  }
}

function loadDotEnv() {
  loadDotEnvFile(resolve(process.cwd(), ".env"));
  loadDotEnvFile(resolve(process.cwd(), ".env.local"));
}

loadDotEnv();

const required = [
  "NEXT_PUBLIC_SITE_URL",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "RESEND_API_KEY",
  "CONTACT_EMAIL_TO",
  "CONTACT_EMAIL_FROM",
  "PANEL_PASSWORD",
  "PANEL_AUTH_SECRET",
  "CUSTOMER_AUTH_SECRET",
  "DATABASE_URL",
];

const disk =
  (process.env.STORAGE_BACKEND ?? "").trim().toLowerCase() === "fs" ||
  Boolean(process.env.STORAGE_ROOT?.trim());
if (!disk && !process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
  required.push("STORAGE_BACKEND=fs (Plesk) or BLOB_READ_WRITE_TOKEN");
}

const recommended = [
  "NEXT_PUBLIC_CONTACT_EMAIL",
  "NEXT_PUBLIC_CONTACT_PHONE",
  "NEXT_PUBLIC_WHATSAPP_E164",
  "NEXT_PUBLIC_OPERATOR_LEGAL_NAME",
  "NEXT_PUBLIC_OPERATOR_NIP",
  "NEXT_PUBLIC_OPERATOR_ADDRESS",
  "CRON_SECRET",
];

if (strict) {
  required.push(
    "NEXT_PUBLIC_CONTACT_EMAIL",
    "NEXT_PUBLIC_OPERATOR_LEGAL_NAME",
    "NEXT_PUBLIC_OPERATOR_NIP",
    "NEXT_PUBLIC_OPERATOR_ADDRESS",
    "CRON_SECRET",
  );
}

const missing = required.filter((k) => !process.env[k]?.trim());
const warn = recommended.filter(
  (k) => !required.includes(k) && !process.env[k]?.trim(),
);

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "";
if (site && /localhost|127\.0\.0\.1/i.test(site) && strict) {
  missing.push("NEXT_PUBLIC_SITE_URL(must be public https in production)");
}

const stripe = process.env.STRIPE_SECRET_KEY ?? "";
if (strict && stripe.startsWith("sk_test_")) {
  missing.push("STRIPE_SECRET_KEY(sk_live_ required with --strict, not sk_test_)");
}

console.log("[golive:check]");
console.log("  missing required:", missing.length ? missing.join(", ") : "(none)");
console.log("  missing recommended:", warn.length ? warn.join(", ") : "(none)");

if (missing.length) {
  if (strict) {
    console.error("[FAIL] Fill required env before production.");
    process.exit(1);
  }
  console.warn("[WARN] Local/dev: required env incomplete. OK until production.");
  process.exit(0);
}

console.log("[OK] Required go-live env present.");
process.exit(0);
