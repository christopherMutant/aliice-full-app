import { ApiProperty } from '@nestjs/swagger';

export class CantonResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  shortName: string;
}
