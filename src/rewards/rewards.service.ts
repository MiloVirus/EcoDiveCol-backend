import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Rewards } from '@prisma/client';

@Injectable()
export class RewardsService {

    constructor(private prisma: PrismaService) { }

    async getRewards(): Promise<Rewards[]> {
        
        return await this.prisma.rewards.findMany()
    }
}
