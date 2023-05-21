import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlaceService } from 'src/place/place.service';

describe('PlaceService e2e tests', () => {
  let prisma: PrismaService;
  let placeService: PlaceService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get<PrismaService>(PrismaService);
    placeService = moduleRef.get<PlaceService>(PlaceService);
  });

  // describe('createPlace()', () => {});
});
