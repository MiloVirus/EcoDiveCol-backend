/*
  Warnings:

  - Added the required column `description` to the `DiveShop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiveShop" ADD COLUMN     "description" TEXT NOT NULL;
