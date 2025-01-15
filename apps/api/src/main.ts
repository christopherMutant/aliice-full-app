import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { SetupSwagger } from './config/swagger';
import { ENV } from './config/env';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import {
  StaticLogger,
  winstonConfig,
} from './exception-and-error-handling/logger/winston';
import { ValidationFilter } from './exception-and-error-handling/validation-filter/validation.filter';
import { validationExceptionFactory } from './exception-and-error-handling/validation-filter/validation-exception';
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger(winstonConfig),
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  // now everywhere you can inject Validator class which will go from the container
  // also you can inject classes using constructor injection into your custom ValidatorConstraint-s

  app.setGlobalPrefix('api');

  if (ENV.ENABLE_SWAGGER) {
    SetupSwagger('swagger', app);
  }

  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      exceptionFactory: validationExceptionFactory,
    }),
  );

  await app.listen(ENV.PORT);
}

bootstrap()
  .then()
  .catch(e => StaticLogger.instance.log('error', e));
