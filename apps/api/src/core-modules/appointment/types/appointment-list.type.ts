import { ApiProperty } from '@nestjs/swagger';
import { AppointmentResponseType } from './appointment-response.type';
import { PaginationType } from '../../../shared/types/pagination-type';

export class PaginatedAppointmentType extends PaginationType<AppointmentResponseType> {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of appointments',
    type: [AppointmentResponseType],
  })
  data: AppointmentResponseType[];
}
