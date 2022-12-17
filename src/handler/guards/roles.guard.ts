import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload, JwtStrategy } from '../../auth/jwt.strategy';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtStrategy: JwtStrategy,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) return false;
    const jwt = token.replace('Bearer ', '');
    const decoded = (await this.jwtService.decode(jwt)) as JwtPayload;
    if (Object.keys(decoded).length === 0) return false;
    const user = await this.jwtStrategy.validate(decoded);

    return roles.includes(user.role);
  }
}
