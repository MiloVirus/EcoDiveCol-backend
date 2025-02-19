/*
  Warnings:

  - You are about to drop the column `PADL_NAU` on the `Usuarios` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[PADI_NAUI_ID]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `PADI_NAUI_ID` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuarios" DROP COLUMN "PADL_NAU",
ADD COLUMN     "PADI_NAUI_ID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_phone_key" ON "Usuarios"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_PADI_NAUI_ID_key" ON "Usuarios"("PADI_NAUI_ID");
