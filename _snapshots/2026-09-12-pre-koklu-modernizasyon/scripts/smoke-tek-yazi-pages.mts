/**
 * Smoke checks for tek-yazi page count → price (no Next server).
 * Run: npx tsx scripts/smoke-tek-yazi-pages.mts
 */
import { PDFDocument } from "pdf-lib";
import {
  countPagesInBytes,
  sumStoredMektupPages,
  TEK_YAZI_MAX_PAGES,
} from "../src/lib/cases/count-pages";
import { tekYaziAmountCents } from "../src/lib/cases/pricing";
import { resolveTekYaziPriceFromCase } from "../src/lib/cases/tek-yazi-price";
import { MEKTUP_SLOT } from "../src/lib/cases/document-slots";

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(msg);
}

async function pdfWithPages(n: number): Promise<Uint8Array> {
  const d = await PDFDocument.create();
  for (let i = 0; i < n; i++) d.addPage();
  return d.save();
}

async function main() {
  assert(tekYaziAmountCents(1) === 5000, "1 page = 50zl");
  assert(tekYaziAmountCents(2) === 5000, "2 pages = 50zl");
  assert(tekYaziAmountCents(3) === 7500, "3 pages = 75zl");
  assert(tekYaziAmountCents(5) === 12500, "5 pages = 125zl");

  const three = await pdfWithPages(3);
  assert(
    (await countPagesInBytes(three, "application/pdf")) === 3,
    "pdf count 3",
  );

  const five = await pdfWithPages(5);
  assert(
    (await countPagesInBytes(five, "application/pdf")) === 5,
    "pdf count 5",
  );

  const png = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
  assert(
    (await countPagesInBytes(png, "image/png", "a.png")) === 1,
    "png = 1",
  );

  let emptyFailed = false;
  try {
    await countPagesInBytes(new Uint8Array(), "application/pdf");
  } catch {
    emptyFailed = true;
  }
  assert(emptyFailed, "empty file must fail");

  const priced = resolveTekYaziPriceFromCase({
    packageSlug: "tek-yazi",
    documents: [{ slotKey: MEKTUP_SLOT, pageCount: 4 }],
  });
  assert(priced.ok && priced.pageCount === 4, "resolve 4 pages");
  assert(priced.ok && priced.amountCents === 10000, "4 pages = 100zl");

  const tooMany = resolveTekYaziPriceFromCase({
    packageSlug: "tek-yazi",
    documents: [{ slotKey: MEKTUP_SLOT, pageCount: TEK_YAZI_MAX_PAGES + 1 }],
  });
  assert(!tooMany.ok && tooMany.code === "TOO_MANY_PAGES", "cap enforced");

  const sum = sumStoredMektupPages(
    [
      { slotKey: MEKTUP_SLOT, pageCount: 2 },
      { slotKey: MEKTUP_SLOT, pageCount: 3 },
    ],
    MEKTUP_SLOT,
  );
  assert(sum === 5, "sum multi-file pages");

  const missing = sumStoredMektupPages(
    [{ slotKey: MEKTUP_SLOT }],
    MEKTUP_SLOT,
  );
  assert(missing === null, "missing pageCount → null");

  console.log("[OK] smoke-tek-yazi-pages passed");
}

main().catch((e) => {
  console.error("[FAIL]", e);
  process.exit(1);
});
