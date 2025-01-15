import { ApiProperty } from '@nestjs/swagger';
import { AppointmentResponseType } from './appointment-response.type';

export class AppointmentType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Appointment',
    type: AppointmentResponseType,
  })
  data: AppointmentResponseType;
}
