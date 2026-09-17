# Snapshot restore helper
# Usage: node scripts/restore-snapshot.js 2026-08-20-pre-structure-v0.7.2
# Or:    node scripts/restore-snapshot.js   (uses latest under _snapshots/)

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const snapRoot = path.join(root, "_snapshots");
const arg = process.argv[2];

function fail(msg) {
  console.error("[CRITICAL]", msg);
  process.exit(1);
}

if (!fs.existsSync(snapRoot)) fail("_snapshots/ missing");

let name = arg;
if (!name) {
  const dirs = fs
    .readdirSync(snapRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
  if (dirs.length === 0) fail("no snapshots");
  name = dirs[dirs.length - 1];
}

const src = path.join(snapRoot, name);
if (!fs.existsSync(src)) fail(`snapshot not found: ${name}`);

const copyDirs = ["src", "public", "prisma", "docs", "scripts", "e2e", "knowledge"];
for (const d of copyDirs) {
  const from = path.join(src, d);
  const to = path.join(root, d);
  if (!fs.existsSync(from)) continue;
  fs.rmSync(to, { recursive: true, force: true });
  fs.cpSync(from, to, { recursive: true });
  console.log("[INFO] restored", d);
}

for (const f of fs.readdirSync(src)) {
  const from = path.join(src, f);
  if (!fs.statSync(from).isFile()) continue;
  if (f === "RESTORE.md") continue;
  fs.copyFileSync(from, path.join(root, f));
  console.log("[INFO] restored", f);
}

console.log("[INFO] snapshot restored:", name);
console.log("[INFO] run: npm install && npm test && npm run build");
