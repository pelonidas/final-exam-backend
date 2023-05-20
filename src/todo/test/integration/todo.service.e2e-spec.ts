import { AppModule } from 'src/app.module';
import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoService } from 'src/todo/todo.service';
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

describe('TodoService Integration', () => {
  let prisma: PrismaService;
  let todoService: TodoService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    todoService = moduleRef.get<TodoService>(TodoService);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('createTodo()', () => {
    let userId: string;

    it('should create user', async () => {
      const user = await prisma.user.create({
        data: {
          email: faker.internet.email(),
          password: '12345678',
          username: 'john',
        },
      });

      userId = user.id;
    });

    it('should create todo', async () => {
      const data: Prisma.todoCreateInput = {
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        done: false,
        priority: 'LOW',
        user: {
          connect: {
            id: userId,
          },
        },
      };

      const todo = await todoService.createTodo(data);

      expect(todo.title).toEqual(data.title);
    });

    it.todo('should create a todo');
    it.todo('should create a user');
  });
  // describe('updateTodo()', async () => {});
});
