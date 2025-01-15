import { ApiProperty } from '@nestjs/swagger';
import { InvoiceResponseType } from './invoice-response.type';

export class InvoiceType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of an Invoice',
    type: InvoiceResponseType,
  })
  data: InvoiceResponseType;
}
