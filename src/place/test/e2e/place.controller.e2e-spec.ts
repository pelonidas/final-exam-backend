import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import * as request from 'supertest';

describe('place integration tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let placeId: string;
  let userId: string;
  let place_location_id: string;

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

    const place_location = await prisma.place_location.create({
      data: {
        address: faker.location.streetAddress(),
        latitude: faker.number.float(),
        longtitude: faker.number.float(),
      },
    });

    const place = await prisma.place.create({
      data: {
        image: faker.image.url(),
        title: faker.lorem.words(),
        type: faker.lorem.words(),
        user: {
          connect: {
            id: user.id,
          },
        },
        place_location: {
          connect: {
            id: place_location.id,
          },
        },
      },
    });

    placeId = place.id;
    userId = user.id;
    place_location_id = place_location.id;
  });

  it('/GET places', () => {
    return request(app.getHttpServer()).get('/place').expect(200);
  });

  it('/GET/:id place', async () => {
    return request(app.getHttpServer()).get(`/place/${placeId}`).expect(200);
  });

  it('/PUT:id place', async () => {
    return request(app.getHttpServer())
      .put(`/place/${placeId}`)
      .send({
        image: faker.image.url(),
        title: faker.lorem.words(),
        type: faker.lorem.words(),
      })
      .expect(200);
  });

  it('/DELETE/:id place', async () => {
    return request(app.getHttpServer()).delete(`/place/${placeId}`).expect(200);
  });

  it('/POST place', async () => {
    return request(app.getHttpServer())
      .post(`/place`)
      .send({
        image: faker.image.url(),
        title: faker.lorem.words(),
        type: faker.lorem.words(),
        userId,
        place_location_id,
      })
      .expect(201);
  });
});
