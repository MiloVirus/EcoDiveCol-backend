import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Rewards } from '@prisma/client';

@Injectable()
export class RewardsService {

    constructor(private prisma: PrismaService) { }

    async createReward(reward: Rewards): Promise<Rewards> {
        return await this.prisma.rewards.create({
            data: reward
        })
    }

    async getRewards(): Promise<Rewards[]> {
        
        return await this.prisma.rewards.findMany()
    }

    async claimReward(id: string)
    {
        return await this.prisma.rewards.update({
            where: {reward_id: id},
            data: {
                claimed: true
                } 
        })
    }
}
