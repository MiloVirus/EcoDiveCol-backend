/*
  Warnings:

  - Added the required column `claimed` to the `Rewards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rewards" ADD COLUMN     "claimed" BOOLEAN NOT NULL;
