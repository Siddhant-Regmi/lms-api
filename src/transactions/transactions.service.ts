import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaClient } from '@prisma/client';
import { MembersService } from 'src/members/members.service';
import { BooksService } from 'src/books/books.service';


@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaClient,
    private readonly memberService: MembersService,
    private readonly bookService: BooksService,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    await this.getMemberById(createTransactionDto.member_id);
    await this.getBookById(createTransactionDto.book_id);
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
    if (updateTransactionDto.member_id) {
      await this.getMemberById(updateTransactionDto.member_id);
    }
    if (updateTransactionDto.book_id) {
      await this.getBookById(updateTransactionDto.book_id);
    }
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

  private async getBookById(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  private async getMemberById(id: number) {
    const member = await this.prisma.member.findUnique({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }
}
