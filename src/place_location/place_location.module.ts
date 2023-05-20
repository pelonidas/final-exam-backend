import { Module } from '@nestjs/common';
import { PlaceLocationController } from './place_location.controller';
import { PlaceLocationService } from './place_location.service';

@Module({
  controllers: [PlaceLocationController],
  providers: [PlaceLocationService],
})
export class PlaceLocationModule {}
