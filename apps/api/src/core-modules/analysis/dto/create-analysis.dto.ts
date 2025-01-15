import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { AnalysisCategories } from '../../../shared/types/enums';

export class CreateAnalysisDto {
  @ApiProperty({
    description: 'Name of the analysis',
    example: 'Glycosylated Hemoglobin IFFCC (HbA1c)',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Short name or acronym of the analysis',
    example: 'HBA1C',
  })
  @IsString()
  shortName: string;

  @ApiProperty({
    description: 'Unit of measure of the analysis',
    example: 'mmol/mol',
  })
  @IsString()
  unit: string;

  @ApiProperty({
    description: 'Reference value for normal results',
    example: '> 21',
  })
  @IsString()
  reference: string;

  @ApiProperty({
    description: 'Category of the analysis',
    example: Object.values(AnalysisCategories),
    enum: AnalysisCategories,
  })
  @IsEnum(AnalysisCategories)
  category: AnalysisCategories;
}
