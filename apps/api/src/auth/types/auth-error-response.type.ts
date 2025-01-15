import { ApiProperty } from '@nestjs/swagger';

export class AuthErrorResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  error: string;

  @ApiProperty()
  message: string[];
}
