export interface AuthenticatedRequest extends Request {
    user: {
        sub: string
    }
}

export interface AuthProfileRequest extends Request {
    user: {
        sub: string,
        ciudad?: string,
        email: string,
        last_name: string,
        padi_naui_id: string,
        puntos:number,
        rol?: string,
        iat?: number, 
        exp?: number, 
    }
}
