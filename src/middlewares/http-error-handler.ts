import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';

@Middleware({ type: 'after' })
@injectable()
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: Error, _request: Request, response: Response, next: NextFunction): void {
        if (error instanceof HttpError) {
            response.status(error.httpCode).json(error);
        }
        next(error);
    }
}