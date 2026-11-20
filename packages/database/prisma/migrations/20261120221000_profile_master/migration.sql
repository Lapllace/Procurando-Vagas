CREATE TYPE "FactStatus" AS ENUM ('CANDIDATE_PROVIDED', 'NEEDS_REVIEW', 'CONFIRMED');

CREATE TABLE "CandidateProfile" (
    "id" TEXT NOT NULL DEFAULT 'local-candidate',
    "displayName" VARCHAR(160),
    "headline" VARCHAR(240),
    "email" VARCHAR(320),
    "phone" VARCHAR(60),
    "location" VARCHAR(180),
    "portfolioUrl" VARCHAR(2048),
    "githubUrl" VARCHAR(2048),
    "linkedinUrl" VARCHAR(2048),
    "summary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CandidateProfile_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "EducationRecord" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "institution" VARCHAR(180) NOT NULL,
    "course" VARCHAR(180) NOT NULL,
    "fieldOfStudy" VARCHAR(180),
    "status" VARCHAR(40) NOT NULL DEFAULT 'IN_PROGRESS',
    "startPeriod" VARCHAR(30),
    "expectedEndPeriod" VARCHAR(30),
    "details" TEXT,
    "factStatus" "FactStatus" NOT NULL DEFAULT 'NEEDS_REVIEW',
    "sourceReference" VARCHAR(2048),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "EducationRecord_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ExperienceRecord" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "title" VARCHAR(180) NOT NULL,
    "organization" VARCHAR(180),
    "employmentType" VARCHAR(60),
    "startPeriod" VARCHAR(30),
    "endPeriod" VARCHAR(30),
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "responsibilities" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "technologies" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "factStatus" "FactStatus" NOT NULL DEFAULT 'NEEDS_REVIEW',
    "sourceReference" VARCHAR(2048),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ExperienceRecord_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ProjectRecord" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "name" VARCHAR(180) NOT NULL,
    "description" TEXT,
    "role" VARCHAR(120),
    "url" VARCHAR(2048),
    "startPeriod" VARCHAR(30),
    "endPeriod" VARCHAR(30),
    "technologies" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "factStatus" "FactStatus" NOT NULL DEFAULT 'NEEDS_REVIEW',
    "sourceReference" VARCHAR(2048),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ProjectRecord_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SkillRecord" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "category" VARCHAR(100),
    "level" VARCHAR(60),
    "lastUsedPeriod" VARCHAR(30),
    "evidence" TEXT,
    "factStatus" "FactStatus" NOT NULL DEFAULT 'NEEDS_REVIEW',
    "sourceReference" VARCHAR(2048),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SkillRecord_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "LanguageRecord" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "proficiency" VARCHAR(80),
    "factStatus" "FactStatus" NOT NULL DEFAULT 'NEEDS_REVIEW',
    "sourceReference" VARCHAR(2048),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "LanguageRecord_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CertificationRecord" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "name" VARCHAR(180) NOT NULL,
    "issuer" VARCHAR(180),
    "issuedPeriod" VARCHAR(30),
    "url" VARCHAR(2048),
    "factStatus" "FactStatus" NOT NULL DEFAULT 'NEEDS_REVIEW',
    "sourceReference" VARCHAR(2048),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CertificationRecord_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "JobPreferences" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "targetTitles" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "targetAreas" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "excludedAreas" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "seniority" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "employmentTypes" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "workModes" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "locations" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "weeklyHoursMin" INTEGER,
    "weeklyHoursMax" INTEGER,
    "commuteLimitMinutes" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "JobPreferences_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AvailabilityTerm" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "termLabel" VARCHAR(80),
    "timezone" VARCHAR(80) NOT NULL DEFAULT 'America/Bahia',
    "validFrom" VARCHAR(30),
    "validUntil" VARCHAR(30),
    "weeklyHoursTarget" INTEGER,
    "notes" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AvailabilityTerm_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ScheduleBlock" (
    "id" TEXT NOT NULL,
    "availabilityId" TEXT NOT NULL,
    "label" VARCHAR(140) NOT NULL,
    "blockType" VARCHAR(40) NOT NULL DEFAULT 'CLASS',
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" VARCHAR(5) NOT NULL,
    "endTime" VARCHAR(5) NOT NULL,
    "factStatus" "FactStatus" NOT NULL DEFAULT 'NEEDS_REVIEW',
    "sourceReference" VARCHAR(2048),
    CONSTRAINT "ScheduleBlock_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WorkWindow" (
    "id" TEXT NOT NULL,
    "availabilityId" TEXT NOT NULL,
    "label" VARCHAR(140),
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" VARCHAR(5) NOT NULL,
    "endTime" VARCHAR(5) NOT NULL,
    "availabilityType" VARCHAR(40) NOT NULL DEFAULT 'FIXED',
    "factStatus" "FactStatus" NOT NULL DEFAULT 'NEEDS_REVIEW',
    "sourceReference" VARCHAR(2048),
    CONSTRAINT "WorkWindow_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "JobPreferences_profileId_key" ON "JobPreferences"("profileId");
CREATE UNIQUE INDEX "AvailabilityTerm_profileId_key" ON "AvailabilityTerm"("profileId");
CREATE INDEX "EducationRecord_profileId_idx" ON "EducationRecord"("profileId");
CREATE INDEX "ExperienceRecord_profileId_idx" ON "ExperienceRecord"("profileId");
CREATE INDEX "ProjectRecord_profileId_idx" ON "ProjectRecord"("profileId");
CREATE INDEX "SkillRecord_profileId_idx" ON "SkillRecord"("profileId");
CREATE INDEX "LanguageRecord_profileId_idx" ON "LanguageRecord"("profileId");
CREATE INDEX "CertificationRecord_profileId_idx" ON "CertificationRecord"("profileId");
CREATE INDEX "ScheduleBlock_availabilityId_dayOfWeek_idx" ON "ScheduleBlock"("availabilityId", "dayOfWeek");
CREATE INDEX "WorkWindow_availabilityId_dayOfWeek_idx" ON "WorkWindow"("availabilityId", "dayOfWeek");

ALTER TABLE "EducationRecord" ADD CONSTRAINT "EducationRecord_profileId_fkey"
  FOREIGN KEY ("profileId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ExperienceRecord" ADD CONSTRAINT "ExperienceRecord_profileId_fkey"
  FOREIGN KEY ("profileId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ProjectRecord" ADD CONSTRAINT "ProjectRecord_profileId_fkey"
  FOREIGN KEY ("profileId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SkillRecord" ADD CONSTRAINT "SkillRecord_profileId_fkey"
  FOREIGN KEY ("profileId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LanguageRecord" ADD CONSTRAINT "LanguageRecord_profileId_fkey"
  FOREIGN KEY ("profileId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CertificationRecord" ADD CONSTRAINT "CertificationRecord_profileId_fkey"
  FOREIGN KEY ("profileId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "JobPreferences" ADD CONSTRAINT "JobPreferences_profileId_fkey"
  FOREIGN KEY ("profileId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AvailabilityTerm" ADD CONSTRAINT "AvailabilityTerm_profileId_fkey"
  FOREIGN KEY ("profileId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ScheduleBlock" ADD CONSTRAINT "ScheduleBlock_availabilityId_fkey"
  FOREIGN KEY ("availabilityId") REFERENCES "AvailabilityTerm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "WorkWindow" ADD CONSTRAINT "WorkWindow_availabilityId_fkey"
  FOREIGN KEY ("availabilityId") REFERENCES "AvailabilityTerm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
