import { ApiProperty } from '@nestjs/swagger';

export class InvoiceAttachmentResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  createdAt: Date;
}
