import { ApiProperty } from '@nestjs/swagger';
import { InvoiceStatus } from '../../../shared/types/enums';

export class AssetResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  recipient: string;

  @ApiProperty()
  creditCardNumber: string;

  @ApiProperty()
  invoiceNumber: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  paid: number;

  @ApiProperty()
  open: number;

  @ApiProperty()
  status: InvoiceStatus;

  @ApiProperty()
  dateOfLastStatusChange: Date;
}
