import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { TokenExpiredError } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private jwtService: JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromCookies(request) 
        if(!token)
        {
            throw new UnauthorizedException('No authentication token provided')
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET
                }
            )
            request['user'] = payload
            return true
        } catch(error) {
            this.handleAuthError(error)
        }
    }

    private extractTokenFromCookies(request: Request): string | undefined {
        return request.cookies?.access_token
    }

    private handleAuthError(error: any): never {
        if (error instanceof TokenExpiredError) {
            throw new UnauthorizedException('Authentication session expired. Please log in again.')
        }
        throw new UnauthorizedException('Invalid authentication token')
    }

}