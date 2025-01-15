import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';

@Entity({ name: EntityNames.PERMISSION })
export class Permission extends AuditLogsHook {
  @ApiProperty()
  @Column({
    nullable: true,
    default: null,
  })
  key: string;

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  name: string;
}
