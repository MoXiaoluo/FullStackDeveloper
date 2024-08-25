import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { customExceptionFactory } from './utils/exceptionResponse';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      exceptionFactory: customExceptionFactory,
    }),
  );
  app.use(cookieParser());
  app.use(
    session({
      secret: 'moxiaoluo',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
