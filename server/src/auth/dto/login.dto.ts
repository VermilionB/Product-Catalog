import { IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsString()
    @MinLength(3, {
        message: 'Email is too short'
    })
    email: string;

    @IsString()
    @MinLength(6, {
        message: 'Password is too short'
    })
    password: string;
}