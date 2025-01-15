import { Column, Entity, OneToMany } from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ApiProperty } from '@nestjs/swagger';
import { DiagnosticCatalogueEntry } from './diagnostic-catalogue-entry.entity';
import { EntityNames } from '../../../config/entity-names';

@Entity({ name: EntityNames.DIAGNOSTIC_CATALOGUE })
export class DiagnosticCatalogue extends AuditLogsHook {
  @ApiProperty({ description: 'Name for the diagnostic catalog' })
  @Column({ nullable: true })
  name: string;

  @OneToMany(
    () => DiagnosticCatalogueEntry,
    diagnosticCatalogueEntry => diagnosticCatalogueEntry.catalogue,
  )
  entries: DiagnosticCatalogueEntry[];
}
