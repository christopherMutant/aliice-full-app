import { ApiProperty } from '@nestjs/swagger';
import { AppointmentCalendarResponseType } from './appointment-calendar-response.type';

export class CalendarType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description:
      'List of agendas together with the list of appointments',
    type: [AppointmentCalendarResponseType],
  })
  data: AppointmentCalendarResponseType[];
}
