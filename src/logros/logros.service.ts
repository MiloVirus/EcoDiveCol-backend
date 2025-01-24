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

    async getAchievementsforUser(userId: string): Promise<Logros[]> {
        const allAchievements = await this.prisma.logros.findMany();
    
        const completedAchievements = await this.prisma.usuariosOnLogros.findMany({
            where: {
                user_id: userId,
                completado: true,
            },
        });
    
        const achievementsWithCompletion = allAchievements.map((logro) => ({
            ...logro,
            completado: completedAchievements.some(
                (completedLogro) => completedLogro.logro_id === logro.logro_id
            ),
        }));
    
        return achievementsWithCompletion.sort((a, b) => {
            if (a.completado === b.completado) return 0; 
            return a.completado ? 1 : -1;
        });
    }

}
