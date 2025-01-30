import { Controller} from '@nestjs/common';
import { DiveshopService } from './diveshop.service';
import { Get, Post, Body } from '@nestjs/common';
import { DiveShop } from '@prisma/client';

@Controller('diveshops')
export class DiveshopController {
    constructor(private diveShopService: DiveshopService) {}

    @Get()
    async getDiveShops() {
        try {
            return await this.diveShopService.getDiveShops();
        } catch (error) {
            return error
        }   
    }

    @Post('create')
    async createDiveShop(@Body() data: DiveShop) {
        try {
            const res = await this.diveShopService.createDiveShop(data);
            return res
        } catch (error) {
            return error
        }
    }
}
