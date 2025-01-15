import { Permission } from '../../all-entities';

export class PermissionTransformer extends Permission {
  constructor(permission: Permission) {
    super();
    Object.assign(this, permission);
    delete this.updatedAt;
    delete this.deletedAt;
    delete this.updatedBy;
    delete this.createdBy;
    delete this.deletedBy;
  }
}
