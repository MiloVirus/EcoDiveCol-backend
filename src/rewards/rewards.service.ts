import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Rewards } from '@prisma/client';
import { RewardsOnUsers } from '@prisma/client';
import { UsersService } from '../users/users.service';

@Injectable()
export class RewardsService {

    constructor(private prisma: PrismaService, private userService: UsersService) { }

    async createReward(reward: Rewards): Promise<Rewards> {
        return await this.prisma.rewards.create({
            data: reward
        })
    }

    async getRewards(): Promise<Rewards[]> {

        return await this.prisma.rewards.findMany()
    }

    async getRewardsforUser(userId: string): Promise<Rewards[]> {
        const allRewards = await this.prisma.rewards.findMany()

        const claimedRewards = await this.prisma.rewardsOnUsers.findMany({
            where: {
                user_id: userId,
                claimed: true
            }
        })

        const rewardsWithCompletion = allRewards.map((reward) => (
            {
                ...reward,
                claimed: claimedRewards.some(
                    (claimedReward) => claimedReward.reward_id === reward.reward_id
                )
            }
        ))

        return rewardsWithCompletion.sort((a, b) => {
            if (a.claimed === b.claimed) return 0;
            return a.claimed ? 1 : -1;
        })
    }

    async claimReward(userId: string, rewardId: string): Promise<RewardsOnUsers> {

        const user = await this.prisma.usuarios.findUnique({
            where: {
                user_id: userId
            }
        })
        const reward = await this.prisma.rewards.findUnique({
            where: {
                reward_id: rewardId
            }
        })
        const existingClaim = await this.prisma.rewardsOnUsers.findUnique({
            where: {
                user_id_reward_id: {
                    user_id: userId,
                    reward_id: rewardId
                }
            }
        })

        if (existingClaim) {
            throw new BadRequestException("Reward already claimed by user")
        }

        if (user.curr_puntos < reward.puntos) {
            throw new BadRequestException("User does not have enough points")
        }

        try {
            const newReward = await this.prisma.rewardsOnUsers.create({
                data: {
                    user_id: userId,
                    reward_id: rewardId
                }
            })
            await this.userService.modifyUserScore(userId, reward.puntos, 'subtract')

            return newReward;
        } catch (error) {
            throw new BadRequestException("Error claiming reward")
        }
    }
}
