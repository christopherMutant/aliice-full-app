import { ApiProperty } from '@nestjs/swagger';

export class AppointmentAgendaInListResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  color: string;
}
