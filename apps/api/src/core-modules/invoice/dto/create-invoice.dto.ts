import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { InvoiceStatus } from '../../../shared/types/enums';

export class CreateInvoiceDto {
  @ApiProperty({ description: 'Patient case ID' })
  @IsUUID()
  case: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  concerned: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  accountingGroup: string;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  of: Date;

  @ApiProperty({ description: 'End date of the invoice' })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  to: Date;

  @ApiProperty({ description: 'Recepient of the invoice' })
  @IsString()
  recipient: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  remb: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  paid: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  open: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  messages: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  rf: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  copyOfFeedback: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  reminders: string;

  @ApiProperty({
    description: 'Status of the invoice',
    enum: InvoiceStatus,
  })
  @IsEnum(InvoiceStatus)
  status: InvoiceStatus;
}
