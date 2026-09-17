/**
 * Archive stale draft / awaiting_payment cases.
 * Usage: node scripts/cleanup-cases.mjs
 * Or: POST /api/cron/cleanup with header x-cron-secret: $CRON_SECRET
 */
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "cases");
const INDEX = path.join(DATA_DIR, "index.json");
const DRAFT_MS = 1000 * 60 * 60 * 48;
const AWAITING_MS = 1000 * 60 * 60 * 72;

async function main() {
  let ids = [];
  try {
    ids = JSON.parse(await fs.readFile(INDEX, "utf8"));
  } catch {
    console.log("No cases index.");
    return;
  }
  const now = Date.now();
  let n = 0;
  for (const id of ids) {
    const file = path.join(DATA_DIR, `${id}.json`);
    let c;
    try {
      c = JSON.parse(await fs.readFile(file, "utf8"));
    } catch {
      continue;
    }
    const age = now - new Date(c.updatedAt).getTime();
    let changed = false;
    if (c.status === "draft" && age > DRAFT_MS) {
      c.status = "unpaid_archived";
      changed = true;
    } else if (c.status === "awaiting_payment" && age > AWAITING_MS) {
      c.status = "unpaid_archived";
      c.payment = { ...c.payment, status: "failed" };
      changed = true;
    }
    if (changed) {
      c.updatedAt = new Date().toISOString();
      await fs.writeFile(file, JSON.stringify(c, null, 2));
      n += 1;
      console.log("archived", id);
    }
  }
  console.log(`done, archived=${n}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
