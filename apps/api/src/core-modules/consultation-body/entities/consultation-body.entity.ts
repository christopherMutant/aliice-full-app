import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { ApiProperty } from '@nestjs/swagger';
import { Consultation } from '../../all-entities';
import { ConsultationBodyTypes } from '../../../shared/types/enums';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';

@Entity({ name: EntityNames.CONSULTATION_BODY })
export class ConsultationBody extends AuditLogsHook {
  @JoinColumn({ name: 'consultation' })
  @ManyToOne(
    () => Consultation,
    consultation => consultation.consultationBody,
    { onDelete: 'CASCADE' },
  )
  consultation: Consultation;

  @ApiProperty({
    description: 'Id of the related consultation body',
  })
  @Column({ nullable: true, type: 'uuid' })
  relatedObject: string;

  @ApiProperty({
    description: 'Type of consultation body',
  })
  @Column({ nullable: true, enum: ConsultationBodyTypes })
  relatedType: ConsultationBodyTypes;
}
