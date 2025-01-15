import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IsInDatabase } from '../../../shared/decorator/is-in-database.decorator';
import { Checkup } from '../../all-entities';
import { IsLaterThan } from '../../../shared/decorator/date-is-later.decorator';

export class CreateInabilityDto {
  @ApiProperty({
    description: 'Checkup ID the inability belongs to',
    example: 'c0224fca-465d-4486-8f8f-34a2011f9e69',
  })
  @IsUUID()
  @IsInDatabase(Checkup)
  checkupId: string;

  @ApiProperty({
    description: 'Date start of the inability',
    example: new Date(),
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @IsLaterThan()
  dateStart: Date;

  @ApiProperty({
    description: 'Number of days of the inability',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => +value)
  days: number;

  @ApiProperty({
    description: 'Incapacity percentage for work of the patient',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => +value)
  incapacityForWork: number;

  @ApiProperty({
    description: 'Ability percentage for work of the patient',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => +value)
  ability: number;

  @ApiProperty({
    description: 'Cause of inability',
  })
  @IsOptional()
  @IsString()
  cause: string;
}
