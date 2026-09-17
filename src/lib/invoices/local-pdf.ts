import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import type { CaseRecord } from "@/lib/cases/types";
import {
  defaultExemptTaxKind,
  sellerIdentity,
} from "@/lib/invoices/config";
import { amountInWordsPln } from "@/lib/invoices/amount-words-pl";
import { buildInvoicePositions } from "@/lib/invoices/line-item";

const A4_W = 595.28;
const A4_H = 841.89;
const MARGIN = 40;

const ink = rgb(0.1, 0.12, 0.16);
const muted = rgb(0.4, 0.43, 0.48);
const rule = rgb(0.78, 0.8, 0.84);
const headBg = rgb(0.93, 0.94, 0.96);
const accent = rgb(0.12, 0.14, 0.18);

/** Helvetica WinAnsi — fold PL diacritics for portable PDF. */
export function pdfSafeText(input: string): string {
  return input
    .replace(/ą/g, "a")
    .replace(/Ą/g, "A")
    .replace(/ć/g, "c")
    .replace(/Ć/g, "C")
    .replace(/ę/g, "e")
    .replace(/Ę/g, "E")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .replace(/ń/g, "n")
    .replace(/Ń/g, "N")
    .replace(/ó/g, "o")
    .replace(/Ó/g, "O")
    .replace(/ś/g, "s")
    .replace(/Ś/g, "S")
    .replace(/ź/g, "z")
    .replace(/Ź/g, "Z")
    .replace(/ż/g, "z")
    .replace(/Ż/g, "Z")
    .replace(/[^\x20-\x7E\u00A0-\u00FF]/g, "?");
}

