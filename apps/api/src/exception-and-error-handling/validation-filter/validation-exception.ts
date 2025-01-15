import { ValidationError } from '@nestjs/common';
import { ValidationException } from './validation.filter';

const mapErrorChildren = (
  validationError: ValidationError,
): object => {
  if (validationError.children && validationError.children.length) {
    const validationMsg = validationError.children.reduce(
      (acc, err) => ({ ...acc, ...mapErrorChildren(err) }),
      {},
    );

    return {
      [validationError.property]: validationMsg,
    };
  }
  return {
    [validationError.property]: { ...validationError.constraints },
  };
};

export const validationExceptionFactory = (
  errors: ValidationError[],
): ValidationException => {
  const errMsg = errors.reduce(
    (acc, err) => ({ ...acc, ...mapErrorChildren(err) }),
    {},
  );

  return new ValidationException(errMsg);
};
