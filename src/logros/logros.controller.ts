import { Controller, Get, UseGuards, Post, Body, Req, Res } from '@nestjs/common'
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { LogrosService } from './logros.service';
import { UsersService } from 'src/users/users.service';

@Controller('logros')
export class LogrosController {
    constructor(private logros: LogrosService, private userService: UsersService){}

    @Get()
    async getLogros()
    {
        return this.logros.getAllAchievements()
    }

    @UseGuards(AuthGuard)
    
    @Post('assign-logro')
    async assignLogro(@Body() body, @Req() req, @Res() res: Response) {
        const { logro_id } = body;
        const  user_id = req.user.sub;

        try {
            const result =  await this.userService.addUserLogro(user_id, logro_id);
            return res.status(201).json({ message: 'Logro asignado correctamente', result });
        } catch (error) {
            return res.status(500).json({ message: 'Error al asignar logro', error });
        }  
    }
}
