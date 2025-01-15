import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { EntityNames } from '../../../config/entity-names';
import { ApiProperty } from '@nestjs/swagger';
import { PatientCase } from '../../all-entities';

@Entity({ name: EntityNames.INVOICE_ATTACHMENT })
export class InvoiceAttachment extends AuditLogsHook {
  @ApiProperty({ description: 'Document name' })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ description: 'Relative url in the bucket' })
  @Column({ nullable: true })
  url: string;

  @ManyToOne(
    () => PatientCase,
    patientCase => patientCase.invoiceAttachments,
  )
  @JoinColumn({ name: 'patient_case' })
  patientCase: PatientCase;
}
