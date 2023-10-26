import { User, Favorites } from '@prisma/client';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

export interface IFavoriteService {
  create: (favorites: CreateFavoriteDto) => Promise<Favorites>;
  findAll: (userId: string) => Promise<Favorites | null>;
  toggleFavorite: (id: string, favoriteId: number) => Promise<User>;

}