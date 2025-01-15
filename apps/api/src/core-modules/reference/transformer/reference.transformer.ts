import { CategoryReferenceTransformer } from '../../category_reference/transformers/category-reference.transformer';
import { UserTransformer } from '../../user/transformers/user.transformer';
import { Reference } from '../entities/reference.entity';

export class ReferenceTransformer extends Reference {
  constructor(referance: Reference) {
    super();
    Object.assign(this, referance);
    delete this.updatedAt;
    delete this.deletedAt;
    delete this.createdBy;
    delete this.updatedBy;
    delete this.deletedBy;

    if (this.reference) {
      this.reference = new UserTransformer(this.reference);
    }

    if (this.category) {
      this.category = new CategoryReferenceTransformer(this.category);
    }
  }
}
