import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaClient } from '@prisma/client';
import { MembersService } from 'src/members/members.service';
import { BooksService } from 'src/books/books.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaClient, MembersService, BooksService],
})
export class TransactionsModule {}
