import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import * as request from 'supertest';

describe('place_location integration', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let place_locationId: string;
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

    const place_location = await prisma.place_location.create({
      data: {
        address: faker.location.streetAddress(),
        latitude: faker.number.float(),
        longtitude: faker.number.float(),
      },
    });

    userId = user.id;
    place_locationId = place_location.id;
  });

  it('/GET place_locations', () => {
    return request(app.getHttpServer()).get('/place-location').expect(200);
  });

  it('/GET/:id place_location', async () => {
    return request(app.getHttpServer())
      .get(`/place-location/${place_locationId}`)
      .expect(200);
  });

  it('/PUT:id place_location', async () => {
    return request(app.getHttpServer())
      .put(`/place-location/${place_locationId}`)
      .send({
        address: faker.location.streetAddress(),
        latitude: faker.number.float(),
        longtitude: faker.number.float(),
      })
      .expect(200);
  });

  it('/DELETE/:id place_location', async () => {
    return request(app.getHttpServer())
      .delete(`/place-location/${place_locationId}`)
      .expect(200);
  });

  it('/POST place_location', async () => {
    return request(app.getHttpServer())
      .post('/place-location')
      .send({
        address: faker.location.streetAddress(),
        latitude: faker.number.float(),
        longtitude: faker.number.float(),
      })
      .expect(201);
  });
});
