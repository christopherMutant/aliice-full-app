import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { Analysis, User } from '../../all-entities';
import { EntityNames } from '../../../config/entity-names';
import { AnalysisConsultation } from '../../consultation-body/entities/analysis-consultation-type.entity';

@Entity({ name: EntityNames.ANALYSIS_RESULT })
export class AnalysisResult extends AuditLogsHook {
  @JoinColumn({ name: 'analysis' })
  @ManyToOne(() => Analysis)
  analysis: Analysis;

  @JoinColumn({ name: 'patient' })
  @ManyToOne(() => User, user => user.analysisResults)
  patient: User;

  @Column({ nullable: true })
  date: Date;

  @Column({ nullable: true })
  result: string;

  @JoinColumn({ name: 'analysis_consultation' })
  @ManyToOne(
    () => AnalysisConsultation,
    analysisConsultation => analysisConsultation.entries,
    { onDelete: 'SET NULL' },
  )
  analysisConsultation?: AnalysisConsultation;
}
