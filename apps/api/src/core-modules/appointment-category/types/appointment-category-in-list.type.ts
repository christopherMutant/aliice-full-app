import { ApiProperty } from '@nestjs/swagger';

export class AppointmentCategoryInListResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;
}
