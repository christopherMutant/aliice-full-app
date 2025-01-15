import { ApiProperty } from '@nestjs/swagger';
import { ValidationErrorResponse } from '../../../shared/types/validation-error-response.type';

export class ChangePasswordValidationMessage {
  @ApiProperty()
  currentPassword: object;

  @ApiProperty()
  newPassword: object;
}

export class ChangePasswordValidation extends ValidationErrorResponse {
  @ApiProperty()
  validationMessage: ChangePasswordValidationMessage;
}
