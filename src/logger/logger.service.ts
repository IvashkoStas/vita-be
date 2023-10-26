import { injectable } from 'inversify';
import { createLogger, format, transports, Logger } from 'winston';
import { ILogger } from './logger.service.interface';

@injectable()
export class LoggerService implements ILogger {
  private readonly logger: Logger;

  constructor() {
    const {combine, colorize, simple, timestamp, align, errors, splat, json, printf } = format;
    this.logger = createLogger({
      level: 'info',
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        errors({ stack: true }),
        splat(),
        json(),
      ),
      transports: [
        new transports.Console({
          format: combine(
            colorize({ all: true }),
            simple(),
            align(), 
            printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
          ),
        }),
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
      ],
    });
  }

  log(message: string): void {
    this.logger.log('info', message);
  }

  error(message: string, trace: string): void {
    this.logger.error(message, trace);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}
