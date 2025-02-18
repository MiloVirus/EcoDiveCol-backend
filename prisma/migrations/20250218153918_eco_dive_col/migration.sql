/*
  Warnings:

  - Added the required column `image` to the `DiveShop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiveShop" ADD COLUMN     "image" TEXT NOT NULL;
