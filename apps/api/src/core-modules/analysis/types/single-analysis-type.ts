import { ApiProperty } from '@nestjs/swagger';
import { AnalysisResponseType } from './analysis-response-type';

export class AnalysisType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Analysis',
    type: AnalysisResponseType,
  })
  data: AnalysisResponseType;
}
