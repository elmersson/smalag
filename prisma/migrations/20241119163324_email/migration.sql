/*
  Warnings:

  - You are about to drop the column `email` on the `PasswordResetToken` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `TwoFactorToken` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `VerificationToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identifier,token]` on the table `PasswordResetToken` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier,token]` on the table `TwoFactorToken` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier,token]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier` to the `PasswordResetToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identifier` to the `TwoFactorToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identifier` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PasswordResetToken_email_token_key";

-- DropIndex
DROP INDEX "TwoFactorToken_email_token_key";

-- DropIndex
DROP INDEX "VerificationToken_email_token_key";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "oauth_token" TEXT,
ADD COLUMN     "oauth_token_secret" TEXT;

-- AlterTable
ALTER TABLE "PasswordResetToken" DROP COLUMN "email",
ADD COLUMN     "identifier" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TwoFactorToken" DROP COLUMN "email",
ADD COLUMN     "identifier" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "email",
ADD COLUMN     "identifier" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_identifier_token_key" ON "PasswordResetToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_identifier_token_key" ON "TwoFactorToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
