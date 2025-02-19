import { Controller, Get, UseGuards, Req, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard';
import { LogrosService } from './logros.service';
import { AuthenticatedRequest } from 'src/common/interfaces/request.interface';

@Controller('logros')
export class LogrosController {
    constructor(private logros: LogrosService){}

    @UseGuards(AuthGuard)
    @Get('completedAchievements')
    async getLogrosCompletados(@Req() req: AuthenticatedRequest) {
        const userId = req.user.sub;
        if (!userId) {
            throw new UnauthorizedException('User ID not found in token');
        }
        return this.logros.getAchievementsforUser(userId);
    } 

}
