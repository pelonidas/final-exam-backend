import { PrismaClient, user } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const users: user[] = [];

  for (let i = 0; i < 1; i++) {
    const email = faker.internet.email();

    const u = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        password: 'gastanovec123',
        username: faker.internet.userName(),
        place: {
          create: {
            title: faker.word.noun(),
            type: faker.word.noun(),
            image: faker.image.url(),
            place_location: {
              create: {
                latitude: faker.location.latitude(),
                address: faker.location.streetAddress(),
                longtitude: faker.location.longitude(),
              },
            },
          },
        },
        todo: {
          create: {
            done: false,
            title: faker.word.noun(),
            description: faker.lorem.paragraph(),
            priority: faker.word.noun(),
          },
        },
      },
    });
    users.push(u);
  }

  console.log({ users });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
