import { Module } from '@nestjs/common';
import { DiveshopService } from './diveshop.service';
import { DiveshopController } from './diveshop.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    providers: [DiveshopService],
    controllers: [DiveshopController],
    imports: [PrismaModule]
})
export class DiveshopModule {}
