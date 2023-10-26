import { inject, injectable } from 'inversify';
import { Vitamin } from '@prisma/client';
import TYPES from 'src/constants/types';
import { IPrismaService } from 'src/prisma/prisma.service.interface';

import { IVitaminService } from './vitamin.service.interface';


@injectable()
export class VitaminService implements IVitaminService {
  constructor(
    @inject(TYPES.PrismaService) private readonly prismaService: IPrismaService
    ) {}

  async findAll(): Promise<Vitamin[]> {
    return await this.prismaService.prisma.vitamin.findMany({});
  }

  async getById(id: number): Promise<Vitamin | null> {
    return await this.prismaService.prisma.vitamin.findUnique({
      where: { id },
      include: {
        combinations: true,
        conditions: true,
        norm: true,
      },
    });
  }
}
