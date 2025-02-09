import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaClient) {}
  async create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: createTransactionDto,
    });
  }

  async findAll() {
    return this.prisma.transaction.findMany();
  }

  async findOne(id: number) {
    return this.getTransaction(id);
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.getTransaction(id);
    return this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
  }

  async remove(id: number) {
    await this.getTransaction(id);
    return this.prisma.transaction.delete({ where: { id } });
  }

  private async getTransaction(id: number) {
    const transaction = await this.prisma.transaction.findFirst({
      where: { id },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }
}
