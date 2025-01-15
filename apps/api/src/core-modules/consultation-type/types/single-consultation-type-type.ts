import { ApiProperty } from '@nestjs/swagger';
import { ConsultationTypeResponseType } from './consultation-type-response-type';

export class ConsultationTypeType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Consultation Type',
    type: ConsultationTypeResponseType,
  })
  data: ConsultationTypeResponseType;
}
