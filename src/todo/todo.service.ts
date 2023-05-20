import { Injectable } from '@nestjs/common';
import { Prisma, todo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async todo(
    userWhereInput: Prisma.todoWhereUniqueInput,
  ): Promise<todo | null> {
    return this.prisma.todo.findUnique({
      where: {
        id: userWhereInput.id?.toString(),
      },
    });
  }

  async todos(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.todoWhereUniqueInput;
    where?: Prisma.todoWhereInput;
    orderBy?: Prisma.todoOrderByWithRelationInput;
  }): Promise<todo[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.todo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTodo(data: Prisma.todoCreateInput): Promise<todo> {
    return this.prisma.todo.create({
      data,
    });
  }

  async updateTodo(params: {
    where: Prisma.todoWhereUniqueInput;
    data: Prisma.todoUpdateInput;
  }): Promise<todo> {
    const { where, data } = params;
    return this.prisma.todo.update({
      data,
      where,
    });
  }

  async deleteTodo(where: Prisma.todoWhereUniqueInput): Promise<todo> {
    return this.prisma.todo.delete({
      where,
    });
  }
}
