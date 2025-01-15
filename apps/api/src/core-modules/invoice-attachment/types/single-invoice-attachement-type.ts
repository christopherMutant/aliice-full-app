import { ApiProperty } from '@nestjs/swagger';
import { InvoiceAttachmentResponseType } from './invoice-attachement-response-type';

export class InvoiceAttachmentType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Invoice Attachment',
    type: InvoiceAttachmentResponseType,
  })
  data: InvoiceAttachmentResponseType;
}
