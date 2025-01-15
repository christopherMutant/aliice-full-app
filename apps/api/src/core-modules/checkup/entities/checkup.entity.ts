import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ApiProperty } from '@nestjs/swagger';
import {
  CheckUpTypes,
  ServiceStatus,
} from '../../../shared/types/enums';
import { PatientCaseService, User } from '../../all-entities';
import { EntityNames } from '../../../config/entity-names';
import { Inability } from '../../inability/entities/inability.entity';

@Entity({ name: EntityNames.CHECKUP })
export class Checkup extends AuditLogsHook {
  @ApiProperty({
    description: 'Checkup type',
  })
  @Column({ enum: CheckUpTypes, nullable: true })
  type: CheckUpTypes;

  @ApiProperty({
    description: 'Status',
  })
  @Column({
    enum: ServiceStatus,
    nullable: true,
    default: ServiceStatus.OPEN,
  })
  status: ServiceStatus;

  @ApiProperty({
    description: 'Date of the checkup',
    example: new Date(),
  })
  @Column({ type: 'timestamptz', nullable: true })
  date: Date;

  @ApiProperty({
    description: 'Subject of the checkup',
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

  @OneToOne(() => Inability, inability => inability.checkup)
  inability: Inability;

  @JoinColumn({ name: 'patient_case_service' })
  @ManyToOne(() => PatientCaseService, { onDelete: 'CASCADE' })
  patientCaseService: PatientCaseService;
}
