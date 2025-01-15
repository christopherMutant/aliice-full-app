import { ApiProperty } from '@nestjs/swagger';
import { ValidationErrorResponse } from '../../shared/types/validation-error-response.type';

export class ResetPasswordValidationMessage {
  @ApiProperty()
  verificationCode: object;

  @ApiProperty()
  email: object;

  @ApiProperty()
  password: object;
}

export class ResetPasswordValidation extends ValidationErrorResponse {
  @ApiProperty()
  validationMessage: ResetPasswordValidationMessage;
}
