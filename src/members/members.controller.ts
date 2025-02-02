import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Request } from 'express';

interface JwtPayload extends Request {
  payload: {
    user_id: number;
  };
}

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  create(@Req() request: JwtPayload,@Body() createMemberDto: CreateMemberDto) {
    createMemberDto.user_id = request.payload.user_id;
    return this.membersService.create(createMemberDto);
  }

  @Get()
  findAll(@Req() request: JwtPayload) {
    return this.membersService.findAll(request.payload.user_id);
  }

  @Get(':id')
  findOne(@Req() request: JwtPayload,@Param('id') id: string) {
    return this.membersService.findOne(+id,request.payload.user_id);
  }

  @Patch(':id')
  update(@Req() request: JwtPayload,@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id,request.payload.user_id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Req() request: JwtPayload,@Param('id') id: string) {
    return this.membersService.remove(+id,request.payload.user_id);
  }
}
