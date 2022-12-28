import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import * as Joi from '@hapi/joi';
import { UserController } from './handler/controllers/user.controller';
import { UserService, ProductService } from './application/services';
import { UserRepository } from './infrastructure/repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/database/entity/user.entity';
import { Product } from './infrastructure/database/entity/product.entity';
import { ProductRepository } from './infrastructure/repository/product.repository';
import { ProductController } from './handler/controllers/product.controller';
import { AuthModule } from './infrastructure/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './handler/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/auth/jwt.strategy';
import { AuthService } from './infrastructure/auth/auth.service';
import { CaslModule } from './infrastructure/casl/casl.module';
import { CoinsBreaker } from './domain';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product]),
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV == 'test' ? '.env.test' : '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        APP_EXPIRES: Joi.string().required(),
        APP_PORT: Joi.number().required(),
        SALT_OR_ROUNDS: Joi.number().required(),
        NODE_ENV: Joi.string().valid('development', 'production', 'test'),
      }),
    }),
    DatabaseModule,
    AuthModule,
    CaslModule,
  ],
  controllers: [UserController, ProductController],
  providers: [
    UserService,
    ProductService,
    JwtService,
    JwtStrategy,
    AuthService,
    CoinsBreaker,
    {
      provide: 'UserInterface',
      useClass: UserRepository,
    },
    {
      provide: 'ProductInterface',
      useClass: ProductRepository,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
