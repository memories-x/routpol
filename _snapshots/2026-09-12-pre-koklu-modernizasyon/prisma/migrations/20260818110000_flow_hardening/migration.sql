-- Flow hardening: overage checkout dedupe + shared rate limits
ALTER TABLE "SubscriptionPeriod" ADD COLUMN IF NOT EXISTS "pendingOverageSessionId" TEXT;

CREATE TABLE IF NOT EXISTS "RateLimitBucket" (
    "key" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "resetAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "RateLimitBucket_pkey" PRIMARY KEY ("key")
);
