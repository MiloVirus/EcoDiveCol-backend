import { Module } from '@nestjs/common';
import { LogrosService } from './logros.service';
import { LogrosController } from './logros.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
    providers:[LogrosService],
    controllers:[LogrosController],
    imports: [PrismaModule]
})
export class LogrosModule {}
