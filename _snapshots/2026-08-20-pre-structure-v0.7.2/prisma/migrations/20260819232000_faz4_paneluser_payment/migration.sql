-- CreateTable
CREATE TABLE "PanelUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL DEFAULT 'operator',
    "passwordHash" TEXT NOT NULL,
    "passwordVersion" INTEGER NOT NULL DEFAULT 1,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PanelUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PanelUser_username_key" ON "PanelUser"("username");

-- AlterTable
ALTER TABLE "Case" ADD COLUMN "paymentStatus" TEXT NOT NULL DEFAULT 'none';
ALTER TABLE "Case" ADD COLUMN "paymentAmountCents" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Case" ADD COLUMN "paymentCurrency" TEXT NOT NULL DEFAULT 'pln';
ALTER TABLE "Case" ADD COLUMN "paymentPaidAt" TIMESTAMP(3);
ALTER TABLE "Case" ADD COLUMN "stripeSessionId" TEXT;
ALTER TABLE "Case" ADD COLUMN "stripeCustomerId" TEXT;
ALTER TABLE "Case" ADD COLUMN "stripeSubscriptionId" TEXT;
ALTER TABLE "Case" ADD COLUMN "paymentInvoice" JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "Case_stripeSessionId_key" ON "Case"("stripeSessionId");

-- Backfill payment columns from legacy JSON
UPDATE "Case"
SET
  "paymentStatus" = COALESCE("payment"->>'status', 'none'),
  "paymentAmountCents" = COALESCE(("payment"->>'amountCents')::int, 0),
  "paymentCurrency" = COALESCE("payment"->>'currency', 'pln'),
  "paymentPaidAt" = CASE
    WHEN "payment"->>'paidAt' IS NOT NULL AND "payment"->>'paidAt' <> ''
    THEN ("payment"->>'paidAt')::timestamp
    ELSE NULL
  END,
  "stripeSessionId" = NULLIF("payment"->>'stripeSessionId', ''),
  "stripeCustomerId" = NULLIF("payment"->>'stripeCustomerId', ''),
  "stripeSubscriptionId" = NULLIF("payment"->>'stripeSubscriptionId', ''),
  "paymentInvoice" = "payment"->'invoice'
WHERE "payment" IS NOT NULL;
