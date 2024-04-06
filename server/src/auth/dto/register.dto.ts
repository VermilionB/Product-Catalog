import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6, {
        message: 'Password is too short'
    })
    password: string;

    @IsString()
    role_id: string;
}