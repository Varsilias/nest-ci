/* eslint-disable */
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
// import 'dotenv/config';

async function bootstrap() {
  const logger = new Logger('Entry FIle');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
  logger.log(`Application started successfully on port ${process.env.PORT}`);
}
bootstrap();
