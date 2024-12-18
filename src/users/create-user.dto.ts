import { Exclude } from "class-transformer"

export class CreateUserDto
{
    email: string
    first_name: string
    last_name: string
    
    @Exclude()
    password: string
}

