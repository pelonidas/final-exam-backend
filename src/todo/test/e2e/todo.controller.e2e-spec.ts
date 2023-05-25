import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import * as request from 'supertest';

describe('todo controller integration', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let todoId: string;
  let userId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get<PrismaService>(PrismaService);
    await app.init();

    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      },
    });

    const todo = await prisma.todo.create({
      data: {
        done: false,
        title: 'Test todo',
        description: 'Test todo description',
        priority: 'LOW',
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    userId = user.id;
    todoId = todo.id;
  });

  it('/GET todos', () => {
    return request(app.getHttpServer()).get('/todo').expect(200);
  });

  it('/GET/:id todo', async () => {
    return request(app.getHttpServer()).get(`/todo/${todoId}`).expect(200);
  });

  it('/PUT:id todo', async () => {
    return request(app.getHttpServer())
      .put(`/todo/${todoId}`)
      .send({
        done: true,
      })
      .expect(200);
  });

  it('/POST todo', async () => {
    return request(app.getHttpServer())
      .post('/todo')
      .send({
        done: false,
        title: 'Test todo2',
        description: 'Test todo description2',
        priority: 'LOW',
        userId,
      })
      .expect(201);
  });

  it('/DELETE/:id', async () => {
    return request(app.getHttpServer()).delete(`/todo/${todoId}`).expect(200);
  });
});
