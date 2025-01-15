import { ApiProperty } from '@nestjs/swagger';
import { AgendaResponseType } from './agenda-response.type';

export class AgendaType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Agenda',
    type: AgendaResponseType,
  })
  data: AgendaResponseType;
}
