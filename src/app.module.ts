import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import * as Joi from '@hapi/joi';
import { UserController } from './handler/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { UserRepository } from './infrastructure/repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/database/entity/user.entity';
import { Product } from './infrastructure/database/entity/product.entity';
import { ProductService } from './application/services/product.service';
import { ProductRepository } from './infrastructure/repository/product.repository';
import { ProductController } from './handler/controllers/product.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        APP_EXPIRES: Joi.string().required(),
        APP_PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [UserController, ProductController],
  providers: [
    UserService,
    ProductService,
    {
      provide: 'UserInterface',
      useClass: UserRepository,
    },
    {
      provide: 'ProductInterface',
      useClass: ProductRepository,
    },
  ],
})
export class AppModule {}
