import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';
import TYPES from 'src/constants/types';
import { ILogger } from 'src/logger/logger.service.interface';
import { IPrismaService } from './prisma.service.interface';

@injectable()
export class PrismaService implements IPrismaService {
  prisma: PrismaClient;
  constructor(@inject(TYPES.LoggerService) private readonly logger: ILogger) {
    this.prisma = new PrismaClient();
  }
  async connection(): Promise<{
    [Symbol.asyncDispose]: () => Promise<void>
  }> {
    await this.prisma.$connect();
    this.logger.log('db connected');
    return {
      [Symbol.asyncDispose]: async (): Promise<void> => {
        await this.prisma.$disconnect();
      },
    };
  }
};