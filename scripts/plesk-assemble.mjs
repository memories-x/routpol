/**
 * After `next build`, copy static + public into standalone for Plesk.
 * Startup file: .next/standalone/server.js
 */
import { cpSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");
const staticSrc = join(root, ".next", "static");
const staticDest = join(standalone, ".next", "static");
const publicSrc = join(root, "public");
const publicDest = join(standalone, "public");

if (!existsSync(standalone)) {
  console.error("[plesk:assemble] missing .next/standalone — run next build first");
  process.exit(1);
}

mkdirSync(join(standalone, ".next"), { recursive: true });
if (existsSync(staticSrc)) {
  cpSync(staticSrc, staticDest, { recursive: true });
  console.log("[plesk:assemble] copied .next/static");
}
if (existsSync(publicSrc)) {
  cpSync(publicSrc, publicDest, { recursive: true });
  console.log("[plesk:assemble] copied public");
}

const prismaSrc = join(root, "node_modules", ".prisma");
const prismaDest = join(standalone, "node_modules", ".prisma");
if (existsSync(prismaSrc)) {
  mkdirSync(join(standalone, "node_modules"), { recursive: true });
  cpSync(prismaSrc, prismaDest, { recursive: true });
  console.log("[plesk:assemble] copied Prisma engines");
}

console.log("[plesk:assemble] OK — startup: plesk-server.js");
