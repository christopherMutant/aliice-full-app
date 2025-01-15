import { ApiProperty } from '@nestjs/swagger';
import { CityResponseType } from './country-response-type';

export class CityType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of City',
    type: CityResponseType,
  })
  data: CityResponseType;
}
