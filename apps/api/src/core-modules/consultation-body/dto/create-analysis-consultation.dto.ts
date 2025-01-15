import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateAnalysisResultDto } from '../../analysis-results/dto/create-analysis-result.dto';

export class CreateAnalysisConsultationDto {
  @ApiProperty({
    description: 'Consultation Title ID of the consultation text',
    example: '495e2f62-21ea-45ea-b22c-7f025da4d23f',
  })
  @IsNotEmpty()
  @IsUUID()
  title: string;

  @ApiProperty({
    description: 'Analysis consultation entries',
  })
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value : Array(value),
  )
  @IsArray()
  @ValidateNested()
  entries?: CreateAnalysisResultDto[];
}
