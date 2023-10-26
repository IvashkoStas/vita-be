import { inject, injectable } from 'inversify';
import { Get, JsonController } from 'routing-controllers';
import TYPES from 'src/constants/types';
import { IPrismaService } from 'src/prisma/prisma.service.interface';
import { seed } from 'src/prisma/seed/seed';
import { createVitamins } from 'src/prisma/seed/vitamins.seed';

@injectable()
@JsonController()
export class TempController {
  constructor(
    @inject(TYPES.PrismaService) private prismaService: IPrismaService
  ){}
  @Get()
  index(): string {
    return 'test';
  }
  @Get('/seed-vitamins')
  async seed(): Promise<string> {
    await createVitamins();
    await seed();
    return '👌  база заполнена!';
  }
  @Get('/drop/aspire')
  async drop(): Promise<string> {
    await this.prismaService.prisma.user.deleteMany({});
    await this.prismaService.prisma.favorites.deleteMany({});
    await this.prismaService.prisma.vitamin.deleteMany({});
    return '👌  база дропнута!';
  }
}