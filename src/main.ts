import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationHandler, ForbiddenFilter, UnauthorizedFilter, NotFoundFilter } from './error-handler';
import cors from 'cors';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(cookieParser('SECRET'))
  app.useGlobalPipes(new ValidationHandler());
  app.useGlobalFilters(new UnauthorizedFilter(), new ForbiddenFilter, new NotFoundFilter)
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
