import { promises as fs } from "fs";
import path from "path";
import { isDatabaseConfigured } from "@/lib/db";

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function padSeq(n: number): string {
  return String(n).padStart(3, "0");
}

export function formatInvoiceNumber(
  year: number,
  month: number,
  seq: number,
): string {
  return `FV/${year}/${pad2(month)}/${padSeq(seq)}`;
}

function yearMonthKey(d = new Date()): { key: string; year: number; month: number } {
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth() + 1;
  return {
    key: `${year}-${pad2(month)}`,
    year,
    month,
  };
}

function sequenceRoot(): string {
  const custom = process.env.STORAGE_ROOT?.trim();
  const root = custom
    ? path.resolve(custom)
    : path.join(process.cwd(), "data");
  return path.join(root, "invoice-sequence");
}

async function nextSeqFromFs(yearMonth: string): Promise<number> {
  const dir = sequenceRoot();
  await fs.mkdir(dir, { recursive: true });
  const counterPath = path.join(dir, `${yearMonth}.json`);
  const lockPath = path.join(dir, `${yearMonth}.lock`);

  const maxAttempts = 80;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const fh = await fs.open(lockPath, "wx");
      try {
        let last = 0;
        try {
          const raw = await fs.readFile(counterPath, "utf8");
          const parsed = JSON.parse(raw) as { lastSeq?: number };
          if (typeof parsed.lastSeq === "number" && parsed.lastSeq >= 0) {
            last = parsed.lastSeq;
          }
        } catch (err) {
          const code = (err as NodeJS.ErrnoException)?.code;
          if (code !== "ENOENT") throw err;
        }
        const next = last + 1;
        await fs.writeFile(
          counterPath,
          JSON.stringify({ lastSeq: next }, null, 0),
          "utf8",
        );
        return next;
      } finally {
        await fh.close();
        await fs.unlink(lockPath).catch(() => undefined);
      }
    } catch (err) {
      const code = (err as NodeJS.ErrnoException)?.code;
      if (code === "EEXIST") {
        await new Promise((r) => setTimeout(r, 15 + attempt * 5));
        continue;
      }
      throw err;
    }
  }
  throw new Error("INVOICE_SEQUENCE_LOCK_TIMEOUT");
}

async function nextSeqFromDb(yearMonth: string): Promise<number> {
  const { getPrisma } = await import("@/lib/db");
  const prisma = getPrisma();
  const row = await prisma.invoiceSequence.upsert({
    where: { yearMonth },
    create: { yearMonth, lastSeq: 1 },
    update: { lastSeq: { increment: 1 } },
  });
  return row.lastSeq;
}

/**
 * Atomik FV/YYYY/MM/XXX — Postgres InvoiceSequence tercih; yoksa STORAGE_ROOT fs lock.
 */
export async function nextInvoiceNumber(now = new Date()): Promise<string> {
  const { key, year, month } = yearMonthKey(now);
  let seq: number;
  if (isDatabaseConfigured()) {
    try {
      seq = await nextSeqFromDb(key);
    } catch (err) {
      console.error("[invoice-sequence:db]", err);
      seq = await nextSeqFromFs(key);
    }
  } else {
    seq = await nextSeqFromFs(key);
  }
  return formatInvoiceNumber(year, month, seq);
}
