import { ApiProperty } from '@nestjs/swagger';
import { PaginationType } from '../../../shared/types/pagination-type';
import { AppointmentStatusResponseType } from './appointment-status.type';

export class PaginatedAppointmentStatusType extends PaginationType<AppointmentStatusResponseType> {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of appointment status',
    type: [AppointmentStatusResponseType],
  })
  data: AppointmentStatusResponseType[];
}
