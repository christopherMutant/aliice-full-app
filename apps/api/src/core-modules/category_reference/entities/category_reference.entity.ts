import { Column, Entity, OneToMany } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ApiProperty } from '@nestjs/swagger';
import { Reference } from '../../all-entities';

@Entity({ name: EntityNames.CATEGORY_REFERENCE })
export class CategoryReference extends AuditLogsHook {
  @ApiProperty()
  @Column({ nullable: true })
  name: string;

  @OneToMany(() => Reference, reference => reference.category)
  category: Reference[];
}
