import { ApiProperty } from '@nestjs/swagger';
import { AboutAppointment } from '../entities/about_appointment.entity';

export class AboutAppointmentSuccessResponseType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: ' about appointment titles',
    type: [AboutAppointment],
  })
  data: AboutAppointment;
}
