import * as dotenv from 'dotenv';
import { injectable } from 'inversify';
import fs from 'node:fs';
import path from 'node:path';
import { IConfigService } from './config.service.interface';

@injectable()
export class ConfigService implements IConfigService {
  private readonly envConfig: { [key: string]: unknown };

  constructor() {
      const envFilePath = path.join(process.cwd(), '.env');
      const existsPath = fs.existsSync(envFilePath);
      if (!existsPath) {
        console.log('.env file does not exist', envFilePath);
        process.exit(0);
      }
      this.envConfig = dotenv.parse(fs.readFileSync(envFilePath));
  }

  get<T>(key: string): T {
    return this.envConfig[key] as T;
  }
}
