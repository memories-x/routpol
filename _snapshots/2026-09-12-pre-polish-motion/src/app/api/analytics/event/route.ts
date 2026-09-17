import { fail, ok } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { NextResponse } from "next/server";
import { z } from "zod";

const ALLOWED_EVENTS = [
  "teklif_submit",
  "whatsapp_click",
  "cta_teklif_click",
  "lang_switch",
  "service_detail_view",
] as const;

const bodySchema = z.object({
  name: z.enum(ALLOWED_EVENTS),
  locale: z.string().min(2).max(5).optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
});

/** Çerezsiz sunucu tarafı olay — rate limit, oturum/cookie yok. */
export async function POST(request: Request) {
  const limited = checkRateLimit(`analytics:${getClientIp(request)}`);
  if (!limited.ok) {
    return NextResponse.json(fail("RATE_LIMITED", "Too many requests"), {
      status: 429,
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

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      fail("VALIDATION_ERROR", "Invalid event", parsed.error.flatten()),
      { status: 400 },
    );
  }

  const { name, locale, meta } = parsed.data;
  await trackEvent(name, meta, locale);
  return NextResponse.json(ok({ tracked: name }));
}
