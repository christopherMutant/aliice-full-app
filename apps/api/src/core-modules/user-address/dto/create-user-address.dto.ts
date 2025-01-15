import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { IsInDatabase } from '../../../shared/decorator/is-in-database.decorator';
import { Canton, City, Country } from '../../all-entities';

export class CreateUserAddressDto {
  @ApiProperty({
    description:
      'Additional address information or details such as apartment number or suite.',
    example: 'Apt 4B',
  })
  @IsString()
  @IsOptional()
  addressSuplement: string;

  @ApiProperty({
    description: 'Street name where the address is located.',
    example: 'Main Street',
  })
  @IsString()
  street: string;

  @ApiProperty({
    description: 'Street number or house number of the address.',
    example: '123',
  })
  @IsString()
  @IsOptional()
  streetNumber: string;

  @ApiProperty({
    description: 'Post office or postal area related to the address.',
    example: 'PO Box 456',
  })
  @IsString()
  @IsOptional()
  postOffice: string;

  @ApiProperty({
    description: 'Postal or ZIP code of the address.',
    example: '1232',
  })
  @IsString()
  npa: string;

  @ApiProperty({
    description:
      'Locality or neighborhood where the address is situated.',
    example: '00011dad-7d1b-4047-92bd-2bf8fa358678',
  })
  @IsUUID()
  @IsInDatabase(City)
  locality: string;

  @ApiProperty({
    description: 'Town or city of the address.',
    example: '13e36538-7ea6-4c75-8854-f3604eae4a85',
  })
  @IsUUID()
  @IsInDatabase(Canton)
  canton: string;

  @ApiProperty({
    description: 'Region or state where the address is located.',
    example: 'Illinoi',
  })
  @IsString()
  @IsOptional()
  region: string;

  @ApiProperty({
    description: 'Country of the address.',
    example: '9ed400a6-05d0-4736-b700-89f0f39144c4',
  })
  @IsUUID()
  @IsInDatabase(Country)
  country: string;
}
