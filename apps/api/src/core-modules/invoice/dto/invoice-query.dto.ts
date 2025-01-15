import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class InvoiceQueryDto {
  @ApiProperty({
    description: 'Patient ID',
  })
  @IsString()
  @IsUUID()
  patient: string;
}
