import { ApiProperty } from '@nestjs/swagger';
import { ConsultationResponseType } from './consultation-response.type';

export class ConsultationListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of a Consultations',
    type: [ConsultationResponseType],
  })
  data: ConsultationResponseType[];
}
