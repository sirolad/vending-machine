import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtStrategy } from '../../infrastructure/auth/jwt.strategy';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtStrategy: JwtStrategy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;
    if (!token) return false;

    const user = await this.jwtStrategy.getUserFromToken(token);
    request.headers['user'] = user;
    if (!user) return false;

    return roles.includes(user.role);
  }
}
