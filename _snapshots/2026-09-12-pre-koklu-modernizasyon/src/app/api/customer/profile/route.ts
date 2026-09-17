import { fail, ok } from "@/lib/api";
import { getCustomerSessionId } from "@/lib/customer-auth";
import { isCustomerPortalEnabled } from "@/lib/customer-portal/enabled";
import { getPrisma } from "@/lib/db";
import {
  companyRequiresNip,
  isValidPlNip,
  normalizeNip,
} from "@/lib/invoices/nip";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z
  .object({
    fullName: z.string().trim().min(2).max(80),
    phone: z.string().trim().min(6).max(30),
    companyName: z.string().trim().max(120).optional(),
    nip: z.string().trim().max(20).optional(),
    entityType: z.enum(["sahis", "sirket"]).optional(),
    preferredResultLocale: z.enum(["tr", "pl", "en"]).optional(),
  })
  .superRefine((data, ctx) => {
    const nip = data.nip ? normalizeNip(data.nip) : "";
    const needNip = companyRequiresNip({
      companyName: data.companyName,
      entityType: data.entityType,
    });
    if (needNip && !nip) {
      ctx.addIssue({
        code: "custom",
        path: ["nip"],
        message: "Company NIP required",
      });
    }
    if (nip && !isValidPlNip(nip)) {
      ctx.addIssue({
        code: "custom",
        path: ["nip"],
        message: "Invalid NIP",
      });
    }
  });

export async function PATCH(request: Request) {
  if (!isCustomerPortalEnabled()) {
    return NextResponse.json(
      fail("UNAVAILABLE", "Customer portal requires database"),
      { status: 503 },
    );
  }

  const customerId = await getCustomerSessionId();
  if (!customerId) {
    return NextResponse.json(fail("UNAUTHORIZED", "Not signed in"), {
      status: 401,
    });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(fail("INVALID_JSON", "Invalid body"), {
      status: 400,
    });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      fail("VALIDATION", "Invalid fields", parsed.error.flatten()),
      { status: 400 },
    );
  }

  const data = parsed.data;
  const nip = data.nip ? normalizeNip(data.nip) : null;

  const prisma = getPrisma();
  const updated = await prisma.customer.update({
    where: { id: customerId },
    data: {
      fullName: data.fullName,
      phone: data.phone,
      companyName: data.companyName?.trim() || null,
      nip,
      entityType: data.entityType ?? null,
      preferredResultLocale: data.preferredResultLocale ?? null,
    },
  });

  return NextResponse.json(
    ok({
      profile: {
        email: updated.email,
        fullName: updated.fullName,
        phone: updated.phone,
        companyName: updated.companyName,
        nip: updated.nip,
        entityType: updated.entityType,
        preferredResultLocale: updated.preferredResultLocale,
      },
    }),
  );
}
