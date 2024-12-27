import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './sign-in.dto';

@Injectable()
export class AuthService {
    constructor( private users: UsersService, private jwtService: JwtService){}

    async signIn(signInDto: SignInDto): Promise<{email:string, msg:string, token: string}>
    {
        const {email, password} = signInDto

        const user = await this.users.getUserById(email)

        if(!user)
        {
            throw new UnauthorizedException('Credenciales Incorrectas')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid)
        {
            throw new UnauthorizedException('Credenciales Incorrectas')
        }

        const payload = {
            sub: user.user_id, 
            first_name: user.first_name, 
            last_name: user.last_name, 
            email: user.email, 
            rol: user.rol, 
            ciudad: user.city, 
            padi_naui_id: user.PADI_NAUI_ID
        }

        const token = await this.jwtService.signAsync(payload,{
            expiresIn: '1h'
        })

        return {
            msg: 'login successful',
            email,
            token, 
        }
    }
}
