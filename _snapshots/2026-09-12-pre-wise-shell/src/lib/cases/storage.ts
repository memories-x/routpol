import { promises as fs } from "fs";
import path from "path";
import { createId } from "./types";
import {
  blobGetBytes,
  blobPutBytes,
  useBlobBackend,
} from "./blob-io";
import {
  assertProductionReady,
  isDiskStorageEnabled,
  isProductionRuntime,
} from "@/lib/golive";

function storageRoot(): string {
  const custom = process.env.STORAGE_ROOT?.trim();
  if (custom) return path.resolve(custom);
  return path.join(process.cwd(), "data");
}

function uploadRoot(): string {
  return path.join(storageRoot(), "uploads");
}

/**
 * storagePath:
 * - fs: relative path under uploads/
 * - blob: blob pathname (uploads/…)
 */
export async function storeUpload(params: {
  caseId: string;
  slotKey: string;
  originalName: string;
  mime: string;
  bytes: Buffer;
}): Promise<{ storagePath: string; id: string }> {
  if (isProductionRuntime()) {
    assertProductionReady("upload");
  }

  const id = createId("doc");
  const safeSlot = params.slotKey.replace(/[^a-z0-9_-]/gi, "_");
  const ext =
    params.mime === "application/pdf"
      ? ".pdf"
      : params.mime === "image/png"
        ? ".png"
        : ".jpg";
  const filename = `${id}${ext}`;
  const relative = path.join(params.caseId, safeSlot, filename).replace(/\\/g, "/");

  if (useBlobBackend()) {
    const pathname = `uploads/${params.caseId}/${safeSlot}/${filename}`.replace(
      /\\/g,
      "/",
    );
    await blobPutBytes(pathname, params.bytes, params.mime);
    return { storagePath: pathname, id };
  }

  if (isProductionRuntime() && !isDiskStorageEnabled()) {
    throw new Error("STORAGE_REQUIRED_IN_PRODUCTION");
  }

  const dir = path.join(uploadRoot(), params.caseId, safeSlot);
  await fs.mkdir(dir, { recursive: true });
  const absolute = path.join(dir, filename);
  await fs.writeFile(absolute, params.bytes);
  return { storagePath: relative, id };
}

export async function readUploadBytes(storagePath: string): Promise<Buffer> {
  if (
    useBlobBackend() &&
    (storagePath.startsWith("http://") ||
      storagePath.startsWith("https://") ||
      storagePath.startsWith("uploads/"))
  ) {
    return blobGetBytes(storagePath);
  }
  if (
    storagePath.startsWith("http://") ||
    storagePath.startsWith("https://")
  ) {
    return blobGetBytes(storagePath);
  }
  const absolute = resolveUploadAbsolute(storagePath);
  return fs.readFile(absolute);
}

export function resolveUploadAbsolute(storagePath: string): string {
  const normalized = storagePath.replace(/\\/g, "/");
  if (normalized.includes("..")) {
    throw new Error("Invalid path");
  }
  return path.join(uploadRoot(), normalized);
}

/** Saklama purge — disk/blob baytlarını sil (hata yutulur). */
export async function deleteUploadBytes(storagePath: string): Promise<void> {
  try {
    const normalized = storagePath.replace(/\\/g, "/");
    if (
      useBlobBackend() &&
      (normalized.startsWith("uploads/") ||
        normalized.startsWith("http://") ||
        normalized.startsWith("https://"))
    ) {
      const { blobDelete } = await import("./blob-io");
      await blobDelete(normalized);
      return;
    }
    if (
      normalized.startsWith("http://") ||
      normalized.startsWith("https://")
    ) {
      const { blobDelete } = await import("./blob-io");
      await blobDelete(normalized);
      return;
    }
    const absolute = resolveUploadAbsolute(normalized);
    await fs.unlink(absolute);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code !== "ENOENT") {
      console.error("[storage:delete]", storagePath, err);
    }
  }
}
