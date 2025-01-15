import { ApiProperty } from '@nestjs/swagger';
import { AnalysisResultResponseType } from './analysis-result-response.type';

export class AnalysisResultListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Analysis Results',
    type: [AnalysisResultResponseType],
  })
  data: AnalysisResultResponseType[];
}
