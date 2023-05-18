import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Prisma, todo } from '@prisma/client';

@Controller('todo')
export class TodoController {
  constructor(private readonly userService: TodoService) {}

  @Get()
  async getTodos() {
    return this.userService.todos({});
  }

  @Get(':id')
  async getTodo(@Param('id') id: string) {
    return this.userService.todo({
      id,
    });
  }

  @Post()
  async createTodo(
    @Body()
    todoData: {
      title: string;
      description: string;
      userId: string;
      priority: string;
    },
  ) {
    return this.userService.createTodo({
      title: todoData.title,
      description: todoData.description,
      done: false,
      user: {
        connect: { id: todoData.userId },
      },
      priority: todoData.priority,
    });
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() todoData: Prisma.todoUpdateInput,
  ) {
    return this.userService.updateTodo({
      where: { id },
      data: todoData,
    });
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string): Promise<todo> {
    return this.userService.deleteTodo({
      id,
    });
  }
}
