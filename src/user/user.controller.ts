import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, user } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('id')
  async getUser(@Param('id') id: string): Promise<user> {
    return this.userService.user({ id });
  }

  @Get()
  async getUsers(): Promise<user[]> {
    return this.userService.users({});
  }

  @Post()
  async createUser(
    @Body() userData: { email: string; password: string; username: string },
  ): Promise<user> {
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
