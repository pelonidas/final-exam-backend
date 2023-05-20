import { Injectable } from '@nestjs/common';
import { Prisma, place_location } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlaceLocationService {
  constructor(private prisma: PrismaService) {}

  async place_location(
    placeLocationWhereUniqueInput: Prisma.place_locationWhereUniqueInput,
  ): Promise<place_location | null> {
    return this.prisma.place_location.findUnique({
      where: {
        id: placeLocationWhereUniqueInput.id?.toString(),
      },
    });
  }

  async place_locations(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.place_locationWhereUniqueInput;
    where?: Prisma.place_locationWhereInput;
    orderBy?: Prisma.place_locationOrderByWithRelationInput;
  }): Promise<place_location[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.place_location.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPlaceLocation(
    data: Prisma.place_locationCreateInput,
  ): Promise<place_location> {
    return this.prisma.place_location.create({
      data,
    });
  }

  async updatePlaceLocation(params: {
    where: Prisma.place_locationWhereUniqueInput;
    data: Prisma.place_locationUpdateInput;
  }): Promise<place_location> {
    const { where, data } = params;
    return this.prisma.place_location.update({
      data,
      where,
    });
  }

  async deletePlaceLocation(
    where: Prisma.place_locationWhereUniqueInput,
  ): Promise<place_location> {
    return this.prisma.place_location.delete({
      where,
    });
  }
}
