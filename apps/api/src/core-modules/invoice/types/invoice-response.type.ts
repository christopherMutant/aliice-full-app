import { ApiProperty } from '@nestjs/swagger';
import { InvoiceStatus } from '../../../shared/types/enums';

export class PatientCaseInInvoiceType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  caseNo: number;
}

export class InvoiceResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  invoiceNumber: number;

  @ApiProperty()
  caseNo: string;

  @ApiProperty()
  concerned: string;

  @ApiProperty()
  accountingGroup: string;

  @ApiProperty()
  of: Date;

  @ApiProperty()
  to: Date;

  @ApiProperty()
  recipient: string;

  @ApiProperty()
  remb: string;

  @ApiProperty()
  total: number;

  @ApiProperty()
  paid: number;

  @ApiProperty()
  open: number;

  @ApiProperty()
  messages: string;

  @ApiProperty()
  rf: string;

  @ApiProperty()
  copyOfFeedback: string;

  @ApiProperty()
  reminders: string;

  @ApiProperty()
  status: InvoiceStatus;

  @ApiProperty()
  dateOfLastStatusChange: Date;
}
