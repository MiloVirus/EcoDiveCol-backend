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



@Module({
  imports: [AuthModule, UsersModule, PrismaModule, LogrosModule, UploadModule],
  controllers: [LogrosController, UploadController],
  providers: [LogrosService, UploadService],
})
export class AppModule {}
