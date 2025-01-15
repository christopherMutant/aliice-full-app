import { ApiProperty } from '@nestjs/swagger';

export class UserNameResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}
