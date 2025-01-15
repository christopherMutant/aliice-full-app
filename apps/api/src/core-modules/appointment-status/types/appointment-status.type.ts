import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatusInListResponseType } from './appointment-status-in-list.type';

export class AppointmentStatusResponseType extends AppointmentStatusInListResponseType {
  @ApiProperty()
  icon: string;

  @ApiProperty()
  createdAt: Date;
}
