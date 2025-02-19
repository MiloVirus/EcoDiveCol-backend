import { Controller } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { Body, Post, Get, NotFoundException, UseGuards, Req } from '@nestjs/common';
import { Rewards } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { AuthenticatedRequest } from '../common/interfaces/request.interface';

@Controller('rewards')
export class RewardsController {

    constructor(private readonly rewardsService: RewardsService){}

    @Post('create')
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

    @Post('claim')
    @UseGuards(AuthGuard)
    async claimRewards(@Req() req: AuthenticatedRequest, @Body() data: {reward_id: string})
    {
        try
        {
            const user_id = req.user.sub
            const reward_id = data.reward_id

            return this.rewardsService.claimReward(user_id, reward_id)
        } catch (error)
        {
            throw new NotFoundException("Reward does not exist")
        }
    }

    @Get()
    @UseGuards(AuthGuard)
    async getRewards(@Req() req: AuthenticatedRequest)
    {
        const userId = req.user.sub
        try
        {
            return this.rewardsService.getRewardsforUser(userId)
        } catch (error)
        {
            throw new NotFoundException("Rewards does not exist")
        }
    }
}


