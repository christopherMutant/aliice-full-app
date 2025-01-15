import { ApiProperty } from '@nestjs/swagger';
import { PaginationType } from '../../../shared/types/pagination-type';
import { AppointmentCategoryResponseType } from './appointment-category.type';

export class PaginatedAppointmentCategoryType extends PaginationType<AppointmentCategoryResponseType> {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of appointment categories',
    type: [AppointmentCategoryResponseType],
  })
  data: AppointmentCategoryResponseType[];
}
