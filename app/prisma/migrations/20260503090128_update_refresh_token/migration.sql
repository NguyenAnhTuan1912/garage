/*
  Warnings:

  - A unique constraint covering the columns `[tokenKey]` on the table `refresh_token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tokenKey` to the `refresh_token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "note" ALTER COLUMN "title" SET DEFAULT 'Untitled Note ' || now()::text;

-- AlterTable
ALTER TABLE "refresh_token" ADD COLUMN     "tokenKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_tokenKey_key" ON "refresh_token"("tokenKey");
