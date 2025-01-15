import { ApiProperty } from '@nestjs/swagger';
import { AppointmentCategoryResponseType } from './appointment-category.type';

export class AppointmentCategoryType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Appointment Category',
    type: AppointmentCategoryResponseType,
  })
  data: AppointmentCategoryResponseType;
}
