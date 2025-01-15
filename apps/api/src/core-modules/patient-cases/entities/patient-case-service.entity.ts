import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { PatientCase } from './patient-case.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PatientCaseServiceTypes } from '../../../shared/types/enums';
import { EntityNames } from '../../../config/entity-names';

@Entity({ name: EntityNames.PATIENT_CASE_SERVICE })
export class PatientCaseService extends AuditLogsHook {
  @JoinColumn({ name: 'patient_case' })
  @ManyToOne(() => PatientCase, patientCase => patientCase.services, {
    onDelete: 'CASCADE',
  })
  patientCase: PatientCase;

  @ApiProperty({
    description: 'Id of the related patient case service',
  })
  @Column({ nullable: true, type: 'uuid' })
  relatedObject: string;

  @ApiProperty({
    description: 'Type of patient case service',
  })
  @Column({ nullable: true, enum: PatientCaseServiceTypes })
  relatedType: PatientCaseServiceTypes;
}
