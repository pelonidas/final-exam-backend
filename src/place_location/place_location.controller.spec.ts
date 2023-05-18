import { Test, TestingModule } from '@nestjs/testing';
import { PlaceLocationController } from './place_location.controller';

describe('PlaceLocationController', () => {
  let controller: PlaceLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceLocationController],
    }).compile();

    controller = module.get<PlaceLocationController>(PlaceLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
