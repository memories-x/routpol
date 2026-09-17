-- Prevent two periods from the same paid case
CREATE UNIQUE INDEX IF NOT EXISTS "SubscriptionPeriod_anchorCaseId_key"
  ON "SubscriptionPeriod"("anchorCaseId");

-- Stripe session idempotency (overage webhook retries)
CREATE TABLE IF NOT EXISTS "StripeCheckoutReceipt" (
    "sessionId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "periodId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StripeCheckoutReceipt_pkey" PRIMARY KEY ("sessionId")
);
