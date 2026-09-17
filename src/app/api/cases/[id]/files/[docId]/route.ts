import { authorizeCaseAccess } from "@/lib/cases/authorize-case-access";
import { getCase } from "@/lib/cases/store";
import { readUploadBytes } from "@/lib/cases/storage";
import { SONUC_SLOT } from "@/lib/cases/document-slots";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ id: string; docId: string }> };

/** Customer download — view token or legacy case token. */
export async function GET(request: Request, ctx: Ctx) {
  const { id, docId } = await ctx.params;
  const record = await getCase(id);
  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!authorizeCaseAccess(record, request, docId)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const doc = record.documents.find((d) => d.id === docId);
  if (!doc) {
    return NextResponse.json({ error: "Doc not found" }, { status: 404 });
  }

  if (doc.slotKey === SONUC_SLOT) {
    if (
      record.payment.status !== "paid" &&
      record.status !== "paid" &&
      record.status !== "in_progress" &&
      record.status !== "closed"
    ) {
      return NextResponse.json({ error: "Not ready" }, { status: 403 });
    }
  }

  try {
    const bytes = await readUploadBytes(doc.storagePath);
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        "Content-Type": doc.mime,
        "Content-Disposition": `attachment; filename="${encodeURIComponent(doc.originalName)}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "File missing" }, { status: 404 });
  }
}
