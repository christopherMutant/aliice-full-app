import { ApiProperty } from '@nestjs/swagger';
import { BaseDiagnosticCatalogueEntryResponseType } from './base-diagnostic-catalogue-entry-response.type';

export class DiagnosticCatalogueEntrySubEntryResponseType extends BaseDiagnosticCatalogueEntryResponseType {
  @ApiProperty({
    type: BaseDiagnosticCatalogueEntryResponseType,
    required: false,
  })
  mainDiagnosticCatalogueEntry?: BaseDiagnosticCatalogueEntryResponseType;
}
