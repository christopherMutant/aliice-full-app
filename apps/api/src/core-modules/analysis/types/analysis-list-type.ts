import { ApiProperty } from '@nestjs/swagger';
import { AnalysisResponseType } from './analysis-response-type';

export class AnalysisListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Analyses',
    type: [AnalysisResponseType],
  })
  data: AnalysisResponseType[];
}
