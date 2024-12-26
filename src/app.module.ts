import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { LogrosController } from './logros/logros.controller';
import { LogrosService } from './logros/logros.service';
import { LogrosModule } from './logros/logros.module';



@Module({
  imports: [AuthModule, UsersModule, PrismaModule, LogrosModule],
  controllers: [LogrosController],
  providers: [LogrosService],
})
export class AppModule {}
