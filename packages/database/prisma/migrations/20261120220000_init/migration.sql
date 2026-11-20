CREATE TABLE "AuditEvent" (
    "id" TEXT NOT NULL,
    "eventType" VARCHAR(100) NOT NULL,
    "outcome" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AuditEvent_createdAt_idx" ON "AuditEvent"("createdAt");
