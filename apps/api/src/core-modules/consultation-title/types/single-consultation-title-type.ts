import { ApiProperty } from '@nestjs/swagger';
import { ConsultationTitleResponseType } from './consultation-title-response-type';

export class ConsultationTitleType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Consultation Title',
    type: ConsultationTitleResponseType,
  })
  data: ConsultationTitleResponseType;
}
