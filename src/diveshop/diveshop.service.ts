import { Injectable } from '@nestjs/common';
import { DiveShop } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DiveshopService {
    constructor(private prisma: PrismaService) {}

    async createDiveShop(diveShop: DiveShop): Promise<DiveShop> 
    {
        return await this.prisma.diveShop.create({
            data: diveShop
        });
    }

    async getDiveShops() {
        return await this.prisma.diveShop.findMany();
    }

    async setDiveShoptoFavorite(sub: string, diveShopId: string) {
        return await this.prisma.diveShopOnUsuariosFavoritos.create({
            data: {
                user_id: sub,
                diveshop_id: diveShopId
            }
        });
    }

    async unsetDiveShopAsFavorite(sub: string, diveShopId: string)
    {
        await this.prisma.diveShopOnUsuariosFavoritos.deleteMany({
            where: {  
                user_id: sub,
                diveshop_id: diveShopId
            }
        });   
    }

    async getDiveshopsForUser(userId: string): Promise<DiveShop[]> {
            const allRewards = await this.prisma.diveShop.findMany()
    
            const claimedRewards = await this.prisma.diveShopOnUsuariosFavoritos.findMany({
                where: {
                    user_id: userId,
                    favorito: true
                }
            })
    
            const rewardsWithCompletion = allRewards.map((reward) => (
                {
                    ...reward,
                    favorite: claimedRewards.some(
                        (claimedReward) => claimedReward.diveshop_id === reward.diveshop_id
                    )
                }
            ))
    
            return rewardsWithCompletion.sort((a, b) => {
                if (a.favorite === b.favorite) return 0;
                return a.favorite ? -1 : 1;
            })
        }
}
