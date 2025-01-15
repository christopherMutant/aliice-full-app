import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AnalysisCategories } from '../../../shared/types/enums';

export class AnalysisResultQueryDto {
  @ApiProperty({
    description: 'Patient ID',
  })
  @IsString()
  @IsUUID()
  patient: string;

  @ApiProperty({
    description: 'From date of the analysis result',
    required: false,
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  from: Date;

  @ApiProperty({
    description: 'To date of the analysis result',
    required: false,
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  to: Date;

  @ApiProperty({
    description: 'Analysis category, null for all categories',
    enum: AnalysisCategories,
    required: false,
  })
  @IsOptional()
  @IsEnum(AnalysisCategories)
  category: AnalysisCategories;
}
