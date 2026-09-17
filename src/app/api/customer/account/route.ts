import { fail, ok } from "@/lib/api";
import {
  CUSTOMER_COOKIE_NAME,
  verifyCustomerSessionToken,
} from "@/lib/customer-auth-token";
import { getPrisma } from "@/lib/db";
import { writeAuditLog } from "@/lib/audit-log";
import { getClientIp } from "@/lib/rate-limit";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/** Müşteri veri silme talebi — profil anonimleştirme + oturum kapatma. */
export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(CUSTOMER_COOKIE_NAME)?.value;
  const customerId = verifyCustomerSessionToken(token);
  if (!customerId) {
    return NextResponse.json(fail("UNAUTHORIZED", "Not signed in"), {
      status: 401,
    });
  }

  const prisma = getPrisma();
  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
  });
  if (!customer) {
    return NextResponse.json(fail("NOT_FOUND", "Customer not found"), {
      status: 404,
    });
  }

  await writeAuditLog({
    action: "customer_deletion_requested",
    actor: customer.email,
    ip: getClientIp(request),
    meta: { customerId },
  });

  await prisma.customerPortalLogin.deleteMany({ where: { customerId } });
  await prisma.customer.update({
    where: { id: customerId },
    data: {
      fullName: "DELETED",
      phone: "DELETED",
      companyName: null,
      nip: null,
      entityType: null,
    },
  });

  const res = NextResponse.json(
    ok({ deleted: true, message: "Profile anonymized; cases retained per law" }),
  );
  res.cookies.set(CUSTOMER_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return res;
}
