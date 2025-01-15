import { ApiProperty } from '@nestjs/swagger';
import { AppointmentAgendaInListResponseType } from './agenda-in-list-response.type';
import { UserNameResponseType } from '../../user/types/user-name-response';
import { AgendaTypes } from '../../../shared/types/enums';

export class AgendaResponseType extends AppointmentAgendaInListResponseType {
  @ApiProperty()
  owner: UserNameResponseType;

  @ApiProperty()
  client: UserNameResponseType;

  @ApiProperty()
  status: AgendaTypes;

  @ApiProperty()
  disabled: boolean;

  @ApiProperty()
  remark: string;

  constructor(
    appointmentAgendaInListResponseType: AppointmentAgendaInListResponseType,
  ) {
    super();
    Object.assign(this, appointmentAgendaInListResponseType);
  }
}
