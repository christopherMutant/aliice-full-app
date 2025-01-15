import { ApiProperty } from '@nestjs/swagger';
import { DiagnosticCatalogueEntrySubEntryResponseType } from './diagnostic-catalogue-entry-subentry-response.type';

export class DiagnosticCatalogueEntryType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Diagnostic Catalogue Entries',
    type: DiagnosticCatalogueEntrySubEntryResponseType,
  })
  data: DiagnosticCatalogueEntrySubEntryResponseType;
}
