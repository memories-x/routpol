import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { describe, expect, it } from "vitest";
import {
  brandedFileName,
  shouldStampDeliverable,
  stampBrandedPdf,
} from "@/lib/pdf/stamp-branded";

async function samplePdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([400, 600]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  page.drawText("Hello POL-TURK", {
    x: 40,
    y: 500,
    size: 14,
    font,
    color: rgb(0, 0, 0),
  });
  return doc.save();
}

describe("shouldStampDeliverable", () => {
  it("defaults on for PDF", () => {
    expect(shouldStampDeliverable("application/pdf", null)).toBe(true);
    expect(shouldStampDeliverable("application/pdf", "1")).toBe(true);
  });

  it("respects off flag", () => {
    expect(shouldStampDeliverable("application/pdf", "0")).toBe(false);
  });

  it("skips images", () => {
    expect(shouldStampDeliverable("image/jpeg", "1")).toBe(false);
  });
});

describe("brandedFileName", () => {
  it("appends POL-TURK once", () => {
    expect(brandedFileName("ceviri.pdf")).toBe("ceviri_POL-TURK.pdf");
    expect(brandedFileName("ceviri_POL-TURK.pdf")).toBe("ceviri_POL-TURK.pdf");
  });
});

describe("stampBrandedPdf", () => {
  it("wraps pages in A4 branded chrome", async () => {
    const input = await samplePdf();
    const out = await stampBrandedPdf(input, {
      lang: "tr",
      siteUrl: "https://example.com",
    });
    const doc = await PDFDocument.load(out);
    expect(doc.getPageCount()).toBe(1);
    const page = doc.getPage(0);
    const { width, height } = page.getSize();
    expect(width).toBeCloseTo(595.28, 0);
    expect(height).toBeCloseTo(841.89, 0);
    expect(out.byteLength).toBeGreaterThan(input.byteLength);
  });

  it("preserves multi-page count", async () => {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    for (const label of ["A", "B"]) {
      const page = doc.addPage([300, 400]);
      page.drawText(label, { x: 20, y: 200, size: 20, font });
    }
    const input = await doc.save();
    const out = await stampBrandedPdf(input, { lang: "en", thin: true });
    const stamped = await PDFDocument.load(out);
    expect(stamped.getPageCount()).toBe(2);
  });
});
