import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlaceLocationService } from './place_location.service';
import { Prisma, place_location } from '@prisma/client';

@Controller('place-location')
export class PlaceLocationController {
  constructor(private readonly placeLocationService: PlaceLocationService) {}

  @Get(':id')
  async getPlaceLocation(
    @Param('id') id: string,
  ): Promise<place_location | null> {
    return this.placeLocationService.place_location({ id });
  }

  @Get()
  async getPlaceLocations(): Promise<place_location[]> {
    return this.placeLocationService.place_locations({});
  }

  @Post()
  async createPlaceLocation(
    @Body()
    placeLocationData: {
      address: string;
      latitude: number;
      longtitude: number;
      placeId: string;
    },
  ): Promise<place_location> {
    const { address, latitude, longtitude } = placeLocationData;
    return this.placeLocationService.createPlaceLocation({
      address,
      latitude,
      longtitude,
    });
  }

  @Put(':id')
  async updatePlaceLocation(
    @Param('id') id: string,
    @Body() placeLocationData: Prisma.place_locationUpdateInput,
  ): Promise<place_location> {
    return this.placeLocationService.updatePlaceLocation({
      where: { id },
      data: placeLocationData,
    });
  }

  @Delete(':id')
  async deletePlaceLocation(@Param('id') id: string): Promise<place_location> {
    return this.placeLocationService.deletePlaceLocation({ id });
  }
}
