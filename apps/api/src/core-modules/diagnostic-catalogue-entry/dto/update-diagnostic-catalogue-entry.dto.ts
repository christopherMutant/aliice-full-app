import { PartialType } from '@nestjs/swagger';
import { CreateDiagnosticCatalogueEntryDto } from './create-diagnostic-catalogue-entry.dto';

export class UpdateDiagnosticCatalogueEntryDto extends PartialType(
  CreateDiagnosticCatalogueEntryDto,
) {}
