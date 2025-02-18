import { Controller, UseGuards} from '@nestjs/common';
import { DiveshopService } from './diveshop.service';
import { Get, Post, Body } from '@nestjs/common';
import { DiveShop } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { Req } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/common/interfaces/request.interface';

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

    @UseGuards(AuthGuard)
    @Get('user')
    async getDiveShopsForUser(@Req() req: AuthenticatedRequest) {

        const sub = req.user.sub;

        try {
            return await this.diveShopService.getDiveshopsForUser(sub);
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
    
    @UseGuards(AuthGuard)
    @Post('setFavorite')
    async setDiveShoptoFavorite(@Req() req: AuthenticatedRequest, @Body() data: {diveShopId: string}) {
        try {
            const sub = req.user.sub;
            const dive_id = data.diveShopId
            
            console.log(dive_id)
            const res = await this.diveShopService.setDiveShoptoFavorite(sub, dive_id);
            return res
        } catch (error) {
            return error
        }
    }
}
