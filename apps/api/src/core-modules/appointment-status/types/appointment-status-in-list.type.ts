import { ApiProperty } from '@nestjs/swagger';

export class AppointmentStatusInListResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
