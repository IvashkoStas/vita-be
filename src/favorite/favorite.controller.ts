import { Body, Get, JsonController, Param, Post } from 'routing-controllers';
import { inject, injectable } from 'inversify';
import { User, Favorites } from  '@prisma/client';
import TYPES from 'src/constants/types';
import { ILogger } from 'src/logger/logger.service.interface';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { IFavoriteService } from './favorite.service.interface';

@injectable()
@JsonController('/favorite')
export class FavoriteController {
  constructor(
    @inject(TYPES.LoggerService) private readonly logger: ILogger,
    @inject(TYPES.FavoriteService) private readonly favoriteService: IFavoriteService
    ) {}
  @Post()
  async create(@Body() createUserFavoriteDto: CreateFavoriteDto): Promise<Favorites | null> {
    return this.favoriteService
      .create(createUserFavoriteDto)
      .catch((error) => {
        this.logger.error('❌ create favorite error', error);
        return null;
      });
  }

  @Get('/:userId')
  async findAll(@Param('userId') userId: string): Promise<Favorites | null> {
    return this.favoriteService.findAll(userId).catch((error) => {
      this.logger.error('❌ find all favorite error', error);
      return null;
    });
  }

  @Get('/:id/:favoriteId')
  async toggleFavorite(
    @Param('id') id: string,
    @Param('favoriteId') favoriteId: string,
  ): Promise<User | null> {
    return this.favoriteService
      .toggleFavorite(id, +favoriteId)
      .catch((error) => {
        this.logger.error('❌ toggle favorite error', error);
        return null;
      });
  }
}
