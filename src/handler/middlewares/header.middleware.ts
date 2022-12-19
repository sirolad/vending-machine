import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction } from 'express';
import { JwtStrategy } from '../../infrastructure/auth/jwt.strategy';

export class HeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {}
}
