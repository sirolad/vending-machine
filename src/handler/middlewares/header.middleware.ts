import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class HeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {}
}
