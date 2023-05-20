import { Injectable } from '@nestjs/common';
import { Prisma, place } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlaceService {
  constructor(private prisma: PrismaService) {}

  async place(
    placeWhereUniqueInput: Prisma.placeWhereUniqueInput,
  ): Promise<place | null> {
    return this.prisma.place.findUnique({
      where: placeWhereUniqueInput,
    });
  }

  async places(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.placeWhereUniqueInput;
    where?: Prisma.placeWhereInput;
    orderBy?: Prisma.placeOrderByWithRelationInput;
  }): Promise<place[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.place.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPlace(data: Prisma.placeCreateInput): Promise<place> {
    return this.prisma.place.create({
      data,
    });
  }

  async updatePlace(params: {
    where: Prisma.placeWhereUniqueInput;
    data: Prisma.placeUpdateInput;
  }): Promise<place> {
    const { where, data } = params;
    return this.prisma.place.update({
      data,
      where,
    });
  }

  async deletePlace(where: Prisma.placeWhereUniqueInput): Promise<place> {
    return this.prisma.place.delete({
      where,
    });
  }
}
