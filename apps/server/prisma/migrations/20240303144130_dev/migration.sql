/*
  Warnings:

  - Changed the type of `amount` on the `Budget` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `amound` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "amount",
ADD COLUMN     "amount" MONEY NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "amound" MONEY NOT NULL;
