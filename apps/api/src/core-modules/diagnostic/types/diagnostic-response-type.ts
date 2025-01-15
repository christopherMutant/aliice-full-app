import { ApiProperty } from '@nestjs/swagger';
import { DiagnosticCatalogueResponseType } from '../../diagnostic-catalogue-entry/types/diagnostic-catalogue-response.type';
import { DiagnosticCatalogueEntryResponseType } from '../../diagnostic-catalogue-entry/types/diagnostic-catalogue-entry-response.type';
import { AdditionalCodesType } from './additional-codes.type';

export class DiagnosticResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  additionalCodes: AdditionalCodesType;

  @ApiProperty()
  catalogue: DiagnosticCatalogueResponseType;

  @ApiProperty()
  catalogueEntry: DiagnosticCatalogueEntryResponseType;
}
