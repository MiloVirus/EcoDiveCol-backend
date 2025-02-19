import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverless from 'serverless-http';

dotenv.config();
const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true });
  app.use(cookieParser());

  await app.init(); 
}

bootstrap();


export const handler = serverless(expressApp);
