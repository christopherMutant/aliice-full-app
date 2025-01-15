import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { EntityNames } from '../../../config/entity-names';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../all-entities';
import { ConsultationBody } from '../../consultation-body/entities/consultation-body.entity';

@Entity({ name: EntityNames.CONSULTATION })
export class Consultation extends AuditLogsHook {
  @ApiProperty({
    description: 'Date of the consultation',
    example: new Date(),
  })
  @Column({ type: 'timestamptz', nullable: true })
  date: Date;

  @ApiProperty({
    description: 'Time of the consultation',
    example: '09:30:00',
  })
  @Column({ nullable: true })
  time: string;

  @ApiProperty({
    description: 'Subject of the consultation',
    example: 'Consultation with Dr. Strange',
  })
  @Column({ nullable: true })
  subject: string;

  @JoinColumn({ name: 'patient' })
  @ManyToOne(() => User, user => user.consultations, {
    onDelete: 'SET NULL',
  })
  patient: User;

  @JoinColumn({ name: 'doctor' })
  @ManyToOne(() => User, user => user.consultations, {
    onDelete: 'SET NULL',
  })
  doctor: User;

  @OneToMany(
    () => ConsultationBody,
    consultationBody => consultationBody.consultation,
    { cascade: true, onDelete: 'SET NULL' },
  )
  consultationBody: ConsultationBody[];
}
