import { fail, ok } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import { isDatabaseConfigured } from "@/lib/db";
import { leadServiceLabel } from "@/lib/leads/labels";
import { createQuoteLead } from "@/lib/leads/store";
import {
  getQuoteMailAdapter,
  isQuoteMailConfigured,
} from "@/lib/mail/quote-mail";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import {
  quoteRequestSchema,
  toE164Phone,
} from "@/lib/validation/quote";
import {
  buildCustomerWhatsAppUrl,
  operatorWhatsAppPrefill,
} from "@/lib/whatsapp";
import { NextResponse } from "next/server";

const MIN_FILL_MS = 2000;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = checkRateLimit(`teklif:${ip}`);
  if (!limited.ok) {
    return NextResponse.json(
      fail("RATE_LIMITED", "Çok fazla deneme. Birkaç dakika sonra tekrar deneyin."),
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(fail("INVALID_JSON", "Geçersiz istek gövdesi."), {
      status: 400,
    });
  }

  const parsed = quoteRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      fail("VALIDATION_ERROR", "Form doğrulanamadı.", parsed.error.flatten()),
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.companyWebsite) {
    return NextResponse.json(ok({ id: "ignored" }));
  }

  if (
    typeof data.formStartedAt === "number" &&
    Date.now() - data.formStartedAt < MIN_FILL_MS
  ) {
    return NextResponse.json(
      fail("TOO_FAST", "Lütfen formu dikkatle doldurun."),
      { status: 400 },
    );
  }

  if (process.env.NODE_ENV === "production" && !isQuoteMailConfigured()) {
    return NextResponse.json(
      fail(
        "MAIL_NOT_CONFIGURED",
        "Bildirim şu an yapılandırılmamış. Lütfen WhatsApp’tan yazın veya daha sonra deneyin.",
      ),
      { status: 503 },
    );
  }

  if (process.env.NODE_ENV === "production" && !isDatabaseConfigured()) {
    return NextResponse.json(
      fail(
        "LEAD_DB_REQUIRED",
        "Talebiniz kaydedilemedi. Lütfen daha sonra deneyin veya WhatsApp’tan yazın.",
      ),
      { status: 503 },
    );
  }

  const phone = toE164Phone(data.phoneCountryCode, data.phone);
  let id = `qt_${Date.now().toString(36)}`;

  if (isDatabaseConfigured()) {
    try {
      const lead = await createQuoteLead({
        fullName: data.fullName,
        email: data.email,
        phoneE164: phone,
        serviceType: data.serviceType,
        message: data.message,
        locale: data.locale,
        source: data.source ?? "landing",
      });
      if (lead) id = lead.id;
    } catch (err) {
      console.error("[teklif] quoteLead create failed", err);
      return NextResponse.json(
        fail(
          "LEAD_SAVE_FAILED",
          "Talebiniz kaydedilemedi. Lütfen tekrar deneyin veya WhatsApp'tan yazın.",
        ),
        { status: 502 },
      );
    }
  }

  const serviceLabel = leadServiceLabel(data.serviceType);
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/$/, "");
  const customerWhatsAppUrl = buildCustomerWhatsAppUrl(
    phone,
    operatorWhatsAppPrefill(
      data.fullName,
      data.serviceType,
      data.locale,
      serviceLabel,
    ),
  );

  try {
    await getQuoteMailAdapter().sendQuoteNotification({
      id,
      fullName: data.fullName,
      email: data.email,
      phone,
      serviceType: data.serviceType,
      serviceLabel,
      message: data.message,
      locale: data.locale,
      source: data.source ?? "landing",
      customerWhatsAppUrl,
      panelUrl: `${siteUrl}/panel/temas?status=new`,
    });
  } catch (err) {
    console.error("[teklif] mail adapter failed", err);
    return NextResponse.json(
      fail(
        "MAIL_FAILED",
        "Talebiniz iletilemedi. Lütfen tekrar deneyin veya WhatsApp'tan yazın.",
      ),
      { status: 502 },
    );
  }

  void trackEvent("teklif_submit", { serviceType: data.serviceType });

  return NextResponse.json(ok({ id }));
}
