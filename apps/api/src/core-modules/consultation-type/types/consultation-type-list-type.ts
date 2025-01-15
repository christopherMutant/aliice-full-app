import { ApiProperty } from '@nestjs/swagger';
import { ConsultationTypeResponseType } from './consultation-type-response-type';

export class ConsultationTypeListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Consultation Types',
    type: [ConsultationTypeResponseType],
  })
  data: ConsultationTypeResponseType[];
}
