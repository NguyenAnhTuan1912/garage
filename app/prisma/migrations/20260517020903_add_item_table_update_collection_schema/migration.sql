/*
  Warnings:

  - You are about to drop the column `content` on the `collection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "collection" DROP COLUMN "content",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "photo" TEXT;

-- AlterTable
ALTER TABLE "note" ALTER COLUMN "title" SET DEFAULT 'Untitled Note ' || now()::text;

-- CreateTable
CREATE TABLE "item" (
    "id" TEXT NOT NULL,
    "type" "CollectionType" NOT NULL DEFAULT 'LINK',
    "description" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "item_type_idx" ON "item"("type");

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
