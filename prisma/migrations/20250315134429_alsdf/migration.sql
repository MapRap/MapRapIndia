-- CreateEnum
CREATE TYPE "userTypes" AS ENUM ('student', 'customer');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "otp" TEXT,
    "emailVerified" TIMESTAMP(3),
    "otpExpiry" TIMESTAMP(3),
    "type" TEXT NOT NULL DEFAULT 'customer',
    "Phone" TEXT,
    "paymentId" TEXT,
    "country" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "stars" TEXT DEFAULT '0',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RealUsers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gmail" TEXT NOT NULL,
    "Proof" TEXT,
    "isReal" BOOLEAN,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Paintings" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "clientPrice" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "givenBy" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "paid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Paintings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interior" (
    "id" TEXT NOT NULL,
    "specifications" TEXT,
    "floors" INTEGER,
    "property" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "givenBy" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "isVerified" BOOLEAN,
    "assignedTo" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT NOT NULL,
    "publishable" BOOLEAN NOT NULL,
    "attachment" TEXT,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "studentPrice" TEXT,
    "initialPayment" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Interior_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plans" (
    "id" TEXT NOT NULL,
    "package" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "inr" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "floors" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "dollar" TEXT NOT NULL,
    "property" TEXT NOT NULL,

    CONSTRAINT "Plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtherJobs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "clientPrice" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "givenBy" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "attachments" TEXT NOT NULL DEFAULT '',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "paid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "OtherJobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maps" (
    "id" TEXT NOT NULL,
    "specifications" TEXT,
    "floors" INTEGER NOT NULL,
    "area" TEXT NOT NULL,
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    "C" INTEGER NOT NULL,
    "D" INTEGER NOT NULL,
    "E" INTEGER,
    "D1" INTEGER,
    "D2" INTEGER,
    "D3" INTEGER,
    "D4" INTEGER,
    "plot" TEXT NOT NULL,
    "givenBy" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "isVerified" BOOLEAN,
    "assignedTo" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "publishable" BOOLEAN NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "expected" TEXT,
    "studentPrice" TEXT,
    "initialPayment" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Maps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Steps" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "started" BOOLEAN NOT NULL DEFAULT false,
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "receipt" TEXT,
    "onGmail" TEXT,
    "attachments" TEXT,
    "comments" TEXT,
    "totalSteps" INTEGER NOT NULL DEFAULT 2,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InteriorSteps" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "started" BOOLEAN NOT NULL DEFAULT false,
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "receipt" TEXT,
    "onGmail" TEXT,
    "attachments" TEXT,
    "comments" TEXT,
    "totalSteps" INTEGER NOT NULL DEFAULT 2,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "InteriorSteps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requests" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "by" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "stars" TEXT DEFAULT '0',

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtherRequests" (
    "id" TEXT NOT NULL,
    "otherJobId" TEXT NOT NULL,
    "by" TEXT NOT NULL,
    "gmail" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "OtherRequests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteVisit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "gmail" TEXT NOT NULL,

    CONSTRAINT "SiteVisit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "RealUsers_id_key" ON "RealUsers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OtherJobs_givenBy_key" ON "OtherJobs"("givenBy");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Steps" ADD CONSTRAINT "Steps_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Maps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InteriorSteps" ADD CONSTRAINT "InteriorSteps_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Interior"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Maps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherRequests" ADD CONSTRAINT "OtherRequests_otherJobId_fkey" FOREIGN KEY ("otherJobId") REFERENCES "OtherJobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
