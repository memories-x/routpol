import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { getPublicEnv } from "@/lib/env";
import {
  BrandLang,
  MM,
  NAVY_RGB,
  TEAL_RGB,
  brandBanner,
  brandFooter,
  chromeMetrics,
} from "@/lib/pdf/brand";

export type StampOptions = {
  lang: BrandLang;
  thin?: boolean;
  siteUrl?: string | null;
};

const A4_W = 595.28;
const A4_H = 841.89;

/**
 * Keep source page content; wrap each page in POL-TURK header/footer on A4.
 * Same geometry as pdf-cevirmen stamp_word_pdf (Helvetical for portable TR/PL ASCII).
 */
export async function stampBrandedPdf(
  input: Uint8Array | ArrayBuffer,
  options: StampOptions,
): Promise<Uint8Array> {
  const bytes =
    input instanceof ArrayBuffer ? new Uint8Array(input) : Uint8Array.from(input);

  const src = await PDFDocument.load(bytes, {
    ignoreEncryption: true,
    updateMetadata: false,
  });
  const out = await PDFDocument.create();
  const font = await out.embedFont(StandardFonts.Helvetica);
  const fontBold = await out.embedFont(StandardFonts.HelveticaBold);

  const siteUrl = options.siteUrl ?? getPublicEnv().siteUrl;
  const head = brandBanner(options.lang, siteUrl);
  const foot = brandFooter(options.lang, siteUrl);
  const m = chromeMetrics(Boolean(options.thin));
  const navy = rgb(NAVY_RGB.r, NAVY_RGB.g, NAVY_RGB.b);
  const teal = rgb(TEAL_RGB.r, TEAL_RGB.g, TEAL_RGB.b);
  const white = rgb(1, 1, 1);
  const nPages = Math.max(1, src.getPageCount());
  const pageIndices = src.getPageIndices();

  for (let i = 0; i < pageIndices.length; i++) {
    const [embedded] = await out.embedPdf(src, [pageIndices[i]!]);
    const np = out.addPage([A4_W, A4_H]);
    const w = A4_W;
    const h = A4_H;

    np.drawRectangle({
      x: 0,
      y: h - m.headH * MM,
      width: w,
      height: m.headH * MM,
      color: navy,
    });
    np.drawCircle({
      x: 18 * MM,
      y: h - m.dotY * MM,
      size: m.dotR * MM,
      color: teal,
    });
    np.drawRectangle({
      x: 0,
      y: h - m.stripe * MM,
      width: w,
      height: (m.stripe - m.headH) * MM,
      color: teal,
    });
    np.drawRectangle({
      x: 0,
      y: 0,
      width: w,
      height: m.footH * MM,
      color: navy,
    });
    np.drawRectangle({
      x: 0,
      y: m.footH * MM,
      width: w,
      height: (m.footS - m.footH) * MM,
      color: teal,
    });

    np.drawText(head, {
      x: 23 * MM,
      y: h - m.topBox[1] * MM,
      size: m.fsH,
      font: fontBold,
      color: white,
    });
    const langLabel = options.lang.toUpperCase();
    const langW = font.widthOfTextAtSize(langLabel, Math.max(6.5, m.fsH - 1));
    np.drawText(langLabel, {
      x: w - 14 * MM - langW,
      y: h - m.topBox[1] * MM,
      size: Math.max(6.5, m.fsH - 1),
      font,
      color: white,
    });

    np.drawText(foot, {
      x: 14 * MM,
      y: m.botBox[1] * MM,
      size: m.fsF,
      font,
      color: white,
    });
    const pageLabel = `${i + 1}/${nPages}`;
    const pageW = font.widthOfTextAtSize(pageLabel, m.fsF);
    np.drawText(pageLabel, {
      x: w - 14 * MM - pageW,
      y: m.botBox[1] * MM,
      size: m.fsF,
      font,
      color: white,
    });

    const dest = {
      x0: m.side * MM,
      y0: m.footS * MM + 2 * MM,
      x1: w - m.side * MM,
      y1: h - m.stripe * MM - 2 * MM,
    };
    const destW = dest.x1 - dest.x0;
    const destH = dest.y1 - dest.y0;
    const sw = embedded.width;
    const sh = embedded.height;
    if (sw <= 0 || sh <= 0) continue;
    const scale = Math.min(destW / sw, destH / sh);
    const tw = sw * scale;
    const th = sh * scale;
    np.drawPage(embedded, {
      x: dest.x0,
      y: dest.y1 - th,
      width: tw,
      height: th,
    });
  }

  out.setTitle(`${head}`);
  out.setProducer("POL-TURK");
  out.setCreator("POL-TURK panel");
  return out.save({ useObjectStreams: false });
}

/** Prefer branding only for PDFs; images stay as uploaded. */
export function shouldStampDeliverable(
  mime: string,
  brandFlag: string | null,
): boolean {
  if (brandFlag === "0" || brandFlag === "false" || brandFlag === "off") {
    return false;
  }
  // default on when flag missing or truthy
  if (brandFlag === null || brandFlag === "" || brandFlag === "1" || brandFlag === "true" || brandFlag === "on") {
    return mime === "application/pdf";
  }
  return false;
}

export function brandedFileName(originalName: string): string {
  const base = originalName.replace(/\.pdf$/i, "").trim() || "sonuc";
  if (/_POL-TURK$/i.test(base) || /POL-TURK/i.test(base)) {
    return `${base}.pdf`;
  }
  return `${base}_POL-TURK.pdf`;
}

export function parseThinFlag(v: string | null): boolean {
  return v === "1" || v === "true" || v === "on" || v === "thin";
}
