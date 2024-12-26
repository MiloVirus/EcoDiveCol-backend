import { Controller, Post, Body, Param, NotFoundException, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Usuarios } from '@prisma/client';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @Post()
    async createUser(@Body() data: Usuarios)
    {
        return this.userService.createUser(data)
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string)
    {
        try
        {
            return await this.userService.deleteUser(id)
        } catch (error)
        {
            throw new NotFoundException("User does not exist")
        }
    }
}
