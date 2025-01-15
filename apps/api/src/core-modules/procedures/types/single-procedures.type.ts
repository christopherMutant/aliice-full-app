import { ApiProperty } from '@nestjs/swagger';
import { ProceduresResponseType } from './procedures-response.type';

export class ProceduresType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Procedures',
    type: ProceduresResponseType,
  })
  data: ProceduresResponseType;
}
