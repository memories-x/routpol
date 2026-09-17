import { isDatabaseConfigured } from "@/lib/db";
import { createId } from "@/lib/cases/types";
import type {
  ContractStatus,
  LawyerPartner,
  LawyerPartnerInput,
  PartnerLang,
} from "./types";
import * as fileStore from "./store-file";
import * as dbStore from "./store-db";

function useDb() {
  return isDatabaseConfigured();
}

function emptyToUndef(v?: string): string | undefined {
  const t = v?.trim();
  return t ? t : undefined;
}

function normalizeLanguages(input?: PartnerLang[]): PartnerLang[] | undefined {
  const list = Array.isArray(input) ? input : [];
  const allowed: PartnerLang[] = ["pl", "en", "tr"];
  const next = allowed.filter((l) => list.includes(l));
  return next.length > 0 ? next : undefined;
}

export function buildLawyerPartner(
  input: LawyerPartnerInput,
  existing?: LawyerPartner,
): LawyerPartner {
  const now = new Date().toISOString();
  const contract: ContractStatus =
    input.contractStatus ?? existing?.contractStatus ?? "none";
  return {
    id: existing?.id ?? createId("partner"),
    name: input.name.trim(),
    officeName: emptyToUndef(input.officeName),
    email: emptyToUndef(input.email)?.toLowerCase(),
    phone: emptyToUndef(input.phone),
    nip: emptyToUndef(input.nip),
    barNumber: emptyToUndef(input.barNumber),
    city: emptyToUndef(input.city),
    address: emptyToUndef(input.address),
    website: emptyToUndef(input.website),
    specialty: emptyToUndef(input.specialty),
    languages: normalizeLanguages(input.languages ?? existing?.languages),
    contractStatus: contract,
    notes: emptyToUndef(input.notes),
    active: input.active ?? existing?.active ?? true,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}

export function normalizeLawyerPartner(raw: LawyerPartner): LawyerPartner {
  const langs = Array.isArray(raw.languages) ? raw.languages : undefined;
  return {
    ...raw,
    languages: langs && langs.length > 0 ? langs : undefined,
    contractStatus:
      raw.contractStatus === "signed" || raw.contractStatus === "draft"
        ? raw.contractStatus
        : "none",
    active: Boolean(raw.active),
  };
}

export async function saveLawyerPartner(
  record: LawyerPartner,
): Promise<LawyerPartner> {
  const next = normalizeLawyerPartner(record);
  if (useDb()) return dbStore.saveLawyerPartnerDb(next);
  return fileStore.saveLawyerPartnerFile(next);
}

export async function getLawyerPartner(
  id: string,
): Promise<LawyerPartner | null> {
  const row = useDb()
    ? await dbStore.getLawyerPartnerDb(id)
    : await fileStore.getLawyerPartnerFile(id);
  return row ? normalizeLawyerPartner(row) : null;
}

export async function listLawyerPartners(): Promise<LawyerPartner[]> {
  const rows = useDb()
    ? await dbStore.listLawyerPartnersDb()
    : await fileStore.listLawyerPartnersFile();
  return (Array.isArray(rows) ? rows : []).map(normalizeLawyerPartner);
}

export function casesForPartner<
  T extends { lawyerPartnerId?: string; lawyerPartner?: string },
>(partner: LawyerPartner, cases: T[]): T[] {
  const name = partner.name.trim().toLowerCase();
  return (Array.isArray(cases) ? cases : []).filter((c) => {
    if (c.lawyerPartnerId) return c.lawyerPartnerId === partner.id;
    return (c.lawyerPartner ?? "").trim().toLowerCase() === name;
  });
}
