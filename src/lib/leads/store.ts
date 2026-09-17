import { getPrisma, isDatabaseConfigured } from "@/lib/db";

export const quoteLeadStatuses = ["new", "contacted", "closed"] as const;
export type QuoteLeadStatus = (typeof quoteLeadStatuses)[number];

export type QuoteLeadRecord = {
  id: string;
  fullName: string;
  email: string;
  phoneE164: string;
  serviceType: string;
  message: string | null;
  locale: string | null;
  source: string;
  status: QuoteLeadStatus;
  createdAt: string;
  contactedAt: string | null;
  /** Aynı e-posta veya telefonla daha önce lead var */
  likelyDuplicate: boolean;
};

export type CreateQuoteLeadInput = {
  fullName: string;
  email: string;
  phoneE164: string;
  serviceType: string;
  message?: string;
  locale?: string;
  source?: "landing" | "contact";
};

export type ListQuoteLeadsOpts = {
  status?: QuoteLeadStatus | "all";
  q?: string;
  limit?: number;
};

function isStatus(value: string): value is QuoteLeadStatus {
  return (quoteLeadStatuses as readonly string[]).includes(value);
}

function mapRow(
  row: {
    id: string;
    fullName: string;
    email: string;
    phoneE164: string;
    serviceType: string;
    message: string | null;
    locale: string | null;
    source: string;
    status: string;
    createdAt: Date;
    contactedAt: Date | null;
  },
  likelyDuplicate = false,
): QuoteLeadRecord {
  return {
    id: row.id,
    fullName: row.fullName,
    email: row.email,
    phoneE164: row.phoneE164,
    serviceType: row.serviceType,
    message: row.message,
    locale: row.locale,
    source: row.source,
    status: isStatus(row.status) ? row.status : "new",
    createdAt: row.createdAt.toISOString(),
    contactedAt: row.contactedAt ? row.contactedAt.toISOString() : null,
    likelyDuplicate,
  };
}

/** İlk (en eski) kayıt dışında aynı e-posta/telefon → tekrar. */
async function annotateDuplicates(
  rows: QuoteLeadRecord[],
): Promise<QuoteLeadRecord[]> {
  if (rows.length === 0) return rows;
  const prisma = getPrisma();
  const emails = [
    ...new Set(rows.map((r) => r.email.trim().toLowerCase()).filter(Boolean)),
  ];
  const phones = [
    ...new Set(
      rows.map((r) => r.phoneE164).filter((p) => p.replace(/\D/g, "").length >= 8),
    ),
  ];

  if (emails.length === 0 && phones.length === 0) return rows;

  const related = await prisma.quoteLead.findMany({
    where: {
      OR: [
        ...emails.map((email) => ({
          email: { equals: email, mode: "insensitive" as const },
        })),
        ...(phones.length ? [{ phoneE164: { in: phones } }] : []),
      ],
    },
    select: { id: true, email: true, phoneE164: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const firstEmail = new Map<string, string>();
  const firstPhone = new Map<string, string>();
  for (const r of related) {
    const ek = r.email.trim().toLowerCase();
    const pk = r.phoneE164.replace(/\D/g, "");
    if (ek && !firstEmail.has(ek)) firstEmail.set(ek, r.id);
    if (pk.length >= 8 && !firstPhone.has(pk)) firstPhone.set(pk, r.id);
  }

  return rows.map((row) => {
    const ek = row.email.trim().toLowerCase();
    const pk = row.phoneE164.replace(/\D/g, "");
    const emailDup = ek && firstEmail.get(ek) !== row.id;
    const phoneDup = pk.length >= 8 && firstPhone.get(pk) !== row.id;
    return { ...row, likelyDuplicate: Boolean(emailDup || phoneDup) };
  });
}

/** Persist lead when DB is configured. Returns null if no DATABASE_URL. */
export async function createQuoteLead(
  input: CreateQuoteLeadInput,
): Promise<QuoteLeadRecord | null> {
  if (!isDatabaseConfigured()) return null;
  const prisma = getPrisma();
  const row = await prisma.quoteLead.create({
    data: {
      fullName: input.fullName,
      email: input.email,
      phoneE164: input.phoneE164,
      serviceType: input.serviceType,
      message: input.message?.trim() ? input.message.trim() : null,
      locale: input.locale?.trim() || null,
      source: input.source === "contact" ? "contact" : "landing",
      status: "new",
    },
  });
  return mapRow(row, false);
}

export async function listQuoteLeads(
  opts: ListQuoteLeadsOpts = {},
): Promise<QuoteLeadRecord[]> {
  if (!isDatabaseConfigured()) return [];
  const prisma = getPrisma();
  const limit = Math.min(Math.max(opts.limit ?? 200, 1), 500);
  const status =
    opts.status && opts.status !== "all" && isStatus(opts.status)
      ? opts.status
      : undefined;
  const q = opts.q?.trim();

  const rows = await prisma.quoteLead.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(q
        ? {
            OR: [
              { fullName: { contains: q, mode: "insensitive" } },
              { email: { contains: q, mode: "insensitive" } },
              { phoneE164: { contains: q } },
              { serviceType: { contains: q, mode: "insensitive" } },
              { message: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  const mapped = Array.isArray(rows)
    ? rows.map((r) => mapRow(r, false))
    : [];
  return annotateDuplicates(mapped);
}

export async function countQuoteLeadsByStatus(
  status: QuoteLeadStatus,
): Promise<number> {
  if (!isDatabaseConfigured()) return 0;
  const prisma = getPrisma();
  return prisma.quoteLead.count({ where: { status } });
}

export async function updateQuoteLeadStatus(
  id: string,
  status: QuoteLeadStatus,
): Promise<QuoteLeadRecord | null> {
  if (!isDatabaseConfigured()) return null;
  const prisma = getPrisma();
  try {
    const existing = await prisma.quoteLead.findUnique({ where: { id } });
    if (!existing) return null;

    const contactedAt =
      status === "new" ? null : (existing.contactedAt ?? new Date());

    const row = await prisma.quoteLead.update({
      where: { id },
      data: { status, contactedAt },
    });
    return mapRow(row, false);
  } catch {
    return null;
  }
}
