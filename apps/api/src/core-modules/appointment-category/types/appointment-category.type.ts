import { ApiProperty } from '@nestjs/swagger';
import { AppointmentCategoryInListResponseType } from './appointment-category-in-list.type';

export class AppointmentCategoryResponseType extends AppointmentCategoryInListResponseType {
  @ApiProperty()
  color: string;

  @ApiProperty()
  createdAt: Date;
}
