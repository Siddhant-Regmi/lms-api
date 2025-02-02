import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { MembersModule } from './members/members.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [UsersModule, BooksModule, AuthModule, MembersModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
