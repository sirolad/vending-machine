import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '../application/services/user.service';
import { UserRepository } from '../infrastructure/repository/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../infrastructure/database/entity/user.entity';
import { CaslAbilityFactory } from '../infrastructure/casl/casl-ability.factory/casl-ability.factory';
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
    CaslAbilityFactory,
    {
      provide: 'UserInterface',
      useClass: UserRepository,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