function money(cents: number): string {
  const n = (cents / 100).toFixed(2).replace(".", ",");
  const [a, b] = n.split(",");
  const withSpaces = (a || "0").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${withSpaces},${b}`;
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function drawText(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  size: number,
  font: PDFFont,
  color = ink,
): void {
  page.drawText(pdfSafeText(text), { x, y, size, font, color });
}

function drawRight(
  page: PDFPage,
  text: string,
  right: number,
  y: number,
  size: number,
  font: PDFFont,
  color = ink,
): void {
  const t = pdfSafeText(text);
  const w = font.widthOfTextAtSize(t, size);
  page.drawText(t, { x: right - w, y, size, font, color });
}

function wrapLines(
  text: string,
  font: PDFFont,
  size: number,
  maxWidth: number,
): string[] {
  const words = pdfSafeText(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (font.widthOfTextAtSize(next, size) <= maxWidth) {
      cur = next;
    } else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines.length ? lines : [""];
}

/**
 * Classic PL faktura structure (działalność nierejestrowana / VAT zw),
 * clean modern spacing — not a SaaS receipt.
 */
export async function buildLocalInvoicePdf(params: {
  record: CaseRecord;
  number: string;
  issuedAt?: Date;
}): Promise<Buffer> {
  const issuedAt = params.issuedAt ?? new Date();
  const seller = sellerIdentity();
  const exempt = defaultExemptTaxKind();
  const amount = params.record.payment.amountCents;
  const date = isoDate(issuedAt);
  const place =
    seller.city ||
    process.env.SELLER_PLACE?.trim() ||
    "Polska";

  const doc = await PDFDocument.create();
  const page = doc.addPage([A4_W, A4_H]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  let y = A4_H - MARGIN;

  // —— Meta (top right) ——
  const metaX = 360;
  const metaW = A4_W - MARGIN - metaX;
  const metaRows: [string, string][] = [
    ["Miejsce wystawienia", place],
    ["Data sprzedazy", date],
    ["Data wystawienia", date],
  ];
  for (const [label, value] of metaRows) {
    page.drawRectangle({
      x: metaX,
      y: y - 14,
      width: metaW,
      height: 16,
      color: headBg,
    });
    drawText(page, label, metaX + 6, y - 10, 7, fontBold, muted);
    drawRight(page, value, metaX + metaW - 6, y - 10, 8, font);
    y -= 18;
  }

  // —— Left payment strip ——
  let leftY = A4_H - MARGIN;
  drawText(page, "Forma platnosci", MARGIN, leftY - 8, 7, fontBold, muted);
  leftY -= 18;
  drawText(page, "Oplacono (karta / Stripe)", MARGIN, leftY - 2, 9, font);
  leftY -= 16;
  if (seller.bankAccount) {
    drawText(page, "Nr rachunku (opcjonalnie)", MARGIN, leftY - 2, 7, fontBold, muted);
    leftY -= 14;
    drawText(page, seller.bankAccount, MARGIN, leftY - 2, 8, font);
    leftY -= 14;
  }
  drawText(page, "Termin zaplaty", MARGIN, leftY - 2, 7, fontBold, muted);
  leftY -= 14;
  drawText(page, "Oplacono", MARGIN, leftY - 2, 9, font);

  y = Math.min(y, leftY) - 20;

  // —— Seller / Buyer boxes ——
  const boxH = 88;
  const gap = 12;
  const boxW = (A4_W - MARGIN * 2 - gap) / 2;
  const boxY = y - boxH;

  const drawParty = (
    x: number,
    title: string,
    lines: string[],
  ) => {
    page.drawRectangle({
      x,
      y: boxY + boxH - 16,
      width: boxW,
      height: 16,
      color: headBg,
    });
    page.drawRectangle({
      x,
      y: boxY,
      width: boxW,
      height: boxH,
      borderColor: rule,
      borderWidth: 0.8,
    });
    drawText(page, title, x + 8, boxY + boxH - 12, 8, fontBold, muted);
    let ty = boxY + boxH - 28;
    for (const line of lines.slice(0, 5)) {
      const wrapped = wrapLines(line, font, 9, boxW - 16);
      for (const wl of wrapped) {
        drawText(page, wl, x + 8, ty, 9, font);
        ty -= 11;
        if (ty < boxY + 6) break;
      }
      if (ty < boxY + 6) break;
    }
  };

  const sellerLines = [
    seller.name || "—",
    ...((seller.address || "—").split(/\r?\n/).map((s) => s.trim()).filter(Boolean)),
    seller.nip ? `NIP: ${seller.nip}` : seller.pesel ? `PESEL: ${seller.pesel}` : "",
  ].filter(Boolean);

  const buyer = params.record.customer;
  const buyerLines = [
    buyer.companyName?.trim() || buyer.fullName,
    buyer.companyName?.trim() ? buyer.fullName : "",
    buyer.shippingAddress?.trim() || "",
    buyer.nip?.trim() ? `NIP: ${buyer.nip.trim()}` : "",
    buyer.email,
  ].filter(Boolean);

  drawParty(MARGIN, "Sprzedawca", sellerLines);
  drawParty(MARGIN + boxW + gap, "Nabywca", buyerLines);
  y = boxY - 28;

  // —— Title ——
  const title = `Faktura bez VAT nr ${params.number}`;
  const titleSize = 14;
  const tw = fontBold.widthOfTextAtSize(pdfSafeText(title), titleSize);
  drawText(
    page,
    title,
    (A4_W - tw) / 2,
    y,
    titleSize,
    fontBold,
    accent,
  );
  drawRight(page, "ORYGINAL", A4_W - MARGIN, y, 8, fontBold, muted);
  y -= 22;

  // —— Line table ——
  const cols = {
    lp: MARGIN,
    name: MARGIN + 22,
    qty: 318,
    unit: 348,
    netto: 390,
    vatPct: 450,
    vat: 478,
    brutto: A4_W - MARGIN,
  } as const;

  const headerH = 18;
  page.drawRectangle({
    x: MARGIN,
    y: y - headerH + 4,
    width: A4_W - MARGIN * 2,
    height: headerH,
    color: headBg,
  });
  const hy = y - 8;
  drawText(page, "Lp.", cols.lp + 2, hy, 7, fontBold, muted);
  drawText(page, "Nazwa", cols.name, hy, 7, fontBold, muted);
  drawRight(page, "Ilosc", cols.qty + 20, hy, 7, fontBold, muted);
  drawText(page, "j.m.", cols.unit, hy, 7, fontBold, muted);
  drawRight(page, "Netto", cols.netto + 28, hy, 7, fontBold, muted);
  drawText(page, "VAT", cols.vatPct, hy, 7, fontBold, muted);
  drawRight(page, "VAT", cols.vat + 22, hy, 7, fontBold, muted);
  drawRight(page, "Brutto", cols.brutto, hy, 7, fontBold, muted);
  y -= headerH + 4;

  const positions = buildInvoicePositions(params.record);
  const nameColW = cols.qty - cols.name - 8;

  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i]!;
    const nameLines = [
      ...wrapLines(pos.name, fontBold, 8, nameColW),
      ...pos.details.flatMap((d) => wrapLines(d, font, 7, nameColW)),
    ];
    const rowTop = y;
    const rowH = Math.max(22, nameLines.length * 9 + 10);
    drawText(page, String(i + 1), cols.lp + 4, rowTop - 10, 8, font);
    let ny = rowTop - 10;
    for (let li = 0; li < nameLines.length; li++) {
      const nl = nameLines[li]!;
      drawText(
        page,
        nl,
        cols.name,
        ny,
        li === 0 ? 8 : 7,
        li === 0 ? fontBold : font,
        li === 0 ? ink : muted,
      );
      ny -= 9;
    }
    const lineNet =
      pos.quantity > 0
        ? Math.round(pos.grossCents / pos.quantity)
        : pos.unitNetCents;
    drawRight(page, String(pos.quantity), cols.qty + 20, rowTop - 10, 8, font);
    drawText(page, pos.unit, cols.unit, rowTop - 10, 8, font);
    drawRight(page, money(lineNet), cols.netto + 28, rowTop - 10, 8, font);
    drawText(page, "zw", cols.vatPct + 2, rowTop - 10, 8, font);
    drawRight(page, "0,00", cols.vat + 22, rowTop - 10, 8, font);
    drawRight(page, money(pos.grossCents), cols.brutto, rowTop - 10, 8, fontBold);
    y = rowTop - rowH;
    page.drawLine({
      start: { x: MARGIN, y },
      end: { x: A4_W - MARGIN, y },
      thickness: 0.5,
      color: rule,
    });
    y -= 4;
  }
  y -= 12;

  // —— VAT summary (right) ——
  const sumX = 320;
  page.drawRectangle({
    x: sumX,
    y: y - 14,
    width: A4_W - MARGIN - sumX,
    height: 16,
    color: headBg,
  });
  drawText(page, "Wedlug stawki VAT", sumX + 6, y - 10, 7, fontBold, muted);
  drawRight(page, "Netto", 430, y - 10, 7, fontBold, muted);
  drawRight(page, "VAT", 480, y - 10, 7, fontBold, muted);
  drawRight(page, "Brutto", A4_W - MARGIN, y - 10, 7, fontBold, muted);
  y -= 20;
  drawText(page, "zw", sumX + 6, y, 8, font);
  drawRight(page, money(amount), 430, y, 8, font);
  drawRight(page, "0,00", 480, y, 8, font);
  drawRight(page, money(amount), A4_W - MARGIN, y, 8, fontBold);
  y -= 22;

  // —— Total bar ——
  page.drawRectangle({
    x: MARGIN,
    y: y - 6,
    width: A4_W - MARGIN * 2,
    height: 22,
    color: headBg,
  });
  drawText(page, "Razem do zaplaty:", MARGIN + 8, y, 10, fontBold);
  drawRight(
    page,
    `${money(amount)} zl`,
    A4_W - MARGIN - 8,
    y,
    11,
    fontBold,
  );
  y -= 28;
  drawText(
    page,
    `Slownie: ${amountInWordsPln(amount)}`,
    MARGIN,
    y,
    8,
    font,
    muted,
  );
  y -= 20;

  drawText(page, exempt, MARGIN, y, 8, font, muted);
  y -= 12;
  drawText(
    page,
    "Dokument wygenerowany automatycznie po oplaceniu zamowienia.",
    MARGIN,
    y,
    7,
    font,
    muted,
  );
  y -= 36;

  // —— Signatures ——
  const sigW = (A4_W - MARGIN * 2 - gap) / 2;
  const sigH = 56;
  const drawSig = (x: number, title: string, name?: string) => {
    page.drawRectangle({
      x,
      y: y - sigH,
      width: sigW,
      height: sigH,
      borderColor: rule,
      borderWidth: 0.7,
    });
    page.drawRectangle({
      x,
      y: y - 16,
      width: sigW,
      height: 16,
      color: headBg,
    });
    drawText(page, title, x + 8, y - 12, 8, fontBold, muted);
    if (name) {
      drawText(page, name, x + 8, y - sigH + 14, 9, font);
    }
    drawText(
      page,
      "Podpis osoby upowaznionej",
      x + 8,
      y - sigH - 10,
      6,
      font,
      muted,
    );
  };
  drawSig(MARGIN, "Odebral");
  drawSig(MARGIN + sigW + gap, "Wystawil", seller.name || undefined);

  const bytes = await doc.save();
  return Buffer.from(bytes);
}
