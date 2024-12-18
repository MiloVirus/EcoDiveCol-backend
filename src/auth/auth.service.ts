import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuarios } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService){}

    async signIn(data: Usuarios): Promise<{token: string}>
    {
        const user = await this.prisma.usuarios.findUnique({
            where: {
                email: data.email,
            },
        });

        if(!user)
        {
            throw new UnauthorizedException('Credenciales Incorrectas')
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password)

        if(!isPasswordValid)
        {
            throw new UnauthorizedException('Credenciales Incorrectas')
        }

        const payload = {sub: user.user_id, email: user.email, rol: user.rol}

        const token = await this.jwtService.signAsync(payload,{
            expiresIn: '1h'
        })

        return {token}
    }
}
