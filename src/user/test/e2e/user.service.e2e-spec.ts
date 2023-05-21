import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { AppModule } from 'src/app.module';
import { UserService } from 'src/user/user.service';

describe('UserService Integration', () => {
  let userService: UserService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  describe('createUser()', () => {
    it('should create a new user', async () => {
      const data: Prisma.userCreateInput = {
        email: faker.internet.email(),
        password: '12345678',
        username: 'john',
      };

      const user = await userService.createUser(data);

      expect(user).toHaveProperty('id');
      expect(user.email).toBe(data.email);
      expect(user.username).toBe(data.username);
      expect(user.password).toBe(data.password);
    });
  });
});
