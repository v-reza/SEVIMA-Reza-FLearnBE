import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('Sevima')
@Controller('sevima/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(@Body() requestBody: any) {
    this.userService.rootService()
    return this.userService.login(requestBody)
  }

  @Get()
  findAll(@Query() allParams: any) {
    this.userService.rootService()
    return this.userService.findAll(allParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.userService.rootService()
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
