-- CreateTable
CREATE TABLE "RewardsOnUsers" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "reward_id" TEXT NOT NULL,
    "claimed" BOOLEAN NOT NULL DEFAULT false,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RewardsOnUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RewardsOnUsers_user_id_reward_id_key" ON "RewardsOnUsers"("user_id", "reward_id");

-- AddForeignKey
ALTER TABLE "RewardsOnUsers" ADD CONSTRAINT "RewardsOnUsers_reward_id_fkey" FOREIGN KEY ("reward_id") REFERENCES "Rewards"("reward_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardsOnUsers" ADD CONSTRAINT "RewardsOnUsers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Usuarios"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
