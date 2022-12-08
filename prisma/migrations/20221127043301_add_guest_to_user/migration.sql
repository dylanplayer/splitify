/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Guest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Guest" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Guest_userId_key" ON "Guest"("userId");

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
