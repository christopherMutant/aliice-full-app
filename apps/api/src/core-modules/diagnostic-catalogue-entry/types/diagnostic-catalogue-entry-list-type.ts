import { ApiProperty } from '@nestjs/swagger';
import { DiagnosticCatalogueEntryResponseType } from './diagnostic-catalogue-entry-response.type';

export class DiagnosticCatalogueEntryListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Diagnostic Catalogue Entries',
    type: [DiagnosticCatalogueEntryResponseType],
  })
  data: DiagnosticCatalogueEntryResponseType[];
}
