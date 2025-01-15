import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AnalysisCategories } from '../../../shared/types/enums';

export class AnalysesQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({
    required: false,
    enum: Object.values(AnalysisCategories),
  })
  @IsOptional()
  @IsEnum(AnalysisCategories)
  category: AnalysisCategories;
}
