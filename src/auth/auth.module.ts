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
import { ConfigModule } from '@nestjs/config';
import { CaslAbilityFactory } from '../infrastructure/casl/casl-ability.factory/casl-ability.factory';
import { ProductRepository } from '../infrastructure/repository/product.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.APP_EXPIRES },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UserService,
    AuthService,
    JwtStrategy,
    JwtService,
    CaslAbilityFactory,
    {
      provide: 'UserInterface',
      useClass: UserRepository,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
