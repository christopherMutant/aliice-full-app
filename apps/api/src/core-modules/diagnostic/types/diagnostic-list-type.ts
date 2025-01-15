import { ApiProperty } from '@nestjs/swagger';
import { DiagnosticResponseType } from './diagnostic-response-type';

export class DiagnosticListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Diagnostics',
    type: [DiagnosticResponseType],
  })
  data: DiagnosticResponseType[];
}
