import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Logros } from '@prisma/client';

@Injectable()
export class LogrosService {

    constructor(private prisma: PrismaService){}

    async getAllAchievements(): Promise <Logros[]>
    {
        return await this.prisma.logros.findMany()
    }
}
