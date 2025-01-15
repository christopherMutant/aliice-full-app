import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatusResponseType } from './appointment-status.type';

export class AppointmentStatusType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of appointment status',
    type: AppointmentStatusResponseType,
  })
  data: AppointmentStatusResponseType;
}
