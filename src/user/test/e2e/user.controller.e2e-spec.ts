import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('UserController Integration', () => {
  let app: INestApplication;
  const userId = '2a486b05-3ccf-4db4-8b41-9bcda73173e2';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET users', () => {
    return request(app.getHttpServer()).get('/user').expect(200);
  });

  // TODO: Create user before testing
  // it('/GET/:id user', async () => {
  //   return request(app.getHttpServer()).get(`/user/${userId}`).expect(200);
  // });

  it('should return 404 if no user found', async () => {
    return request(app.getHttpServer())
      .get(`/user/2a486b05-3ccf-1111-8b41-9bcda73173e1`)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe('User not found');
      });
  });
});
