import { NestFactory } from '@nestjs/core';
// import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  // const logger = new Logger('Bootstrap function in "main.ts" file');
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(port || 3000);
  // logger.log(`Application started successfully on port ${port}`);
}
bootstrap();
