import { ApiProperty } from '@nestjs/swagger';
import { AppointmentCategoryInListResponseType } from './appointment-category-in-list.type';

export class AppointmentCategoryListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of appointment status',
    type: [AppointmentCategoryInListResponseType],
  })
  data: AppointmentCategoryInListResponseType[];
}
