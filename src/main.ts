import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const server = express();  // Crea un servidor Express

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: 'http://localhost:5173', credentials: true });
  app.use(cookieParser());
  await app.init();  // NO usamos app.listen(), porque Vercel maneja el servidor
}

bootstrap();
export default server;  // Exportamos el servidor para Vercel
