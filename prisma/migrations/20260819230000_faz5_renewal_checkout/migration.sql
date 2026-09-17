-- Faz 5: renewal reminder + case checkout idempotency
ALTER TABLE "SubscriptionPeriod" ADD COLUMN IF NOT EXISTS "renewalReminderSentAt" TIMESTAMP(3);

CREATE TABLE IF NOT EXISTS "CaseCheckoutReceipt" (
    "sessionId" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CaseCheckoutReceipt_pkey" PRIMARY KEY ("sessionId")
);
