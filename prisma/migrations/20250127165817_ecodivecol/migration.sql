-- CreateTable
CREATE TABLE "Rewards" (
    "reward_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "puntos" INTEGER NOT NULL,
    "diveshop_id" TEXT NOT NULL,

    CONSTRAINT "Rewards_pkey" PRIMARY KEY ("reward_id")
);

-- AddForeignKey
ALTER TABLE "Rewards" ADD CONSTRAINT "Rewards_diveshop_id_fkey" FOREIGN KEY ("diveshop_id") REFERENCES "DiveShop"("diveshop_id") ON DELETE RESTRICT ON UPDATE CASCADE;
