import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ApiProperty } from '@nestjs/swagger';
import { EntityNames } from '../../../config/entity-names';
import {
  DiagnosticCatalogue,
  DiagnosticCatalogueEntry,
  PatientCase,
} from '../../all-entities';

@Entity({ name: EntityNames.DIAGNOSTIC })
export class Diagnostic extends AuditLogsHook {
  @JoinColumn({ name: 'catalogue' })
  @ManyToOne(() => DiagnosticCatalogue, { onDelete: 'SET NULL' })
  catalogue: DiagnosticCatalogue;

  @JoinColumn({ name: 'catalogue_entry' })
  @ManyToOne(() => DiagnosticCatalogueEntry, { onDelete: 'SET NULL' })
  catalogueEntry: DiagnosticCatalogueEntry;

  @Column({ nullable: true, type: 'jsonb' })
  additionalCodes: {
    right?: boolean;
    left?: boolean;
    acute?: boolean;
    chronic?: boolean;
    infectious?: boolean;
    functional?: boolean;
    neoplasia?: boolean;
    professionalReasons?: boolean;
  };

  @JoinColumn({ name: 'patient_case' })
  @ManyToOne(
    () => PatientCase,
    patientCase => patientCase.diagnostics,
    { onDelete: 'CASCADE' },
  )
  patientCase: PatientCase;

  @ApiProperty({ description: 'Text content of the diagnostic' })
  @Column({ nullable: true })
  text: string;
}
