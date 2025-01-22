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

    async getAchievementsforUser(userId: string): Promise <Logros[]>
    {
        const allAchievements = await this.prisma.logros.findMany()

        const completedAchievements = await this.prisma.usuariosOnLogros.findMany({
            where: {
                user_id: userId,
                completado: true,
            },
            select:{
                logro_id: true,
            }
        })

        const completedAchievementIds = completedAchievements.map((id)=> id.logro_id)

        const filteredAchievements = allAchievements.filter((achievement) => {
            return !completedAchievementIds.includes(achievement.logro_id)
        })

        return filteredAchievements;
    }

}
