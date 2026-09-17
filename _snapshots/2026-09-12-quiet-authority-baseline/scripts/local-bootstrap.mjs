/**
 * Local secrets + disk storage. Does not start Docker.
 * Postgres = Plesk (or native). Leave DATABASE_URL unset locally → file store.
 * Run: node scripts/local-bootstrap.mjs
 */
import { randomBytes } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(process.cwd(), ".env");
const dataDir = resolve(process.cwd(), "data", "pol-turk-files");

function parseEnv(raw) {
  const map = new Map();
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#") || !t.includes("=")) continue;
    const i = t.indexOf("=");
    map.set(t.slice(0, i).trim(), t.slice(i + 1).trim().replace(/^["']|["']$/g, ""));
  }
  return map;
}

function secret() {
  return randomBytes(32).toString("hex");
}

let existing = new Map();
if (existsSync(envPath)) {
  existing = parseEnv(readFileSync(envPath, "utf8"));
}

const defaults = {
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
  NEXT_PUBLIC_DEFAULT_LOCALE: "tr",
  STORAGE_BACKEND: "fs",
  STORAGE_ROOT: "./data/pol-turk-files",
  PANEL_PASSWORD: "local-dev-only",
  PANEL_AUTH_SECRET: existing.get("PANEL_AUTH_SECRET") || secret(),
  CUSTOMER_AUTH_SECRET: existing.get("CUSTOMER_AUTH_SECRET") || secret(),
  CRON_SECRET: existing.get("CRON_SECRET") || secret(),
  CONTACT_EMAIL_TO: "dev@localhost",
  CONTACT_EMAIL_FROM: "POL-TURK <dev@localhost>",
  PACKAGE_CURRENCY: "pln",
  TRUSTED_PROXY_HOPS: "1",
};

const toWrite = [];
for (const [k, v] of Object.entries(defaults)) {
  const cur = existing.get(k);
  if (cur) continue;
  toWrite.push([k, v]);
}

mkdirSync(dataDir, { recursive: true });

if (toWrite.length) {
  const block = [
    "",
    "# --- local-bootstrap (dev; DATABASE_URL yazılmaz — Docker yok) ---",
    ...toWrite.map(([k, v]) => `${k}=${v}`),
    "",
  ].join("\n");
  writeFileSync(
    envPath,
    (existsSync(envPath) ? readFileSync(envPath, "utf8") : "") + block,
  );
  console.log(
    "[INFO] Wrote",
    toWrite.length,
    "keys to .env (names only):",
    toWrite.map(([k]) => k).join(", "),
  );
} else {
  console.log("[INFO] .env already has local bootstrap keys.");
}

if (existing.get("DATABASE_URL")?.trim()) {
  console.log(
    "[INFO] DATABASE_URL set — run: npx prisma migrate deploy (Plesk or native Postgres, not Docker).",
  );
} else {
  console.log(
    "[INFO] DATABASE_URL empty: local file store. Live: Plesk Databases → PostgreSQL, then migrate.",
  );
}
