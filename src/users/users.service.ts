import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Usuarios } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './create-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService){}
    
        async getAllUsers(): Promise<Usuarios[]>
        {
            return await this.prisma.usuarios.findMany()
        }

        async getUserById(email: string): Promise<Usuarios> {
            return await this.prisma.usuarios.findUnique({
            where: {
                email,
            },
        });
        }

        async createUser(data: CreateUserDto): Promise<CreateUserDto>
        {
            const hashedPassword = await bcrypt.hash(data.password, 10)
            const user = await this.prisma.usuarios.create({
                data:
                {
                    ...data,
                    password: hashedPassword,
                },
            })
            return plainToInstance(CreateUserDto, user);
        }

        async deleteUser(user_id: string): Promise<Usuarios>
        {
            return await this.prisma.usuarios.delete({
                where:{
                    user_id,
                },
            })
        }

        async updateUser(): Promise<Usuarios[]>
        {
            return await this.prisma.usuarios.findMany()
        }
    
}
