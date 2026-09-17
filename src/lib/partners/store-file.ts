import { promises as fs } from "fs";
import path from "path";
import {
  blobGetJson,
  blobListPrefix,
  blobPutJson,
  useBlobBackend,
} from "@/lib/cases/blob-io";
import {
  assertProductionReady,
  isDiskStorageEnabled,
  isProductionRuntime,
} from "@/lib/golive";
import type { LawyerPartner } from "./types";

const DATA_DIR = path.join(process.cwd(), "data", "partners");
const INDEX_FILE = path.join(DATA_DIR, "index.json");
const BLOB_INDEX = "partners/index.json";

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readIndex(): Promise<string[]> {
  if (useBlobBackend()) {
    const idx = await blobGetJson<string[]>(BLOB_INDEX);
    return Array.isArray(idx) ? idx : [];
  }
  await ensureDir();
  try {
    const raw = await fs.readFile(INDEX_FILE, "utf8");
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeIndex(ids: string[]) {
  if (useBlobBackend()) {
    await blobPutJson(BLOB_INDEX, ids);
    return;
  }
  await ensureDir();
  await fs.writeFile(INDEX_FILE, JSON.stringify(ids, null, 2), "utf8");
}

function partnerPath(id: string) {
  return path.join(DATA_DIR, `${id}.json`);
}

function blobPartnerPath(id: string) {
  return `partners/${id}.json`;
}

export async function saveLawyerPartnerFile(
  record: LawyerPartner,
): Promise<LawyerPartner> {
  if (isProductionRuntime() && !useBlobBackend()) {
    assertProductionReady("partner-store");
  }

  const next = { ...record, updatedAt: new Date().toISOString() };

  if (useBlobBackend()) {
    await blobPutJson(blobPartnerPath(next.id), next);
  } else {
    if (isProductionRuntime() && !isDiskStorageEnabled()) {
      throw new Error("STORAGE_REQUIRED_IN_PRODUCTION");
    }
    await ensureDir();
    await fs.writeFile(
      partnerPath(next.id),
      JSON.stringify(next, null, 2),
      "utf8",
    );
  }

  const ids = await readIndex();
  if (!ids.includes(next.id)) {
    ids.unshift(next.id);
    await writeIndex(ids);
  }
  return next;
}

export async function getLawyerPartnerFile(
  id: string,
): Promise<LawyerPartner | null> {
  if (useBlobBackend()) {
    return blobGetJson<LawyerPartner>(blobPartnerPath(id));
  }
  try {
    const raw = await fs.readFile(partnerPath(id), "utf8");
    return JSON.parse(raw) as LawyerPartner;
  } catch {
    return null;
  }
}

export async function listLawyerPartnersFile(): Promise<LawyerPartner[]> {
  let ids = await readIndex();

  if (ids.length === 0 && useBlobBackend()) {
    const paths = await blobListPrefix("partners/");
    ids = paths
      .map((p) => {
        const m = p.match(/^partners\/(partner_[^/]+)\.json$/);
        return m?.[1] ?? null;
      })
      .filter((x): x is string => Boolean(x));
    if (ids.length > 0) await writeIndex(ids);
  }

  const out: LawyerPartner[] = [];
  for (const id of ids) {
    const p = await getLawyerPartnerFile(id);
    if (p) out.push(p);
  }
  return out.sort((a, b) => a.name.localeCompare(b.name, "tr"));
}
