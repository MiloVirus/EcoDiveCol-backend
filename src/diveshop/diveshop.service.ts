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
}
