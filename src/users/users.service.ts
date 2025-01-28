import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}
  async create(createUserDto: CreateUserDto) {
    await this.checkIfEmailExists(createUserDto.email);
    await this.checkIfMobileExists(createUserDto.phone);
    createUserDto.password = await hash(createUserDto.password, 10);
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.getUser(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.getUser(id);

    if (updateUserDto.email) {
      await this.checkIfEmailExists(updateUserDto.email, id);
    }

    if (updateUserDto.phone) {
      await this.checkIfMobileExists(updateUserDto.phone, id);
    }

    if (updateUserDto.password && user.password !== updateUserDto.password) {
      updateUserDto.password = await hash(updateUserDto.password, 10);
    }
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: number) {
    await this.getUser(id);
    return this.prisma.user.delete({ where: { id } });
  }

  private async getUser(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async checkIfEmailExists(email: string, id?: number) {
    const doesEmailExist = await this.prisma.user.findFirst({
      where: { email },
    });
    if (doesEmailExist) {
      if (id && doesEmailExist.id !== id) {
        throw new BadRequestException(`User with ${email} already exists`);
      } else if (!id) {
        throw new BadRequestException(`User with ${email} already exists`);
      }
    }
  }
  private async checkIfMobileExists(phone: string, id?: number) {
    const doesMobileExist = await this.prisma.user.findFirst({
      where: { phone },
    });
    if (doesMobileExist) {
      if (id && doesMobileExist.id !== id) {
        throw new BadRequestException(`User with ${phone} already exists`);
      } else if (!id) {
        throw new BadRequestException(`User with ${phone} already exists`);
      }
    }
  }
}
