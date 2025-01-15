import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDiagnosticCatalogueEntryDto {
  @ApiProperty({ description: 'Diagnostic Catalogue ID' })
  @IsString()
  @IsUUID()
  catalogue: string;

  @ApiProperty({
    description:
      'Diagnostic Catalogue Entry ID if the current entry belongs to a main diagnostic catlogue entry',
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  mainDiagnosticCatalogueEntry?: string;

  @ApiProperty({
    description: 'Code name for the diagnostic catlogue entry ',
    example: 'A',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Description for the diagnostic catlogue entry ',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Info for the diagnostic catlogue entry ',
  })
  @IsString()
  info: string;
}
