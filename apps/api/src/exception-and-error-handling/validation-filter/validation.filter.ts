import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

export class ValidationException extends BadRequestException {
  constructor(public validationErrors: object) {
    super();
  }
}

const getValidationErrors = (validationError: object): string[] => {
  return Object.keys(validationError).reduce((acc, key) => {
    let newAcc = [...acc];

    if (typeof validationError[key] === 'string') {
      newAcc.push(validationError[key]);
    } else {
      newAcc = [...getValidationErrors(validationError[key])];
    }

    return newAcc;
  }, []);
};

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): object {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let messages = [];

    for (const key in exception.validationErrors) {
      const validationError = exception.validationErrors[key];
      messages = [
        ...messages,
        ...getValidationErrors(validationError),
      ];
    }

    return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      error: 'Unprocessable Entity',
      message: messages,
      validatedMessage: exception.validationErrors,
    });
  }
}
