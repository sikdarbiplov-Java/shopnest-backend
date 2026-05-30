import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS ENABLED HERE
  // app.enableCors({
  //   origin: true, // both
  //   credentials: true,
  // });
  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // ✅ IMPORTANT: Serve uploaded files
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // await app.listen(3000); // backend is also on 3000 currently
  await app.listen(process.env.PORT || 3000);
}
bootstrap();