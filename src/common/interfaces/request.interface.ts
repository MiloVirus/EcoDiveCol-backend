import { Request } from "@nestjs/common";

export interface AuthenticatedRequest extends Request {
    user: {
        sub: string
    }
}
