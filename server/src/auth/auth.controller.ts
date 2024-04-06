import {Body, Controller, Get, HttpCode, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return await this.authService.register(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        return await this.authService.login(dto);
    }

    @Get('roles')
    async getRoles() {
        return await this.authService.getRoles();
    }
}
