import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatusInListResponseType } from './appointment-status-in-list.type';

export class AppointmentStatusListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of appointment status',
    type: [AppointmentStatusInListResponseType],
  })
  data: AppointmentStatusInListResponseType[];
}
