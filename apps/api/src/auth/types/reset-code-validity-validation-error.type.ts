import { ApiProperty } from '@nestjs/swagger';
import { ValidationErrorResponse } from '../../shared/types/validation-error-response.type';

export class VerifyAccountValidationMessage {
  @ApiProperty()
  email: object;

  @ApiProperty()
  code: object;
}

export class verifyAccountValidationError extends ValidationErrorResponse {
  @ApiProperty()
  validationMessage: VerifyAccountValidationMessage;
}
