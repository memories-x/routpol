import { put, list, del, get } from "@vercel/blob";
import { isBlobConfigured } from "@/lib/golive";

function token(): string {
  const t = process.env.BLOB_READ_WRITE_TOKEN;
  if (!t) throw new Error("BLOB_READ_WRITE_TOKEN missing");
  return t;
}

export function useBlobBackend(): boolean {
  return isBlobConfigured();
}

export async function blobPutBytes(
  pathname: string,
  bytes: Buffer | Uint8Array,
  contentType: string,
): Promise<{ url: string; pathname: string }> {
  const body = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
  const result = await put(pathname, body, {
    access: "private",
    token: token(),
    contentType,
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return { url: result.url, pathname: result.pathname };
}

export async function blobPutJson(
  pathname: string,
  data: unknown,
): Promise<void> {
  const body = JSON.stringify(data, null, 2);
  await put(pathname, body, {
    access: "private",
    token: token(),
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function blobGetBytes(urlOrPathname: string): Promise<Buffer> {
  const result = await get(urlOrPathname, {
    access: "private",
    token: token(),
  });
  if (!result || result.statusCode !== 200 || !result.stream) {
    throw new Error(`BLOB_GET_FAILED:${result?.statusCode ?? "null"}`);
  }
  const reader = result.stream.getReader();
  const chunks: Uint8Array[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  return Buffer.concat(chunks.map((c) => Buffer.from(c)));
}

export async function blobGetJson<T>(pathname: string): Promise<T | null> {
  try {
    const bytes = await blobGetBytes(pathname);
    return JSON.parse(bytes.toString("utf8")) as T;
  } catch {
    return null;
  }
}

export async function blobListPrefix(prefix: string): Promise<string[]> {
  const paths: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({
      prefix,
      token: token(),
      cursor,
      limit: 1000,
    });
    for (const b of page.blobs) paths.push(b.pathname);
    cursor = page.cursor;
  } while (cursor);
  return paths;
}

export async function blobDelete(url: string): Promise<void> {
  await del(url, { token: token() });
}
