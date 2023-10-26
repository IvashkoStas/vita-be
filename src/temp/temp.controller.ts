import { inject, injectable } from 'inversify';
import { Get, JsonController } from 'routing-controllers';
import TYPES from 'src/constants/types';
import { IPrismaService } from 'src/prisma/prisma.service.interface';
import { seed } from 'src/prisma/seed/seed';
import { createVitamins } from 'src/prisma/seed/vitamins.seed';

@injectable()
@JsonController('/')
export class TempController {
  constructor(
    @inject(TYPES.PrismaService) private prismaService: IPrismaService
  ){}
  @Get()
  index(): string {
    return 'test';
  }
  @Get('/seed-vitamins')
  @Get('/drop/aspire')
  async seed(): Promise<void> {
    await createVitamins();
    await seed();
  }
  drop(): void {
    this.prismaService.prisma.user.deleteMany({});
    this.prismaService.prisma.favorites.deleteMany({});
    this.prismaService.prisma.vitamin.deleteMany({});
  }
}