import { fail, ok } from "@/lib/api";
import {
  markChecklistKeysDone,
  resolveChecklist,
  toggleChecklistItem,
} from "@/lib/cases/checklist";
import { SONUC_SLOT } from "@/lib/cases/document-slots";
import { getCase, saveCase } from "@/lib/cases/store";
import { getLawyerPartner } from "@/lib/partners/store";
import { resolveSlotsForRecord } from "@/lib/cases/validate-slots";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  if (!(await isPanelAuthenticated())) {
    return NextResponse.json(fail("UNAUTHORIZED", "Login required"), {
      status: 401,
    });
  }

  const { id } = await ctx.params;
  const record = await getCase(id);
  if (!record) {
    return NextResponse.json(fail("NOT_FOUND", "Not found"), { status: 404 });
  }

  const slots = resolveSlotsForRecord(record);
  const checklist = resolveChecklist(record.packageSlug, record.checklist);

  return NextResponse.json(
    ok({
      ...record,
      checklist,
      slots: slots.map((s) => ({
        key: s.key,
        labelTr: s.labelTr,
        required: s.required,
        documents: record.documents.filter((d) => d.slotKey === s.key),
      })),
    }),
  );
}

const patchSchema = z
  .object({
    status: z
      .enum(["paid", "in_progress", "closed", "unpaid_archived"])
      .optional(),
    archiveFolder: z.string().min(1).max(240).optional(),
    lawyerPartner: z.string().max(160).optional(),
    lawyerPartnerId: z.string().max(80).nullable().optional(),
    checklistToggle: z
      .object({
        key: z.string().min(1).max(80),
        done: z.boolean(),
      })
      .optional(),
  })
  .refine(
    (d) =>
      d.status !== undefined ||
      d.archiveFolder !== undefined ||
      d.lawyerPartner !== undefined ||
      d.lawyerPartnerId !== undefined ||
      d.checklistToggle !== undefined,
    { message: "empty patch" },
  );

export async function PATCH(request: Request, ctx: Ctx) {
  if (!(await isPanelAuthenticated())) {
    return NextResponse.json(fail("UNAUTHORIZED", "Login required"), {
      status: 401,
    });
  }

  const { id } = await ctx.params;
  const record = await getCase(id);
  if (!record) {
    return NextResponse.json(fail("NOT_FOUND", "Not found"), { status: 404 });
  }

  const json = await request.json();
  const parsed = patchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(fail("VALIDATION", "Bad patch"), { status: 400 });
  }

  const prevStatus = record.status;

  if (parsed.data.status) record.status = parsed.data.status;
  if (parsed.data.archiveFolder !== undefined) {
    record.archiveFolder = parsed.data.archiveFolder.trim();
  }
  if (parsed.data.lawyerPartnerId !== undefined) {
    const pid = parsed.data.lawyerPartnerId?.trim() || "";
    if (!pid) {
      record.lawyerPartnerId = undefined;
      record.lawyerPartner = undefined;
    } else {
      const partner = await getLawyerPartner(pid);
      if (!partner) {
        return NextResponse.json(fail("NOT_FOUND", "Partner not found"), {
          status: 404,
        });
      }
      record.lawyerPartnerId = partner.id;
      record.lawyerPartner = partner.name;
    }
  } else if (parsed.data.lawyerPartner !== undefined) {
    record.lawyerPartner = parsed.data.lawyerPartner.trim() || undefined;
  }
  if (parsed.data.checklistToggle) {
    const base = resolveChecklist(record.packageSlug, record.checklist);
    record.checklist = toggleChecklistItem(
      base,
      parsed.data.checklistToggle.key,
      parsed.data.checklistToggle.done,
    );
  }

  if (parsed.data.status === "closed") {
    const hasResult = record.documents.some((d) => d.slotKey === SONUC_SLOT);
    if (!hasResult) {
      return NextResponse.json(
        fail("NO_RESULT", "Upload result (sonuc) before closing"),
        { status: 400 },
      );
    }
  }

  let saved = await saveCase(record);

  if (parsed.data.status && parsed.data.status !== prevStatus) {
    try {
      const { sendCaseCustomerMail } = await import(
        "@/lib/mail/case-customer-mail"
      );
      if (
        parsed.data.status === "in_progress" &&
        !saved.notifications?.inProgressLinkSentAt
      ) {
        await sendCaseCustomerMail(saved, "in_progress_link");
        saved.notifications = {
          ...saved.notifications,
          inProgressLinkSentAt: new Date().toISOString(),
        };
        saved = await saveCase(saved);
      }
      if (
        parsed.data.status === "closed" &&
        !saved.notifications?.readyLinkSentAt
      ) {
        const hasResult = saved.documents.some((d) => d.slotKey === SONUC_SLOT);
        if (!hasResult) {
          console.error("[panel:closed-without-result]", saved.id);
        } else {
          await sendCaseCustomerMail(saved, "ready_link");
          saved.notifications = {
            ...saved.notifications,
            readyLinkSentAt: new Date().toISOString(),
          };
          saved.checklist = markChecklistKeysDone(
            saved.packageSlug,
            saved.checklist,
            ["customer_notified", "summary_shared", "result_uploaded"],
          );
          saved = await saveCase(saved);
        }
      }
    } catch (err) {
      console.error("[panel:status-mail]", err);
    }
  }

  return NextResponse.json(
    ok({
      id: saved.id,
      status: saved.status,
      archiveFolder: saved.archiveFolder ?? null,
      lawyerPartner: saved.lawyerPartner ?? null,
      lawyerPartnerId: saved.lawyerPartnerId ?? null,
      checklist: resolveChecklist(saved.packageSlug, saved.checklist),
    }),
  );
}
