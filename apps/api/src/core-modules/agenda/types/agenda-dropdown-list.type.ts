import { ApiProperty } from '@nestjs/swagger';
import { AppointmentAgendaInListResponseType } from './agenda-in-list-response.type';

export class AgendaDropdownListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of agendas for dropdown',
    type: [AppointmentAgendaInListResponseType],
  })
  data: AppointmentAgendaInListResponseType[];
}
