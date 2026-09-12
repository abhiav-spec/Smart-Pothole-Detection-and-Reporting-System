-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'AUTHORITY', 'ADMIN');

-- CreateEnum
CREATE TYPE "PotholeStatus" AS ENUM ('REPORTED', 'VERIFIED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PotholeSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Authority" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Authority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pothole" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "severity" "PotholeSeverity" NOT NULL,
    "status" "PotholeStatus" NOT NULL DEFAULT 'REPORTED',
    "confidence" DOUBLE PRECISION,
    "description" TEXT,
    "authorityId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pothole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Detection" (
    "id" TEXT NOT NULL,
    "potholeId" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "className" TEXT NOT NULL,
    "boundingBox" JSONB,
    "modelVersion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Detection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "potholeId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "potholeId" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PotholeStatusHistory" (
    "id" TEXT NOT NULL,
    "potholeId" TEXT NOT NULL,
    "oldStatus" "PotholeStatus" NOT NULL,
    "newStatus" "PotholeStatus" NOT NULL,
    "changedById" TEXT,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PotholeStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Authority_code_key" ON "Authority"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Authority_email_key" ON "Authority"("email");

-- CreateIndex
CREATE INDEX "Pothole_status_idx" ON "Pothole"("status");

-- CreateIndex
CREATE INDEX "Pothole_severity_idx" ON "Pothole"("severity");

-- CreateIndex
CREATE INDEX "Pothole_authorityId_idx" ON "Pothole"("authorityId");

-- CreateIndex
CREATE INDEX "Pothole_createdAt_idx" ON "Pothole"("createdAt");

-- AddForeignKey
ALTER TABLE "Pothole" ADD CONSTRAINT "Pothole_authorityId_fkey" FOREIGN KEY ("authorityId") REFERENCES "Authority"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detection" ADD CONSTRAINT "Detection_potholeId_fkey" FOREIGN KEY ("potholeId") REFERENCES "Pothole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_potholeId_fkey" FOREIGN KEY ("potholeId") REFERENCES "Pothole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_potholeId_fkey" FOREIGN KEY ("potholeId") REFERENCES "Pothole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PotholeStatusHistory" ADD CONSTRAINT "PotholeStatusHistory_potholeId_fkey" FOREIGN KEY ("potholeId") REFERENCES "Pothole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PotholeStatusHistory" ADD CONSTRAINT "PotholeStatusHistory_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
