import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { LogrosController } from './logros/logros.controller';
import { LogrosService } from './logros/logros.service';
import { LogrosModule } from './logros/logros.module';
import { UploadService } from './upload/upload.service';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';
import { RewardsController } from './rewards/rewards.controller';
import { RewardsService } from './rewards/rewards.service';
import { RewardsModule } from './rewards/rewards.module';



@Module({
  imports: [AuthModule, UsersModule, PrismaModule, LogrosModule, UploadModule, RewardsModule],
  controllers: [LogrosController, UploadController, RewardsController],
  providers: [LogrosService, UploadService, RewardsService],
})
export class AppModule {}
