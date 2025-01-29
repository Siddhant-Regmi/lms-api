import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './auth.controller';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {constructor(private readonly prisma: PrismaClient, 
    private readonly usersService: UsersService,     
){}

async register(registerDto: RegisterDto){
    const user = await this.usersService.create(registerDto);
    return user; 
}

async login(loginDto: LoginDto){
    const user = await this.prisma.user.findFirst({
        where: {
            OR: [
                {
                    email: loginDto.username,
                },
                {
                    phone: loginDto.username,
                },
            ],
        },
    });
    if (!user) {
        throw new NotFoundException(`User ${loginDto.username} not found`);
    }

    if (!(await compare(loginDto.password,  user.password))){
        throw new UnauthorizedException('Invalid Credentials');
    }

}}
