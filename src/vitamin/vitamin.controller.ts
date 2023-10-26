import { inject, injectable } from 'inversify';
import { Get, Param, JsonController } from 'routing-controllers';
import { Vitamin } from '@prisma/client';
import TYPES from 'src/constants/types';
import { ILogger } from 'src/logger/logger.service.interface';
import { IVitaminService } from './vitamin.service.interface';

@injectable()
@JsonController('/vitamin')
export class VitaminController {
  constructor(
    @inject(TYPES.LoggerService) private readonly logger: ILogger,
    @inject(TYPES.VitaminService) private readonly vitaminsService: IVitaminService
  ) {}

  @Get()
  async findAll(): Promise<Vitamin[] | null> {
    this.logger.log('get all vitamins');
    return this.vitaminsService.findAll().catch((error) => {
      this.logger.error('❌ get all vitamins error', error);
      return null;
    });
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Vitamin | null> {
    this.logger.log(`get vitamin by id: ${id}`);
    return this.vitaminsService.getById(parseInt(id)).catch((error) => {
      this.logger.error(`❌ vitamin by id: ${id}, error`, error);
      return null;
    });
  }
}
