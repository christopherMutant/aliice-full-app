import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ConsultationTitle } from '../../consultation-title/entities/consultation-title.entity';
import { ConsultationBody } from '../../all-entities';
import { DocumentConsultationEntry } from '../../consultation-body-part-entry/entities/document-consultation-entry.entity';

@Entity({ name: EntityNames.DOCUMENT_CONSULTATION })
export class DocumentConsultation extends AuditLogsHook {
  @JoinColumn({ name: 'title' })
  @ManyToOne(
    () => ConsultationTitle,
    consultationTitle => consultationTitle.medicineConsultations,
    { onDelete: 'SET NULL' },
  )
  title: ConsultationTitle;

  @OneToOne(
    () => ConsultationBody,
    consultationBody => consultationBody.relatedObject,
    { onDelete: 'CASCADE', cascade: true },
  )
  @JoinColumn({ name: 'consultation_body' })
  consultationBody: ConsultationBody;

  @OneToMany(
    () => DocumentConsultationEntry,
    documentConsultationEntry =>
      documentConsultationEntry.documentConsultation,
    { cascade: true },
  )
  entries: DocumentConsultationEntry[];
}
