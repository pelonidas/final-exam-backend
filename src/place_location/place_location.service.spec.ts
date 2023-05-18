import { Test, TestingModule } from '@nestjs/testing';
import { PlaceLocationService } from './place_location.service';

describe('PlaceLocationService', () => {
  let service: PlaceLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaceLocationService],
    }).compile();

    service = module.get<PlaceLocationService>(PlaceLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
