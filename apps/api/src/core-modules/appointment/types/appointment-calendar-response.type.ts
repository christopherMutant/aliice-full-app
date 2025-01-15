import { ApiProperty } from '@nestjs/swagger';

export class AppointmentCalendarUserResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class AppointmentCalendarResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  start: Date;

  @ApiProperty()
  end: Date;

  @ApiProperty()
  resourceId: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  client: AppointmentCalendarUserResponseType;

  @ApiProperty()
  owner: AppointmentCalendarUserResponseType;
}
