-- CreateTable
CREATE TABLE "QuoteLead" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneE164" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "message" TEXT,
    "locale" TEXT,
    "source" TEXT NOT NULL DEFAULT 'landing',
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contactedAt" TIMESTAMP(3),

    CONSTRAINT "QuoteLead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuoteLead_createdAt_idx" ON "QuoteLead"("createdAt");

-- CreateIndex
CREATE INDEX "QuoteLead_status_idx" ON "QuoteLead"("status");
