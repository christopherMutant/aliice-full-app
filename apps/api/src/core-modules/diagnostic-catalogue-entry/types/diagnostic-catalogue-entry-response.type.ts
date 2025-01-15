import { ApiProperty } from '@nestjs/swagger';
import { BaseDiagnosticCatalogueEntryResponseType } from './base-diagnostic-catalogue-entry-response.type';
import { DiagnosticCatalogueEntrySubEntryResponseType } from './diagnostic-catalogue-entry-subentry-response.type';

export class DiagnosticCatalogueEntryResponseType extends BaseDiagnosticCatalogueEntryResponseType {
  @ApiProperty({
    type: [DiagnosticCatalogueEntrySubEntryResponseType],
    required: false,
  })
  subEntries?: DiagnosticCatalogueEntrySubEntryResponseType[];
}
