import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateInvoiceAttachmentDto {
  @ApiProperty({
    description: 'Patient Case ID',
  })
  @IsUUID()
  patientCase: string;

  @ApiProperty({ description: 'Document Name of the file' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Document',
    type: 'file',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  file: Express.Multer.File;
}
