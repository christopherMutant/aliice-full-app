import { ApiProperty } from '@nestjs/swagger';
import { ValidationErrorResponse } from '../../shared/types/validation-error-response.type';

export class LogoutValidationMessage {
  @ApiProperty()
  deviceId: object;
}

export class LogoutValidationError extends ValidationErrorResponse {
  @ApiProperty()
  validationMessage: LogoutValidationMessage;
}
