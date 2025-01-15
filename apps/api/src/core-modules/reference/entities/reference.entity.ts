import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { CategoryReference, User } from '../../all-entities';
import { ApiProperty } from '@nestjs/swagger';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';

@Entity({ name: EntityNames.REFERENCE })
export class Reference extends AuditLogsHook {
  @ManyToOne(() => User, user => user.personReferences)
  reference: User;

  @ManyToOne(
    () => CategoryReference,
    categoryReference => categoryReference.category,
  )
  category: CategoryReference;

  @ApiProperty()
  @Column({ nullable: true })
  noticed: string;

  @ApiProperty()
  @Column({ nullable: true })
  sendCopyToReference: boolean;

  @ManyToOne(() => User, user => user.reference)
  users: User;
}
