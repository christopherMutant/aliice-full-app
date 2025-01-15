import { ApiProperty } from '@nestjs/swagger';
import { DiagnosticResponseType } from './diagnostic-response-type';

export class DiagnosticType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Diagnostic',
    type: DiagnosticResponseType,
  })
  data: DiagnosticResponseType;
}
