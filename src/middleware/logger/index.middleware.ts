import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'src/configs/logs';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    // 请求之前...
    next();
    // 请求之后...

    // Logger.handleLogStatus(req, res);
  }
}
