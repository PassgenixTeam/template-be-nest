import { AllExceptionsFilter, TransformInterceptor } from '@app/common';
import { appConfig } from '@app/core';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalFilters(new AllExceptionsFilter());

  const options = new DocumentBuilder()
    .setTitle(appConfig.swagger.SWAGGER_TITLE)
    .setDescription(appConfig.swagger.SWAGGER_DESCRIPTION)
    .setVersion(appConfig.swagger.SWAGGER_VERSION)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(appConfig.swagger.SWAGGER_PATH, app, document, {
    customCssUrl: '/css/swagger.custom.css',
  });

  const PORT = appConfig.server.PORT || 3000;
  const HOST = appConfig.server.HOST || 'localhost';

  if (process.env.NODE_ENV == 'development') {
    mongoose.set('debug', true);
  }

  await app.listen(PORT);

  console.log(`URL Swagger http://${HOST}:${PORT}/docs`);
  console.log(`Starting on http://${HOST}:${PORT}`);
}
bootstrap();
