import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsString()
    publisher: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    published_date: Date;

    @IsNotEmpty()
    @IsNumber()
    isbn: number;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsNumber()
    available_copies: number;

    @IsNotEmpty()
    @IsNumber()
    total_copies: number;
}
