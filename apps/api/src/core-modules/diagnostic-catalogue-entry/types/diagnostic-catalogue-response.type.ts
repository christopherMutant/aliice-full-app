import { ApiProperty } from '@nestjs/swagger';

export class DiagnosticCatalogueResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
