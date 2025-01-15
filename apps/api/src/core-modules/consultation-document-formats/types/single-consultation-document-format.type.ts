import { ApiProperty } from '@nestjs/swagger';
import { ConsultationDocumentFormatResponseType } from './consultation-document-format-response.type';

export class ConsultationDocumentFormatType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Consultation Document Format',
    type: ConsultationDocumentFormatResponseType,
  })
  data: ConsultationDocumentFormatResponseType;
}
