import {
  Column,
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
import { ServiceConsultationEntry } from '../../consultation-body-part-entry/entities/service-consultation-entry.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: EntityNames.SERVICE_CONSULTATION })
export class ServiceConsultation extends AuditLogsHook {
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
    () => ServiceConsultationEntry,
    serviceConsultationEntry =>
      serviceConsultationEntry.serviceConsultation,
    { cascade: true },
  )
  entries: ServiceConsultationEntry[];

  @ApiProperty()
  @Column({ nullable: true, default: false })
  control: boolean;
}
