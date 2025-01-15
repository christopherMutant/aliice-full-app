import { ApiProperty } from '@nestjs/swagger';
import { AboutAppointmentResponseType } from './appointment-response.type';

export class AboutAppointmentListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of about appointments with agendas',
    type: [AboutAppointmentResponseType],
  })
  data: AboutAppointmentResponseType[];
}
