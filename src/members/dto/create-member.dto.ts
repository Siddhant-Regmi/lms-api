import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMemberDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsOptional()
    @IsNumber()
    user_id: number;

}
