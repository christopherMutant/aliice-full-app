import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { Analysis, User } from '../../all-entities';
import { EntityNames } from '../../../config/entity-names';

@Entity({ name: EntityNames.LABORATORY_REQUEST })
export class LaboratoryRequest extends AuditLogsHook {
  @JoinTable({ name: 'laboratory_request_analysis' })
  @ManyToMany(() => Analysis)
  analyses: Analysis[];

  @JoinColumn({ name: 'patient' })
  @ManyToOne(() => User, user => user.laboratoryRequests)
  patient: User;

  @Column({ nullable: true, type: 'timestamptz' })
  dueDate: Date;

  @Column({ nullable: true, default: false })
  dateRequired: boolean;

  @Column({ nullable: true })
  noticed: string;
}
