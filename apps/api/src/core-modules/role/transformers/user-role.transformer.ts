import { UserRole } from '../../all-entities';
import { RefRoleTransformer } from './role.transformer';

export class UserRoleTransformer extends UserRole {
  constructor(userRole: UserRole) {
    super();
    Object.assign(this, userRole);
    delete this.createdAt;
    delete this.updatedAt;
    delete this.deletedAt;
    delete this.updatedBy;
    delete this.createdBy;
    delete this.deletedBy;

    if (this.refRole) {
      this.refRole = new RefRoleTransformer(this.refRole);
    }
  }
}
