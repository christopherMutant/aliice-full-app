import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';
import { EntityNames } from '../../../config/entity-names';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';

@Entity({ name: EntityNames.REF_ROLE })
export class RefRole extends AuditLogsHook {
  @ApiProperty()
  @Column({
    nullable: true,
    default: null,
  })
  key: string;

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  name: string;

  @ApiProperty()
  @Column('simple-array', { nullable: true })
  permissions: string[];

  @ApiProperty()
  @OneToMany(
    () => UserRole,
    (userRole: UserRole) => userRole.refRole,
    {
      cascade: true,
    },
  )
  userRoles: UserRole[];
}
