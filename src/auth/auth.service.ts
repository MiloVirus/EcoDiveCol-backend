import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuarios } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor( private users: UsersService, private jwtService: JwtService){}

    async signIn(data: Usuarios): Promise<{token: string}>
    {
        const user = await this.users.getUserById(data.user_id)

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
