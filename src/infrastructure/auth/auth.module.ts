import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '../../application/services';
import { UserRepository } from '../repository/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entity/user.entity';
import { UserAbilityFactory } from '../casl/casl-ability.factory/user-ability.factory';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: 'StrongKey',
          signOptions: { expiresIn: configService.get<string>('APP_EXPIRES') },
        };
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UserService,
    AuthService,
    JwtStrategy,
    UserAbilityFactory,
    {
      provide: 'UserInterface',
      useClass: UserRepository,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
