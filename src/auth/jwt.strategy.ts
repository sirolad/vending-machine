import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserInterface } from '../domain/interfaces/create-user.interface';

export interface JwtPayload {
  username: string;
  sub: number;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<CreateUserInterface> {
    const user = await this.authService.validatePayload(payload);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async getUserFromToken(token: string): Promise<CreateUserInterface | null> {
    const jwt = token.replace('Bearer ', '');

    const decoded = (await this.jwtService.decode(jwt)) as JwtPayload;
    if (Object.keys(decoded).length === 0) return null;

    return this.validate(decoded);
  }
}
