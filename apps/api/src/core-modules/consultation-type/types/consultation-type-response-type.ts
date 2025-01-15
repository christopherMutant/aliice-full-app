import { ApiProperty } from '@nestjs/swagger';

export class ConsultationTypeResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  structure: string;
}
