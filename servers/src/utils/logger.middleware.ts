import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('request time:', new Date(Date.now()));
    console.log('req url: ', req.baseUrl);
    console.log('req method: ', req.method);
    console.log('req body: ', req.body);
    console.log('res statusCode: ', res.statusCode);
    next();
  }
}
