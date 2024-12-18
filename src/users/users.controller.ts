import { Controller, Get, Post, Body, Param, NotFoundException, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Usuarios } from '@prisma/client';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @Get()
    async getAllUsers()
    {
        return this.userService.getAllUsers()
    }

    @Post()
    async createNote(@Body() data: Usuarios)
    {
        return this.userService.createUser(data)
    }

    @Get(':id')
    async getUserById(@Param('id')  id: string)
    {
        const userFound = await this.userService.getUserById(id)
        if(!userFound) throw new NotFoundException('User does not exist')
            return userFound
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
