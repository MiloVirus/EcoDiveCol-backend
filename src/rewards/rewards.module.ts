import { Module } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
    providers: [RewardsService],
    controllers: [RewardsController],
    imports: [PrismaModule]
})
export class RewardsModule {}
