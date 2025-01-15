import { ApiProperty } from '@nestjs/swagger';
import { ValidationErrorResponse } from '../../shared/types/validation-error-response.type';

export class ForgotPasswordValidationMessage {
  @ApiProperty()
  email: object;
}

export class ResetPasswordValidationError extends ValidationErrorResponse {
  @ApiProperty()
  validationMessage: ForgotPasswordValidationMessage;
}
