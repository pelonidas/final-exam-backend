import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { Prisma, place } from '@prisma/client';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get(':id')
  async getPlace(@Param('id') id: string): Promise<place | null> {
    return this.placeService.place({ id });
  }

  @Get()
  async getPlaces(): Promise<place[]> {
    return this.placeService.places({});
  }

  @Post()
  async createPlace(
    @Body()
    placeData: {
      image: string;
      title: string;
      userId: string;
      type: string;
      place_location_id: string;
    },
  ): Promise<place> {
    const { image, title, userId, type, place_location_id } = placeData;
    return this.placeService.createPlace({
      image,
      title,
      user: {
        connect: {
          id: userId,
        },
      },
      type,
      place_location: {
        connect: {
          id: place_location_id,
        },
      },
    });
  }

  @Put(':id')
  async updatePlace(
    @Param('id') id: string,
    @Body() todoData: Prisma.placeUpdateInput,
  ): Promise<place> {
    return this.placeService.updatePlace({
      where: { id },
      data: todoData,
    });
  }

  @Delete(':id')
  async deletePlace(@Param('id') id: string): Promise<place> {
    return this.placeService.deletePlace({ id });
  }
}
