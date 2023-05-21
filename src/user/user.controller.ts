import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, user } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<user | null> {
    const user = await this.userService.user({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Get()
  async getUsers(): Promise<user[]> {
    return this.userService.users({});
  }

  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<user> {
    const { email, password, username } = userData;
    return this.userService.createUser({
      email,
      password,
      username,
    });
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    userData: Prisma.userUpdateInput,
  ): Promise<user> {
    return this.userService.updateUser({
      where: { id },
      data: userData,
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<user> {
    return this.userService.deleteUser({ id });
  }
}
