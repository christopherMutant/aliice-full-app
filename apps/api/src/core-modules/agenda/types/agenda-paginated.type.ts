import { ApiProperty } from '@nestjs/swagger';
import { PaginationType } from '../../../shared/types/pagination-type';
import { AgendaResponseType } from './agenda-response.type';

export class PaginatedAgendaType extends PaginationType<AgendaResponseType> {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Paginated list of agendas',
    type: [AgendaResponseType],
  })
  data: AgendaResponseType[];
}
