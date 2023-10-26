import * as dotenv from 'dotenv';
import { injectable } from 'inversify';
import { IConfigService } from './config.service.interface';

@injectable()
export class ConfigService implements IConfigService {
  private readonly envConfig: { [key: string]: unknown };

  constructor() {
      dotenv.config();
  }

  get<T>(key: string): T {
    return process.env[key] as T;
  }
}
