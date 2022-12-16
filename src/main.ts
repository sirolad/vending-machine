import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './infrastructure/filters/entity-not-found-exception.filter';
import { RolesGuard } from './handler/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Vending Machine API')
    .setDescription('Vending Machine API documentation')
    .setVersion('1.0')
    .addTag('Vending Machine')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.APP_PORT);
}

bootstrap();
