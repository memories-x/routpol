import { fail, ok } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import { getQuoteMailAdapter, isQuoteMailConfigured } from "@/lib/mail/quote-mail";import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import {
  quoteRequestSchema,
  toE164Phone,
} from "@/lib/validation/quote";
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

  const id = `qt_${Date.now().toString(36)}`;
  const phone = toE164Phone(data.phoneCountryCode, data.phone);

  try {
    await getQuoteMailAdapter().sendQuoteNotification({
      id,
      fullName: data.fullName,
      email: data.email,
      phone,
      serviceType: data.serviceType,
      message: data.message,
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
