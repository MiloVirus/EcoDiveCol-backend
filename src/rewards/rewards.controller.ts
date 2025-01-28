import { Controller } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { Body, Post, Get, NotFoundException } from '@nestjs/common';
import { Rewards } from '@prisma/client';

@Controller('rewards')
export class RewardsController {

    constructor(private readonly rewardsService: RewardsService){}

    @Post('createReward')
    async createReward(@Body() data: Rewards)
    {
        try
        {
            return this.rewardsService.createReward(data)
        } catch (error)
        {
            throw new NotFoundException("Reward does not exist")
        }
    }

    @Get('getRewards')
    async getRewards()
    {
        try
        {
            return this.rewardsService.getRewards()
        } catch (error)
        {
            throw new NotFoundException("Rewards does not exist")
        }
    }
}


