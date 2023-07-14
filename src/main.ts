import {
  AllExceptionsFilter,
  ClassValidatorFilter,
  TransformInterceptor,
} from '@app/common';
import { CustomValidationPipe } from '@app/common/pipes/validation.pipe';
import { appConfig } from '@app/core';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  const reflector = app.get(Reflector);

  app.enableCors();
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'file/:filename', method: RequestMethod.GET }],
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new ClassValidatorFilter(reflector),
  );
  app.useGlobalPipes(new CustomValidationPipe());

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
