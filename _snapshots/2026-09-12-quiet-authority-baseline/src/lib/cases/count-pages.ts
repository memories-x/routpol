import { PDFDocument } from "pdf-lib";

export const TEK_YAZI_MAX_PAGES = 20;

function toUint8Array(bytes: Uint8Array | ArrayBuffer): Uint8Array {
  if (bytes instanceof ArrayBuffer) return new Uint8Array(bytes);
  // Full copy — Node Buffer pooled views are unsafe for pdf-lib
  return Uint8Array.from(bytes);
}

export function guessMimeFromName(name: string): string {
  const lower = name.toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  return "";
}

export function normalizeMime(mime: string, fileName?: string): string {
  const normalized = mime.toLowerCase().split(";")[0]?.trim() ?? "";
  if (
    normalized === "application/pdf" ||
    normalized === "image/jpeg" ||
    normalized === "image/jpg" ||
    normalized === "image/png"
  ) {
    return normalized === "image/jpg" ? "image/jpeg" : normalized;
  }
  if (fileName) {
    const guessed = guessMimeFromName(fileName);
    if (guessed) return guessed;
  }
  return normalized;
}

export function isImageMime(mime: string): boolean {
  return mime === "image/jpeg" || mime === "image/png";
}

/**
 * PDF → gerçek sayfa sayısı. JPG/PNG → 1 sayfa.
 * Kaynak: sunucu (fiyat); istemci yalnızca önizleme.
 */
export async function countPagesInBytes(
  bytes: Uint8Array | ArrayBuffer,
  mime: string,
  fileName?: string,
): Promise<number> {
  const data = toUint8Array(bytes);
  if (data.byteLength === 0) {
    throw new Error("EMPTY_FILE");
  }

  const resolved = normalizeMime(mime, fileName);
  if (isImageMime(resolved)) {
    return 1;
  }

  if (resolved !== "application/pdf" && resolved !== "") {
    throw new Error("UNSUPPORTED_TYPE");
  }

  try {
    const doc = await PDFDocument.load(data, {
      ignoreEncryption: true,
      updateMetadata: false,
    });
    const n = doc.getPageCount();
    if (!Number.isFinite(n) || n < 1) {
      throw new Error("INVALID_PAGE_COUNT");
    }
    return Math.floor(n);
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("EMPTY_")) throw err;
    if (err instanceof Error && err.message === "UNSUPPORTED_TYPE") throw err;
    throw new Error("PAGE_COUNT_FAILED");
  }
}

export async function countPagesInBrowserFile(file: File): Promise<number> {
  if (file.size <= 0) throw new Error("EMPTY_FILE");
  const mime = normalizeMime(file.type || "", file.name);
  const buf = await file.arrayBuffer();
  return countPagesInBytes(buf, mime, file.name);
}

export async function sumPagesInBrowserFiles(
  files: FileList | File[],
): Promise<number> {
  const list = Array.from(files);
  if (list.length === 0) return 0;
  let total = 0;
  for (const f of list) {
    total += await countPagesInBrowserFile(f);
  }
  return total;
}

/** Checkout / panel: mektup evraklarından toplam sayfa. */
export function sumStoredMektupPages(
  documents: Array<{ slotKey: string; pageCount?: number }>,
  mektupSlot: string,
): number | null {
  const docs = documents.filter((d) => d.slotKey === mektupSlot);
  if (docs.length === 0) return null;
  let total = 0;
  for (const d of docs) {
    if (
      typeof d.pageCount !== "number" ||
      !Number.isFinite(d.pageCount) ||
      d.pageCount < 1
    ) {
      return null;
    }
    total += Math.floor(d.pageCount);
  }
  return total;
}
