import { ApiProperty } from '@nestjs/swagger';

export class GoogleAuthGenResponse {
  @ApiProperty()
  secret: string;
}
