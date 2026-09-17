-- Stripe Subscription: customer linkage + invoice idempotency + period invoice id
ALTER TABLE "Customer" ADD COLUMN IF NOT EXISTS "stripeCustomerId" TEXT;
ALTER TABLE "Customer" ADD COLUMN IF NOT EXISTS "stripeSubscriptionId" TEXT;
ALTER TABLE "Customer" ADD COLUMN IF NOT EXISTS "stripeSubscriptionStatus" TEXT;
ALTER TABLE "Customer" ADD COLUMN IF NOT EXISTS "stripeSubscriptionPackage" TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS "Customer_stripeCustomerId_key"
  ON "Customer"("stripeCustomerId");

ALTER TABLE "SubscriptionPeriod" ADD COLUMN IF NOT EXISTS "stripeInvoiceId" TEXT;
ALTER TABLE "SubscriptionPeriod" ADD COLUMN IF NOT EXISTS "stripeSubscriptionId" TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS "SubscriptionPeriod_stripeInvoiceId_key"
  ON "SubscriptionPeriod"("stripeInvoiceId");

CREATE INDEX IF NOT EXISTS "SubscriptionPeriod_stripeSubscriptionId_idx"
  ON "SubscriptionPeriod"("stripeSubscriptionId");

CREATE TABLE IF NOT EXISTS "StripeInvoiceReceipt" (
    "invoiceId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "customerId" TEXT,
    "periodId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StripeInvoiceReceipt_pkey" PRIMARY KEY ("invoiceId")
);
