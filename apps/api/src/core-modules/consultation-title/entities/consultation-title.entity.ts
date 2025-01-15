import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ConsultationType } from '../../consultation-type/entities/consultation-type.entity';
import { MedicineConsultation } from '../../consultation-body/entities/medicine-consultation-type.entity';

@Entity({ name: EntityNames.CONSULTATION_TITLE })
export class ConsultationTitle extends AuditLogsHook {
  @Column({ nullable: true })
  name: string;

  @JoinColumn({ name: 'consultation_type' })
  @ManyToOne(
    () => ConsultationType,
    consultationType => consultationType.titles,
    {
      onDelete: 'SET NULL',
    },
  )
  type: ConsultationType;

  @OneToMany(
    () => MedicineConsultation,
    medicineConsultation => medicineConsultation.title,
  )
  medicineConsultations: MedicineConsultation[];
}
