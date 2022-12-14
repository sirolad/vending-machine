import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '../application/services/user.service';
import { UserRepository } from '../infrastructure/repository/user.repository';

@Module({
  providers: [
    UserService,
    AuthService,
    JwtService,
    {
      provide: 'UserInterface',
      useClass: UserRepository,
    },
  ],
})
export class AuthModule {}
