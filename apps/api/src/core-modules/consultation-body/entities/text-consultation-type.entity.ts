import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ApiProperty } from '@nestjs/swagger';
import { ConsultationTitle } from '../../consultation-title/entities/consultation-title.entity';
import { ConsultationBody } from '../../all-entities';

@Entity({ name: EntityNames.TEXT_CONSULTATION })
export class TextConsultation extends AuditLogsHook {
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

  @ApiProperty({
    description: 'Text content of the consultation text',
  })
  @Column({ nullable: true, type: 'text' })
  text: string;
}
