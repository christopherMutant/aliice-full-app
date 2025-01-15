import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { InvoiceStatus } from '../../../shared/types/enums';

export class CreateAssetDto {
  @ApiProperty()
  @IsString()
  recipient: string;

  @ApiProperty({ description: ' Credit Number' })
  @IsString()
  creditCardNumber: string;

  @ApiProperty({ description: 'Invoice number' })
  @IsNumber()
  invoiceNumber: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  paid: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  open: number;

  @ApiProperty({
    description: 'Status of the asset',
    enum: InvoiceStatus,
  })
  @IsEnum(InvoiceStatus)
  status: InvoiceStatus;
}
