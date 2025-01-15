import { ApiProperty } from '@nestjs/swagger';
import { AppointmentAgendaInListResponseType } from './agenda-in-list-response.type';
import { UserNameResponseType } from '../../user/types/user-name-response';
import { AppointmentResponseType } from '../../appointment/types/appointment-response.type';

export class AgendaCalendarResponseType extends AppointmentAgendaInListResponseType {
  @ApiProperty()
  owner: UserNameResponseType;

  @ApiProperty()
  client: UserNameResponseType;

  @ApiProperty({ type: [AppointmentResponseType] })
  appointments: AppointmentResponseType[];

  constructor(
    appointmentAgendaInListResponseType: AppointmentAgendaInListResponseType,
  ) {
    super();
    Object.assign(this, appointmentAgendaInListResponseType);
  }
}
