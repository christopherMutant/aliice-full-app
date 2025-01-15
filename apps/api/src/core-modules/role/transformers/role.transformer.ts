import { RefRole } from '../../all-entities';

export class RefRoleTransformer extends RefRole {
  constructor(refRole: RefRole) {
    super();
    Object.assign(this, refRole);
    delete this.updatedAt;
    delete this.deletedAt;
    delete this.updatedBy;
    delete this.createdBy;
    delete this.deletedBy;
  }
}
