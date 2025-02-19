import { Controller, HttpCode, HttpStatus, Post, Body, UseGuards, Get, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './sign-in.dto';
import { AuthGuard } from './auth.guard';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken'
import { AuthProfileRequest } from '../common/interfaces/request.interface';
import { UsersService } from '../users/users.service';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UsersService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
        const { email, msg, token, user } = await this.authService.signIn(signInDto); 
        console.log('Token generado:', token); 

        res.cookie('access_token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            path: '/', 
        });

        res.cookie('user_data', JSON.stringify({
            user_id: user.user_id,
            first_name: user.first_name,
            curr_puntos: user.curr_puntos
        }), {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        });

        return res.json({
            msg,
            email
        });
    }

    @Get('check')
    checkAuth(@Req() req: Request, @Res() res: Response) {
        const token = req.cookies['access_token'];

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            const userInfo = {
                id: decoded.sub,
                
            }
            return res.json({ isAuthenticated: true, user: userInfo });
        } else {
            return res.status(HttpStatus.UNAUTHORIZED).json({ isAuthenticated: false, message: 'Token inválido o expirado' });
        }
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Req() req: AuthProfileRequest) {
        const userProfile = await this.userService.getUserById(req.user.email);

        const { password, ...user } = userProfile;
        return user;
        
    }

    @Post('logout')
    signOut(@Res() res: Response) {
        // Clear auth token
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });
        
        // Clear user data
        res.clearCookie('user_data', {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });
        
        return res.status(200).json({ message: 'Logout Successful', isAuthenticated: false });
    }
}
