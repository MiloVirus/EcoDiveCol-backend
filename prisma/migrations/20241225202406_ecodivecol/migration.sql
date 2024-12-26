/*
  Warnings:

  - Added the required column `imagen` to the `Logros` table without a default value. This is not possible if the table is not empty.
  - Added the required column `puntos` to the `Logros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Logros" ADD COLUMN     "imagen" TEXT NOT NULL,
ADD COLUMN     "puntos" INTEGER NOT NULL;
