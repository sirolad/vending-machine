import { Injectable } from '@nestjs/common';
import { UserService } from '../application/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { isValidPassword } from '../infrastructure/helper/hash.helper';
import { CreateUserInterface } from '../domain/interfaces/user/create-user.interface';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<CreateUserInterface | null> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await isValidPassword(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: CreateUserInterface) {
    const payload: JwtPayload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validatePayload(payload: any) {
    const user = await this.usersService.findByUsername(payload['username']);
    if (user) {
      return user;
    }
    return null;
  }
}
