import { Controller, Get } from '@nestjs/common';
import { UserService } from './user/user.service';
import { Prisma, user } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getUsers(): Promise<user[]> {
    return this.userService.users({});
  }

  async createUser(data: Prisma.userCreateInput): Promise<user> {
    return this.userService.createUser(data);
  }
}
