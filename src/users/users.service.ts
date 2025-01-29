import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Usuarios } from '@prisma/client';
import { UsuariosOnLogros } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './create-user.dto';

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
                email: email,
            },
        });
        }

        async createUser(usuario: CreateUserDto): Promise<Usuarios>
        {
            const hashedPassword = await bcrypt.hash(usuario.password, 10)
            const user = await this.prisma.usuarios.create({
                data:
                {
                    ...usuario,
                    password: hashedPassword,
                },
            })
            return user;
        }

        async deleteUser(user_id: string): Promise<Usuarios>
        {
            return await this.prisma.usuarios.delete({
                where:{
                    user_id,
                },
            })
        }

        async modifyUserScore(user_id: string, curr_puntos: number): Promise<void> {
        
            const user = await this.prisma.usuarios.findUnique({
                where: { user_id },
                select: { curr_puntos: true },
            });
        
            if (!user) {
                throw new Error(`User with ID ${user_id} not found`);
            }
        
            const currentPoints = user.curr_puntos ?? 0; 
        
            await this.prisma.usuarios.update({
                where: { user_id },
                data: {
                    curr_puntos: {
                        set: currentPoints + curr_puntos, 
                    },
                },
            });
        }

        async updateUser(): Promise<Usuarios[]>
        {
            return await this.prisma.usuarios.findMany()
        }

        async addUserLogro(sub: string, logro_id: string): Promise<UsuariosOnLogros>
        {
            return this.prisma.usuariosOnLogros.create({
            data:{
                user_id: sub,
                logro_id: logro_id
        }
        })

        

    }
    
}
