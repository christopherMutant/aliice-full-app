import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConstantMessage } from '../constants/constant-messages';

export const SetupSwagger = (
  path: string,
  app: INestApplication,
): void => {
  const config = new DocumentBuilder()
    .setTitle(ConstantMessage.SWAGGER_TITLE)
    .setDescription(ConstantMessage.SWAGGER_DESCRIPTION)
    .setVersion(ConstantMessage.SWAGGER_VERSION)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document, {
    swaggerOptions: {
      persistentAuthorization: true,
    },
  });
};
