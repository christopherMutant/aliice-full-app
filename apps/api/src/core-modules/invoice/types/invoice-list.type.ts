import { ApiProperty } from '@nestjs/swagger';
import { InvoiceResponseType } from './invoice-response.type';

export class InvoiceListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Invoices',
    type: [InvoiceResponseType],
  })
  data: InvoiceResponseType[];
}
