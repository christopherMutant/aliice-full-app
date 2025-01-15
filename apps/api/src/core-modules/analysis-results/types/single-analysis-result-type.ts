import { ApiProperty } from '@nestjs/swagger';
import { AnalysisResultResponseType } from './analysis-result-response.type';

export class AnalysisResultType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Analysis Result',
    type: AnalysisResultResponseType,
  })
  data: AnalysisResultResponseType;
}
