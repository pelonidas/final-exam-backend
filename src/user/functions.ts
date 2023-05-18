import prisma from '../client';

interface CreateUser {
  username: string;
  password: string;
  email: string;
}

export async function createUser(user: CreateUser) {
  return await prisma.user.create({
    data: user,
  });
}
