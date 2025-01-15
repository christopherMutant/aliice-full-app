import { ApiProperty } from '@nestjs/swagger';

export class GenericErrorResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  method: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  level: string;
}
