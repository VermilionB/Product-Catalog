import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from 'src/prisma.service';
import {JwtService} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import {hash, verify} from 'argon2';
import {RegisterDto} from './dto/register.dto';
import {LoginDto} from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {
    }

    async register(dto: RegisterDto) {
        try {
            const oldUser = await this.prisma.users.findFirst({
                where: {
                    email: dto.email
                }
            });

            if (oldUser) {
                throw new BadRequestException('User already exists');
            }

            const user = await this.prisma.users.create({
                data: {
                    email: dto.email,
                    password: await hash(dto.password),
                    role_id: dto.role_id
                }
            });
            const token = await this.issueToken(user.id, user.role_id, user.email);
            return {
                ...token
            };

        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async login(dto: LoginDto) {
        const user = await this.validateUser(dto.email, dto.password);
        const token = await this.issueToken(user.id, user.role_id, user.email);

        return {
            ...token
        };
    }

    private async issueToken(userId: number, role_id: number, email: string) {
        const payload = {id: userId, role_id: role_id, email: email};
        return {
            access_token: this.jwtService.sign(payload, {
                expiresIn: this.configService.get('JWT_EXPIRATION_TIME')
            })
        }
    }

    private async validateUser(email: string, password: string) {
        const user = await this.prisma.users.findFirst({
            where: {
                email
            }
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isPasswordValid = await verify(user.password, password);
        if (!isPasswordValid) {
            throw new NotFoundException('Wrong password');
        }

        return user;
    }

    async getRoles() {
        return await this.prisma.roles.findMany();
    }
}
