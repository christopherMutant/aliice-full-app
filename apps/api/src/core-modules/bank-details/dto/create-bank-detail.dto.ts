import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsInDatabase } from '../../../shared/decorator/is-in-database.decorator';
import { City, Country } from '../../all-entities';

export class CreateBankDetailDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  bankName: string;

  @ApiProperty()
  @IsString()
  npa: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsInDatabase(City)
  locality: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsInDatabase(Country)
  country: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  iban: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @ApiProperty()
  inFavor: string;
}
