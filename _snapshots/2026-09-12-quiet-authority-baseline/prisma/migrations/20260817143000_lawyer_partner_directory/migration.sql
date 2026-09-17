-- Lawyer partner directory (operator-owned cards; no lawyer login)

CREATE TABLE IF NOT EXISTS "LawyerPartner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "officeName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "nip" TEXT,
    "barNumber" TEXT,
    "city" TEXT,
    "address" TEXT,
    "notes" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LawyerPartner_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Case" ADD COLUMN IF NOT EXISTS "lawyerPartnerId" TEXT;

CREATE INDEX IF NOT EXISTS "Case_lawyerPartnerId_idx" ON "Case"("lawyerPartnerId");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Case_lawyerPartnerId_fkey'
  ) THEN
    ALTER TABLE "Case"
      ADD CONSTRAINT "Case_lawyerPartnerId_fkey"
      FOREIGN KEY ("lawyerPartnerId") REFERENCES "LawyerPartner"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;
