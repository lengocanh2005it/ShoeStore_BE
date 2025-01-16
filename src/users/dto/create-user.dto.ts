import { IsEmail, IsNotEmpty } from "class-validator"
import e from "express"
import { UserRole } from "../entities/user.entity"

export class CreateUserDto {
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email should not be empty' })
    email: string

    @IsNotEmpty()
    password: string
    
    name: string
    phone_number: string
    role: UserRole
}
