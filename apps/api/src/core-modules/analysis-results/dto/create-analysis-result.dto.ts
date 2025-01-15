import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAnalysisResultDto {
  @ApiProperty({
    description: 'Analysis ID',
    example: 'e1a7e010-866b-4ee0-881f-bb556582e755',
  })
  @IsUUID()
  analysis: string;

  @ApiProperty({
    description: "Patient's user ID",
    example: 'e1a7e010-866b-4ee0-881f-bb556582e755',
  })
  @IsUUID()
  @IsOptional()
  patient: string;

  @ApiProperty({
    description: 'Date of the analysis result',
    example: new Date(),
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  date: Date;

  @ApiProperty({
    description: 'Result of the analysis',
    example: '20-42 mmol/mol',
  })
  @IsString()
  @IsOptional()
  result: string;

  @ApiProperty({
    description: 'Analysis Consultation ID',
    example: 'e1a7e010-866b-4ee0-881f-bb556582e755',
  })
  @IsUUID()
  @IsOptional()
  analysisConsultation: string;
}
