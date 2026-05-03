/*
  Warnings:

  - You are about to drop the column `tsv_search` on the `collection` table. All the data in the column will be lost.
  - You are about to drop the column `tsv_search` on the `note` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[value]` on the table `api_key` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "idx_collection_search";

-- DropIndex
DROP INDEX "idx_note_search";

-- AlterTable
ALTER TABLE "api_key" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "collection" DROP COLUMN "tsv_search";

-- AlterTable
ALTER TABLE "note" DROP COLUMN "tsv_search",
ALTER COLUMN "title" SET DEFAULT 'Untitled Note ' || now()::text;

-- CreateIndex
CREATE UNIQUE INDEX "api_key_value_key" ON "api_key"("value");
