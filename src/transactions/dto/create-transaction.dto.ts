import { TransactionType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsNumber()
    deadline: number;

    @IsNotEmpty()
    @IsNumber()
    member_id:number;

    @IsNotEmpty()
    @IsNumber()
    book_id:number;

    @IsNotEmpty()
    @IsEnum(TransactionType)
    transaction_type: TransactionType
}
