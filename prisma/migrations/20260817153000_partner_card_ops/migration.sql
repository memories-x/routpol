-- Partner card operational fields

ALTER TABLE "LawyerPartner" ADD COLUMN IF NOT EXISTS "website" TEXT;
ALTER TABLE "LawyerPartner" ADD COLUMN IF NOT EXISTS "specialty" TEXT;
ALTER TABLE "LawyerPartner" ADD COLUMN IF NOT EXISTS "languages" JSONB;
ALTER TABLE "LawyerPartner" ADD COLUMN IF NOT EXISTS "contractStatus" TEXT NOT NULL DEFAULT 'none';
