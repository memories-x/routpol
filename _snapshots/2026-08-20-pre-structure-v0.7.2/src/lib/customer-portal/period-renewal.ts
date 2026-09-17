import { getPrisma, isDatabaseConfigured } from "@/lib/db";
import { sendPeriodRenewalReminderMail } from "@/lib/mail/period-renewal-mail";

export const RENEWAL_REMINDER_DAYS = 5;

/** Dönem bitimine RENEWAL_REMINDER_DAYS gün kala hatırlatma (tek sefer). */
export async function sendPeriodRenewalReminders(): Promise<{
  sent: number;
  skipped: number;
}> {
  if (!isDatabaseConfigured()) {
    return { sent: 0, skipped: 0 };
  }

  const prisma = getPrisma();
  const now = new Date();
  const windowStart = new Date(now);
  windowStart.setDate(windowStart.getDate() + RENEWAL_REMINDER_DAYS - 1);
  const windowEnd = new Date(now);
  windowEnd.setDate(windowEnd.getDate() + RENEWAL_REMINDER_DAYS + 1);

  const periods = await prisma.subscriptionPeriod.findMany({
    where: {
      status: "active",
      renewalReminderSentAt: null,
      periodEnd: { gte: windowStart, lte: windowEnd },
    },
    include: {
      customer: {
        select: {
          email: true,
          preferredResultLocale: true,
        },
      },
    },
    take: 50,
  });

  let sent = 0;
  let skipped = 0;

  for (const period of periods) {
    const queued = await prisma.subscriptionPeriod.findFirst({
      where: {
        customerId: period.customerId,
        status: "queued",
        periodEnd: { gt: now },
      },
    });
    if (queued) {
      skipped += 1;
      continue;
    }

    const locale =
      period.customer.preferredResultLocale === "pl" ||
      period.customer.preferredResultLocale === "en"
        ? period.customer.preferredResultLocale
        : "tr";

    try {
      await sendPeriodRenewalReminderMail({
        to: period.customer.email,
        locale,
        periodEnd: period.periodEnd,
      });
      await prisma.subscriptionPeriod.update({
        where: { id: period.id },
        data: { renewalReminderSentAt: new Date() },
      });
      sent += 1;
    } catch (err) {
      console.error("[period-renewal]", period.id, err);
      skipped += 1;
    }
  }

  return { sent, skipped };
}

export function isWithinRenewalReminderWindow(
  periodEnd: Date,
  now = new Date(),
): boolean {
  const msPerDay = 86_400_000;
  const daysLeft = (periodEnd.getTime() - now.getTime()) / msPerDay;
  return daysLeft >= RENEWAL_REMINDER_DAYS - 1 && daysLeft <= RENEWAL_REMINDER_DAYS + 1;
}
