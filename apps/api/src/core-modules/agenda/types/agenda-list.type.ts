import { ApiProperty } from '@nestjs/swagger';
import { AgendaResponseType } from './agenda-response.type';

export class AgendaListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of agendas',
    type: [AgendaResponseType],
  })
  data: AgendaResponseType[];
}
