import { deleteUploadBytes } from "@/lib/cases/storage";
import { getPrisma, isDatabaseConfigured } from "@/lib/db";

/** Saklama süreleri (ms) — docs/05-uyum-rodo.md */
export const RETENTION_UNPAID_MS = 30 * 24 * 60 * 60 * 1000;
export const RETENTION_CLOSED_MS = 24 * 30 * 24 * 60 * 60 * 1000;

async function purgeCaseDocuments(caseId: string): Promise<number> {
  const prisma = getPrisma();
  const docs = await prisma.caseDocument.findMany({ where: { caseId } });
  for (const doc of docs) {
    await deleteUploadBytes(doc.storagePath);
  }
  await prisma.caseDocument.deleteMany({ where: { caseId } });
  return docs.length;
}

export async function purgeExpiredData(): Promise<{
  archivedCases: number;
  purgedClosedCases: number;
  purgedDocuments: number;
}> {
  if (!isDatabaseConfigured()) {
    return { archivedCases: 0, purgedClosedCases: 0, purgedDocuments: 0 };
  }
  const prisma = getPrisma();
  const now = Date.now();
  const unpaidCutoff = new Date(now - RETENTION_UNPAID_MS);
  const closedCutoff = new Date(now - RETENTION_CLOSED_MS);

  const staleUnpaid = await prisma.case.findMany({
    where: {
      status: { in: ["draft", "awaiting_payment"] },
      updatedAt: { lt: unpaidCutoff },
    },
    select: { id: true },
    take: 100,
  });

  let purgedDocuments = 0;
  for (const row of staleUnpaid) {
    purgedDocuments += await purgeCaseDocuments(row.id);
    await prisma.case.update({
      where: { id: row.id },
      data: { status: "unpaid_archived" },
    });
  }

  const staleClosed = await prisma.case.findMany({
    where: {
      status: "closed",
      updatedAt: { lt: closedCutoff },
    },
    select: { id: true },
    take: 50,
  });

  for (const row of staleClosed) {
    purgedDocuments += await purgeCaseDocuments(row.id);
    await prisma.caseNote.deleteMany({ where: { caseId: row.id } });
    await prisma.case.update({
      where: { id: row.id },
      data: {
        status: "data_purged",
        matter: null,
        customerNotes: null,
        archiveFolder: null,
      },
    });
  }

  return {
    archivedCases: staleUnpaid.length,
    purgedClosedCases: staleClosed.length,
    purgedDocuments,
  };
}
