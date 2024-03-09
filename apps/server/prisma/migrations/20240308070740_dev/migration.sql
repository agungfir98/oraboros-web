/*
  Warnings:

  - Made the column `userId` on table `Transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Transactions" ALTER COLUMN "userId" SET NOT NULL;
