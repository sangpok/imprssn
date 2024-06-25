/*
  Warnings:

  - You are about to drop the column `userId` on the `Imprssn` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Imprssn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetUserId` to the `Imprssn` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Imprssn" DROP CONSTRAINT "Imprssn_userId_fkey";

-- AlterTable
ALTER TABLE "Imprssn" DROP COLUMN "userId",
ADD COLUMN     "authorId" UUID NOT NULL,
ADD COLUMN     "targetUserId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Imprssn" ADD CONSTRAINT "Imprssn_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imprssn" ADD CONSTRAINT "Imprssn_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
