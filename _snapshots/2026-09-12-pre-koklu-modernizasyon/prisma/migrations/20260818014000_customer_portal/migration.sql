-- Customer portal + subscription period
ALTER TABLE "Customer" ADD COLUMN IF NOT EXISTS "entityType" TEXT;
ALTER TABLE "Customer" ADD COLUMN IF NOT EXISTS "preferredResultLocale" TEXT;

CREATE TABLE IF NOT EXISTS "CustomerPortalLogin" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "requestIp" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CustomerPortalLogin_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SubscriptionPeriod" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "packageSlug" TEXT NOT NULL DEFAULT 'aylik-paket',
    "quota" INTEGER NOT NULL,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "overageCredits" INTEGER NOT NULL DEFAULT 0,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "anchorCaseId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SubscriptionPeriod_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "LetterSubmission" (
    "id" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    "caseId" TEXT,
    "originalName" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "storagePath" TEXT NOT NULL,
    "pageCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LetterSubmission_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Case" ADD COLUMN IF NOT EXISTS "subscriptionPeriodId" TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS "CustomerPortalLogin_tokenHash_key" ON "CustomerPortalLogin"("tokenHash");
CREATE INDEX IF NOT EXISTS "CustomerPortalLogin_customerId_createdAt_idx" ON "CustomerPortalLogin"("customerId", "createdAt");
CREATE INDEX IF NOT EXISTS "SubscriptionPeriod_customerId_status_idx" ON "SubscriptionPeriod"("customerId", "status");
CREATE INDEX IF NOT EXISTS "LetterSubmission_periodId_createdAt_idx" ON "LetterSubmission"("periodId", "createdAt");
CREATE INDEX IF NOT EXISTS "Case_subscriptionPeriodId_idx" ON "Case"("subscriptionPeriodId");

ALTER TABLE "CustomerPortalLogin" DROP CONSTRAINT IF EXISTS "CustomerPortalLogin_customerId_fkey";
ALTER TABLE "CustomerPortalLogin" ADD CONSTRAINT "CustomerPortalLogin_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "SubscriptionPeriod" DROP CONSTRAINT IF EXISTS "SubscriptionPeriod_customerId_fkey";
ALTER TABLE "SubscriptionPeriod" ADD CONSTRAINT "SubscriptionPeriod_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "LetterSubmission" DROP CONSTRAINT IF EXISTS "LetterSubmission_periodId_fkey";
ALTER TABLE "LetterSubmission" ADD CONSTRAINT "LetterSubmission_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "SubscriptionPeriod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Case" DROP CONSTRAINT IF EXISTS "Case_subscriptionPeriodId_fkey";
ALTER TABLE "Case" ADD CONSTRAINT "Case_subscriptionPeriodId_fkey" FOREIGN KEY ("subscriptionPeriodId") REFERENCES "SubscriptionPeriod"("id") ON DELETE SET NULL ON UPDATE CASCADE;
