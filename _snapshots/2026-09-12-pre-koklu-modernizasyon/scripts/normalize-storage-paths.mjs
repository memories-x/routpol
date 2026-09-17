/**
 * Windows backslash storagePath → POSIX (Linux/Plesk uyumu).
 *
 *   node scripts/normalize-storage-paths.mjs
 *   node scripts/normalize-storage-paths.mjs --dry-run
 */
import { promises as fs } from "fs";
import path from "path";

const ROOT = process.cwd();
const CASES_DIR = path.join(ROOT, "data", "cases");
const DRY = process.argv.includes("--dry-run");

function normalizeStoragePath(value) {
  if (typeof value !== "string") return value;
  return value.replace(/\\/g, "/");
}

function walkJson(value) {
  if (Array.isArray(value)) return value.map(walkJson);
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      if (k === "storagePath" && typeof v === "string") {
        out[k] = normalizeStoragePath(v);
      } else {
        out[k] = walkJson(v);
      }
    }
    return out;
  }
  return value;
}

async function main() {
  let files = 0;
  let changed = 0;
  try {
    const entries = await fs.readdir(CASES_DIR);
    for (const name of entries) {
      if (!name.endsWith(".json")) continue;
      files += 1;
      const fp = path.join(CASES_DIR, name);
      const raw = await fs.readFile(fp, "utf8");
      const data = JSON.parse(raw);
      const next = walkJson(data);
      const before = JSON.stringify(data);
      const after = JSON.stringify(next);
      if (before !== after) {
        changed += 1;
        if (!DRY) {
          await fs.writeFile(fp, `${JSON.stringify(next, null, 2)}\n`, "utf8");
        }
      }
    }
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && err.code === "ENOENT") {
      console.log("[INFO] data/cases yok — atlandı");
      return;
    }
    throw err;
  }
  console.log(
    `[INFO] ${files} dosya tarandı, ${changed} güncellendi${DRY ? " (dry-run)" : ""}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
