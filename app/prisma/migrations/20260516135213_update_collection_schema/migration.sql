/*
  Warnings:

  - Added the required column `title` to the `collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "collection" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "note" ALTER COLUMN "title" SET DEFAULT 'Untitled Note ' || now()::text;

-- CreateIndex
CREATE INDEX "collection_type_idx" ON "collection"("type");

-- CreateIndex
CREATE INDEX "collection_topic_idx" ON "collection"("topic");
