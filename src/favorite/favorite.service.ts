import { injectable, inject } from 'inversify';
import { User, Favorites } from '@prisma/client';
import { IPrismaService } from 'src/prisma/prisma.service.interface';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { IFavoriteService } from './favorite.service.interface';
import TYPES from '../constants/types';

@injectable()
export class FavoriteService implements IFavoriteService {
  constructor(@inject(TYPES.PrismaService) private readonly prismaService: IPrismaService) {}
  async create({ userId }: CreateFavoriteDto): Promise<Favorites> {
    return await this.prismaService.prisma.favorites.create({
      data: {
        userId,
      },
    });
  }

  async findAll(userId: string): Promise<Favorites | null> {
    const favorites = await this.prismaService.prisma.favorites.findUnique({
      where: {
        userId,
      },
      include: {
        vitamins: true,
      },
    });
    return favorites;
  }

  async toggleFavorite(id: string, favoriteId: number): Promise<User> {
    const existFavorite = await this.prismaService.prisma.user.findUnique({
      where: {
        id,
        favorites: {
          vitamins: {
            some: {
              id: favoriteId,
            },
          },
        },
      },
    });

    const user = await this.prismaService.prisma.user.update({
      where: { id },
      data: {
        favorites: {
          update: {
            vitamins: {
              [existFavorite ? 'disconnect' : 'connect']: {
                id: favoriteId,
              },
            },
          },
        },
      },
      include: {
        favorites: {
          include: {
            vitamins: true,
          },
        },
      },
    });
    return user;
  }
}
