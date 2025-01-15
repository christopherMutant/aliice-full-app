import { ApiProperty } from '@nestjs/swagger';
import { CantonResponseType } from '../../canton/types/canton-response-type';
import { CountryResponseType } from '../../country/types/country-response-type';

export class CityResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  zipCode: string;

  @ApiProperty()
  country: CountryResponseType;

  @ApiProperty()
  canton: CantonResponseType;
}
