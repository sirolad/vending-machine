import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtStrategy } from '../../auth/jwt.strategy';

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
    console.log(request.headers);
    if (!token) return false;
    const jwt = token.replace('Bearer ', '');
    const user = await this.jwtStrategy.validate(jwt);


    return roles.includes(user.role);
  }
}
