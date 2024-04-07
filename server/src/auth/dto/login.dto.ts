import {IsEmail, IsString, MinLength} from 'class-validator';

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6, {
        message: 'Password is too short'
    })
    password: string;
}