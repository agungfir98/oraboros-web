/*
  Warnings:

  - You are about to drop the column `budgetId` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `orderOrderId` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `transactionId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_orderOrderId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "budgetId" TEXT,
ADD COLUMN     "transactionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "budgetId",
DROP COLUMN "orderOrderId";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("budgetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transactions"("transactionId") ON DELETE CASCADE ON UPDATE CASCADE;
