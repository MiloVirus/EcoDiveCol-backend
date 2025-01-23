import { Controller, Get, UseGuards, Post, Body, Req, Res, UnauthorizedException, Request } from '@nestjs/common'
import { Response, } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { LogrosService } from './logros.service';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedRequest } from 'src/common/interfaces/request.interface';

@Controller('logros')
export class LogrosController {
    constructor(private logros: LogrosService, private userService: UsersService){}

    @UseGuards(AuthGuard)
    @Get('completedAchievements')
    async getLogrosCompletados(@Req() req: AuthenticatedRequest) {
        const userId = req.user.sub;
        if (!userId) {
            throw new UnauthorizedException('User ID not found in token');
        }
        return this.logros.getAchievementsforUser(userId);
    } 
    
    
    @UseGuards(AuthGuard)
    @Get()
    async getLogros(@Req() req: AuthenticatedRequest) {
        const userId = req.user?.sub;
        if (!userId) {
            throw new UnauthorizedException('User ID not found');
        }
        return this.logros.getAllAchievements();
    }

    @UseGuards(AuthGuard)
    @Post('assign-logro')
    async assignLogro(@Body() body, @Req() req: AuthenticatedRequest, @Res() res: Response) {
        const { logro_id } = body;
        const  user_id = req.user.sub;

        try {
            console.log(user_id, logro_id);
            const result =  await this.userService.addUserLogro(user_id, logro_id);
            return res.status(201).json({ message: 'Logro asignado correctamente', result });
        } catch (error) {
            return res.status(500).json({ message: 'Error al asignar logro', error });
        }  
    }
}
