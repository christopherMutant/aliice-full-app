import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { EntityNames } from '../../../config/entity-names';
import { RefRole, User } from '../../all-entities';

@Entity({ name: EntityNames.USER_ROLE })
export class UserRole extends AuditLogsHook {
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user: User) => user.userRoles, {
    onDelete: 'CASCADE',
  })
  user: User;

  @JoinColumn({ name: 'ref_role_id' })
  @ManyToOne(() => RefRole, (refRole: RefRole) => refRole.userRoles)
  refRole: RefRole;
}
