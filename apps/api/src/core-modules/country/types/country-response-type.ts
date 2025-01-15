import { ApiProperty } from '@nestjs/swagger';

export class CountryResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  shortName: string;
}
