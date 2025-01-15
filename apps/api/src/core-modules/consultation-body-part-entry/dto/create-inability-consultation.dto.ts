import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInabilityConsultationEntryDto {
  @ApiProperty({
    description: 'Date range of the inability',
    example: '2024-10-18 to 2024-10-21',
  })
  @IsOptional()
  @IsString()
  date: string;

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
