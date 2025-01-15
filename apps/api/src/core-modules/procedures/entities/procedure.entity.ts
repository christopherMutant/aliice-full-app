import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ProcedureItem } from './procedure-item.entity';
import { PatientCaseService } from '../../all-entities';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceStatus } from '../../../shared/types/enums';
import { EntityNames } from '../../../config/entity-names';

@Entity({ name: EntityNames.PROCEDURES })
export class Procedure extends AuditLogsHook {
  @OneToMany(
    () => ProcedureItem,
    procedureItem => procedureItem.procedure,
    { cascade: true },
  )
  items: ProcedureItem[];

  @JoinColumn({ name: 'patient_case_service' })
  @ManyToOne(() => PatientCaseService, { onDelete: 'CASCADE' })
  patientCaseService: PatientCaseService;

  @ApiProperty({
    description: 'Status',
  })
  @Column({ enum: ServiceStatus, nullable: true })
  status: ServiceStatus;

  @ApiProperty({
    description: 'Date of the procedure',
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
}
