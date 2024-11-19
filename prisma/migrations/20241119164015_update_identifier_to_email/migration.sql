/*
  Warnings:

  - You are about to drop the column `identifier` on the `PasswordResetToken` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `TwoFactorToken` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `VerificationToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,token]` on the table `PasswordResetToken` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,token]` on the table `TwoFactorToken` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,token]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `PasswordResetToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `TwoFactorToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PasswordResetToken_identifier_token_key";

-- DropIndex
DROP INDEX "TwoFactorToken_identifier_token_key";

-- DropIndex
DROP INDEX "VerificationToken_identifier_token_key";

-- AlterTable
ALTER TABLE "PasswordResetToken" DROP COLUMN "identifier",
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TwoFactorToken" DROP COLUMN "identifier",
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "identifier",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_email_token_key" ON "PasswordResetToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_email_token_key" ON "TwoFactorToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");
