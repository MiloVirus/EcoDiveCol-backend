import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Usuarios } from '@prisma/client';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService){}
    
        async getAllUsers(): Promise<Usuarios[]>
        {
            return await this.prisma.usuarios.findMany()
        }

        async getUserById(user_id: string): Promise<Usuarios> {
            return await this.prisma.usuarios.findUnique({
            where: {
                user_id,
            },
        });
        }

        async createUser(data: Usuarios): Promise<Usuarios>
        {
            return await this.prisma.usuarios.create({
                data
            })
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
