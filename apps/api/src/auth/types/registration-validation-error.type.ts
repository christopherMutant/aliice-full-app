import { ApiProperty } from '@nestjs/swagger';
import { ValidationErrorResponse } from '../../shared/types/validation-error-response.type';

export class AuthValidationMessage {
  @ApiProperty()
  email: object;

  @ApiProperty()
  password: object;
}

export class AuthValidationError extends ValidationErrorResponse {
  @ApiProperty()
  validationMessage: AuthValidationMessage;
}
