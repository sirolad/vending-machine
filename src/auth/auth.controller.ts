import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../handler/dto/login.dto';
import { JwtStrategy } from './jwt.strategy';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly strategy: JwtStrategy,
  ) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.strategy.validate(
      loginDto.username,
      loginDto.password,
    );

    return this.authService.login(user);
  }
}
