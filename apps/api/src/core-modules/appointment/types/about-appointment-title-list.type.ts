import { ApiProperty } from '@nestjs/swagger';

export class AboutAppointmentTitleListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of about appointment titles',
    type: [String],
  })
  data: string[];
}
