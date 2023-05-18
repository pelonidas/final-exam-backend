import { prismaMock } from '../singleton';
import { createUser } from './functions';

test('should create new user', async () => {
  const user = {
    id: '1',
    username: 'test',
    password: 'test',
    email: 'test@test.com',
  };

  prismaMock.user.create.mockResolvedValue(user);

  await expect(createUser(user)).resolves.toEqual({
    id: '1',
    username: 'test',
    password: 'test',
    email: 'test@test.com',
  });
});
