import { ApiProperty } from '@nestjs/swagger';
import { DiagnosticCatalogueResponseType } from './diagnostic-catalogue-response.type';

export class BaseDiagnosticCatalogueEntryResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  info: string;

  @ApiProperty()
  catalogue?: DiagnosticCatalogueResponseType;
}
