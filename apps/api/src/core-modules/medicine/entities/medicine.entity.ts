import { Entity, Column } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';

@Entity({ name: EntityNames.MEDICINE })
export class Medicine extends AuditLogsHook {
  @Column({ nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 100, nullable: true })
  manufacturer: string;
}
