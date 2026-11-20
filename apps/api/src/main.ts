import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useBodyParser('json', { limit: '256kb' });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const webOrigin = process.env.WEB_ORIGIN ?? 'http://127.0.0.1:3000';
  app.enableCors({
    origin: webOrigin,
    methods: ['GET', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  });

  const host = process.env.API_HOST ?? '127.0.0.1';
  const port = Number(process.env.API_PORT ?? 3001);
  await app.listen(port, host);
}

void bootstrap();