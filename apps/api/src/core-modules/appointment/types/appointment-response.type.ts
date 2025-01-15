import { ApiProperty } from '@nestjs/swagger';
import { AppointmentCategoryResponseType } from '../../appointment-category/types/appointment-category.type';
import { AppointmentAgendaInListResponseType } from '../../agenda/types/agenda-in-list-response.type';
import { UserNameResponseType } from '../../user/types/user-name-response';
import { DepartmentResponseType } from '../../departments/types/department-response.type';
import { AppointmentStatusResponseType } from '../../appointment-status/types/appointment-status.type';

// export class AppointmentOccurenceResponseType {
//   @ApiProperty()
//   id: string;

//   @ApiProperty()
//   start: Date;

//   @ApiProperty()
//   end: Date;

//   @ApiProperty()
//   notes: string;

//   @ApiProperty()
//   duration: number;
// }

export class AboutAppointmentResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  category: AppointmentCategoryResponseType;

  @ApiProperty({ type: [AppointmentAgendaInListResponseType] })
  agendas: AppointmentAgendaInListResponseType[];
}

export class AppointmentResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  start: Date;

  @ApiProperty()
  end: Date;

  @ApiProperty()
  description: string;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  isRepeating: boolean;

  @ApiProperty()
  rrule: string;

  @ApiProperty()
  patient: UserNameResponseType;

  @ApiProperty()
  doctor: UserNameResponseType;

  @ApiProperty()
  department: DepartmentResponseType;

  @ApiProperty()
  status: AppointmentStatusResponseType;

  @ApiProperty({ type: AboutAppointmentResponseType })
  aboutAppointment: AboutAppointmentResponseType;

  // @ApiProperty({ type: [AppointmentOccurenceResponseType] })
  // occurrences: AppointmentOccurenceResponseType[];
}
