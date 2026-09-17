import { getPrisma } from "@/lib/db";
import type { LawyerPartner as LawyerPartnerRow, Prisma } from "@prisma/client";
import type {
  ContractStatus,
  LawyerPartner,
  PartnerLang,
} from "./types";

function langsOf(value: Prisma.JsonValue | null): PartnerLang[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const allowed: PartnerLang[] = ["pl", "en", "tr"];
  const next = value.filter(
    (v): v is PartnerLang =>
      typeof v === "string" && allowed.includes(v as PartnerLang),
  );
  return next.length > 0 ? next : undefined;
}

function contractOf(value: string | null): ContractStatus {
  if (value === "signed" || value === "draft") return value;
  return "none";
}

function toRecord(row: LawyerPartnerRow): LawyerPartner {
  return {
    id: row.id,
    name: row.name,
    officeName: row.officeName ?? undefined,
    email: row.email ?? undefined,
    phone: row.phone ?? undefined,
    nip: row.nip ?? undefined,
    barNumber: row.barNumber ?? undefined,
    city: row.city ?? undefined,
    address: row.address ?? undefined,
    website: row.website ?? undefined,
    specialty: row.specialty ?? undefined,
    languages: langsOf(row.languages),
    contractStatus: contractOf(row.contractStatus),
    notes: row.notes ?? undefined,
    active: row.active,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function persistFields(record: LawyerPartner) {
  return {
    name: record.name,
    officeName: record.officeName ?? null,
    email: record.email ?? null,
    phone: record.phone ?? null,
    nip: record.nip ?? null,
    barNumber: record.barNumber ?? null,
    city: record.city ?? null,
    address: record.address ?? null,
    website: record.website ?? null,
    specialty: record.specialty ?? null,
    languages: (record.languages ?? null) as Prisma.InputJsonValue,
    contractStatus: record.contractStatus,
    notes: record.notes ?? null,
    active: record.active,
  };
}

export async function saveLawyerPartnerDb(
  record: LawyerPartner,
): Promise<LawyerPartner> {
  const prisma = getPrisma();
  const now = new Date();
  const fields = persistFields(record);
  const row = await prisma.lawyerPartner.upsert({
    where: { id: record.id },
    create: {
      id: record.id,
      ...fields,
      createdAt: new Date(record.createdAt),
      updatedAt: now,
    },
    update: {
      ...fields,
      updatedAt: now,
    },
  });
  return toRecord(row);
}

export async function getLawyerPartnerDb(
  id: string,
): Promise<LawyerPartner | null> {
  const prisma = getPrisma();
  const row = await prisma.lawyerPartner.findUnique({ where: { id } });
  return row ? toRecord(row) : null;
}

export async function listLawyerPartnersDb(): Promise<LawyerPartner[]> {
  const prisma = getPrisma();
  const rows = await prisma.lawyerPartner.findMany({
    orderBy: { name: "asc" },
  });
  return rows.map(toRecord);
}
