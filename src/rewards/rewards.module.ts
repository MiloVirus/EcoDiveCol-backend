import { Module } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    providers: [RewardsService],
    controllers: [RewardsController],
    imports: [PrismaModule, UsersModule],
})
export class RewardsModule {}
