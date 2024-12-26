import { Controller, Get } from '@nestjs/common';
import { LogrosService } from './logros.service';

@Controller('logros')
export class LogrosController {

    constructor(private logros: LogrosService){}

    @Get()
    async getLogros()
    {
        return this.logros.getAllAchievements()
    }
}
