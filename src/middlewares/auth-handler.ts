import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import {
  Middleware,
  ExpressMiddlewareInterface,
  ForbiddenError,
} from 'routing-controllers';
import { IConfigService } from 'src/config/config.service.interface';
import TYPES from 'src/constants/types';

@Middleware({ type: 'before' })
@injectable()
export class AuthHandler implements ExpressMiddlewareInterface {
  constructor(
    @inject(TYPES.ConfigService) private config: IConfigService
  ) {}
  use(req: Request, res: Response, next: NextFunction): any {
    const { headers } = req;
    const requiredHeader = 'token';
    const token = this.config.get<string>('TOKEN');
    if (!headers[requiredHeader] && headers[requiredHeader] !== token) {
      res
        .status(403)
        .send('403 Forbidden');
    }
    next();
  }
}
