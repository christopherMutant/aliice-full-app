import { Column, Entity } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: EntityNames.CATEGORY_PEOPLE })
export class CategoryPeople extends AuditLogsHook {
  @ApiProperty()
  @Column({ nullable: true })
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;
}
