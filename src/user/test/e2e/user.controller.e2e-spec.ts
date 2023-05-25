import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import * as request from 'supertest';

describe('UserController Integration', () => {
  let app: INestApplication;
  let prisma: PrismaService;
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

    userId = user.id;
  });

  it('/GET users', () => {
    return request(app.getHttpServer()).get('/user').expect(200);
  });

  it('/GET/:id user', async () => {
    return request(app.getHttpServer()).get(`/user/${userId}`).expect(200);
  });

  it('should return 404 if no user found', async () => {
    return request(app.getHttpServer())
      .get(`/user/2a486b05-3ccf-1111-8b41-9bcda73173e1`)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe('User not found');
      });
  });

  it('/POST user', async () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      })
      .expect(201);
  });

  it('/PUT/:id user', async () => {
    return request(app.getHttpServer())
      .put(`/user/${userId}`)
      .send({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      })
      .expect(200);
  });

  it('/DELETE:id user', async () => {
    return request(app.getHttpServer()).delete(`/user/${userId}`).expect(200);
  });
});
