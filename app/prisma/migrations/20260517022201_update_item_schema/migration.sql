/*
  Warnings:

  - Added the required column `collectionId` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item" ADD COLUMN     "collectionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "note" ALTER COLUMN "title" SET DEFAULT 'Untitled Note ' || now()::text;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
