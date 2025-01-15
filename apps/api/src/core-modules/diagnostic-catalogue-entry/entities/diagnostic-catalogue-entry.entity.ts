import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ApiProperty } from '@nestjs/swagger';
import { DiagnosticCatalogue } from './diagnostic-catalogue.entity';
import { EntityNames } from '../../../config/entity-names';
import { Diagnostic } from '../../diagnostic/entities/diagnostic.entity';

@Entity({ name: EntityNames.DIAGNOSTIC_CATALOGUE_ENTRY })
export class DiagnosticCatalogueEntry extends AuditLogsHook {
  @JoinColumn({ name: 'catalogue' })
  @ManyToOne(
    () => DiagnosticCatalogue,
    diagnosticCatalogue => diagnosticCatalogue.entries,
  )
  catalogue: DiagnosticCatalogue;

  @OneToMany(
    () => Diagnostic,
    diagnostic => diagnostic.catalogueEntry,
  )
  diagnostics: Diagnostic[];

  @JoinColumn({ name: 'main_diagnostic_entry' })
  @ManyToOne(
    () => DiagnosticCatalogueEntry,
    diagnosticCatalogueEntry => diagnosticCatalogueEntry.subEntries,
  )
  mainDiagnosticCatalogueEntry: DiagnosticCatalogueEntry;

  @OneToMany(
    () => DiagnosticCatalogueEntry,
    diagnosticCatalogueEntry =>
      diagnosticCatalogueEntry.mainDiagnosticCatalogueEntry,
  )
  subEntries: DiagnosticCatalogueEntry[];

  @ApiProperty({
    description: 'Code for the diagnostic catalog entry',
  })
  @Column({ nullable: true })
  code: string;

  @ApiProperty({
    description: 'Description for the diagnostic catalog entry',
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    description: 'Information for the diagnostic catalog entry',
  })
  @Column({ nullable: true })
  info: string;
}
