/*
  Warnings:

  - You are about to drop the column `fecha` on the `Logros` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Logros" DROP CONSTRAINT "Logros_user_id_fkey";

-- AlterTable
ALTER TABLE "Logros" DROP COLUMN "fecha";

-- CreateTable
CREATE TABLE "UsuariosOnLogros" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "logro_id" TEXT NOT NULL,
    "completado" BOOLEAN NOT NULL DEFAULT false,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsuariosOnLogros_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsuariosOnLogros_user_id_logro_id_key" ON "UsuariosOnLogros"("user_id", "logro_id");

-- AddForeignKey
ALTER TABLE "UsuariosOnLogros" ADD CONSTRAINT "UsuariosOnLogros_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Usuarios"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuariosOnLogros" ADD CONSTRAINT "UsuariosOnLogros_logro_id_fkey" FOREIGN KEY ("logro_id") REFERENCES "Logros"("logro_id") ON DELETE RESTRICT ON UPDATE CASCADE;
