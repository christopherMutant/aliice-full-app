import { ApiProperty } from '@nestjs/swagger';
import { ConsultationResponseType } from './consultation-response.type';

export class ConsultationType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of a Consultation',
    type: ConsultationResponseType,
  })
  data: ConsultationResponseType;
}
