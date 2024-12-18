import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    JwtModule.register({
      global:true,
      secret:process.env.JWT_SECRET,
      signOptions:{expiresIn:'60s'}
    }),
    PrismaModule
  ],
  exports:[AuthService]
})
export class AuthModule {}
