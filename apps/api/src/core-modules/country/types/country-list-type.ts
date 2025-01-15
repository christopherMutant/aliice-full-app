import { ApiProperty } from '@nestjs/swagger';
import { CountryResponseType } from './country-response-type';

export class CountryListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Countries',
    type: [CountryResponseType],
  })
  data: CountryResponseType[];
}
