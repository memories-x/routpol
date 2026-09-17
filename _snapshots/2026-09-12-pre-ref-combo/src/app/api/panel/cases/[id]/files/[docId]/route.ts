import { getCase, saveCase } from "@/lib/cases/store";
import { markChecklistKeysDone } from "@/lib/cases/checklist";
import { MEKTUP_SLOT } from "@/lib/cases/document-slots";
import { readUploadBytes } from "@/lib/cases/storage";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ id: string; docId: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  if (!(await isPanelAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, docId } = await ctx.params;
  const record = await getCase(id);
  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const doc = record.documents.find((d) => d.id === docId);
  if (!doc) {
    return NextResponse.json({ error: "Doc not found" }, { status: 404 });
  }

  try {
    const bytes = await readUploadBytes(doc.storagePath);
    if (doc.slotKey === MEKTUP_SLOT) {
      try {
        record.checklist = markChecklistKeysDone(
          record.packageSlug,
          record.checklist,
          ["letter_downloaded"],
        );
        await saveCase(record);
      } catch (err) {
        console.error("[panel:letter-tick]", err);
      }
    }
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        "Content-Type": doc.mime,
        "Content-Disposition": `inline; filename="${encodeURIComponent(doc.originalName)}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "File missing" }, { status: 404 });
  }
}
