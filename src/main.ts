import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 3301;
  app.enableCors({
    origin: configService.get<string>('ORIGINAL_URL'),
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(
    session({
      name: 'user_session',
      secret: configService.get<string>('SESSION_SECRET_KEY') || '',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true,
      },
    }),
  );
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(PORT);
}
bootstrap();
