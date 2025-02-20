import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: ['https://eco-dive-col.vercel.app', 'http://localhost:5173'],
    credentials: true, 
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
  }); 
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
