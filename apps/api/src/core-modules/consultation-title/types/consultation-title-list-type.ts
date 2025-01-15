import { ApiProperty } from '@nestjs/swagger';
import { ConsultationTitleResponseType } from './consultation-title-response-type';

export class ConsultationTitleListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Consultation Titles',
    type: [ConsultationTitleResponseType],
  })
  data: ConsultationTitleResponseType[];
}
