import {IsEmail, IsNumber, IsString, MinLength} from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6, {
        message: 'Password is too short'
    })
    password: string;

    @IsNumber()
    role_id: number;
}