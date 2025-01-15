import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class DiagnosticEntryListDto {
  @ApiProperty({
    description: 'Diagnostic Catalogue ID',
    required: false,
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  catalogue: string;
}
