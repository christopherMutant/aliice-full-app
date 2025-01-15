import { ApiProperty } from '@nestjs/swagger';
import { DiagnosticCatalogueResponseType } from './diagnostic-catalogue-response.type';

export class DiagnosticCatalogueListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Diagnostic Catalogues',
    type: [DiagnosticCatalogueResponseType],
  })
  data: DiagnosticCatalogueResponseType[];
}
