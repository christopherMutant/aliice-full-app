import { ApiProperty } from '@nestjs/swagger';
import { CountryResponseType } from './country-response-type';

export class CountryType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Country',
    type: CountryResponseType,
  })
  data: CountryResponseType;
}
