-- Faz 1: Stripe webhook event.id idempotency
CREATE TABLE IF NOT EXISTS "StripeEventReceipt" (
    "eventId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StripeEventReceipt_pkey" PRIMARY KEY ("eventId")
);
