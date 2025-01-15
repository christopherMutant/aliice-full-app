import { ApiProperty } from '@nestjs/swagger';
import { ConsultationDocumentFormatResponseType } from './consultation-document-format-response.type';

export class ConsultationDocumentFormatListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Consultation Document Format',
    type: [ConsultationDocumentFormatResponseType],
  })
  data: ConsultationDocumentFormatResponseType[];
}
