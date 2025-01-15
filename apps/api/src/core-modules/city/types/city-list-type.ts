import { ApiProperty } from '@nestjs/swagger';
import { CityResponseType } from './country-response-type';

export class CityListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Cities',
    type: [CityResponseType],
  })
  data: CityResponseType[];
}
