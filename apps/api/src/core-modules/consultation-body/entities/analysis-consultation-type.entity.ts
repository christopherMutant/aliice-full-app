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
import { AnalysisResult, ConsultationBody } from '../../all-entities';

@Entity({ name: EntityNames.ANALYSIS_CONSULTATION })
export class AnalysisConsultation extends AuditLogsHook {
  @JoinColumn({ name: 'title' })
  @ManyToOne(
    () => ConsultationTitle,
    consultationTitle => consultationTitle.medicineConsultations,
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
    () => AnalysisResult,
    analysisResult => analysisResult.analysisConsultation,
    { cascade: true },
  )
  entries: AnalysisResult[];
}
