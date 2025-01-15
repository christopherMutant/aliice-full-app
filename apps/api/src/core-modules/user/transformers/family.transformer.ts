import { Family } from '../entities/family.entity';
import { UserTransformer } from './user.transformer';

export class FamilyTransformer extends Family {
  constructor(family: Family) {
    super();

    Object.assign(this, family);
    delete this.updatedAt;
    delete this.deletedAt;
    delete this.createdBy;
    delete this.updatedBy;
    delete this.deletedBy;

    if (this.familyMember) {
      this.familyMember = new UserTransformer(this.familyMember);
    }
  }
}
