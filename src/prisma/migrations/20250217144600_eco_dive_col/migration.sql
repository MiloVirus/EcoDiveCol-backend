-- CreateTable
CREATE TABLE "DiveShopOnUsuariosFavoritos" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "diveshop_id" TEXT NOT NULL,
    "favorito" BOOLEAN NOT NULL DEFAULT true,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiveShopOnUsuariosFavoritos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiveShopOnUsuariosFavoritos_user_id_diveshop_id_key" ON "DiveShopOnUsuariosFavoritos"("user_id", "diveshop_id");

-- AddForeignKey
ALTER TABLE "DiveShopOnUsuariosFavoritos" ADD CONSTRAINT "DiveShopOnUsuariosFavoritos_diveshop_id_fkey" FOREIGN KEY ("diveshop_id") REFERENCES "DiveShop"("diveshop_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiveShopOnUsuariosFavoritos" ADD CONSTRAINT "DiveShopOnUsuariosFavoritos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Usuarios"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
