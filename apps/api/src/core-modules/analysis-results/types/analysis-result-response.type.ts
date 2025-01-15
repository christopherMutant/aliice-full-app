import { ApiProperty } from '@nestjs/swagger';
import { AnalysisResponseType } from '../../analysis/types/analysis-response-type';

export class AnalysisResultPatientResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}

export class AnalysisResultResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  analysis: AnalysisResponseType;

  @ApiProperty()
  patient: AnalysisResultPatientResponseType;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  result: string;
}
