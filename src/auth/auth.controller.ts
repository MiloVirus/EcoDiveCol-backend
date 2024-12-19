import { Controller, HttpCode, HttpStatus, Post, Body, UseGuards, Get, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './sign-in.dto';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
        const { email, msg, token } = await this.authService.signIn(signInDto); // Esperar el resultado del servicio

        res.cookie('access_token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 3600000, 
        });

        return res.json({
            msg,
            email,
            token
        });
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
