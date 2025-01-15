import { CategoryReference } from '../entities/category_reference.entity';

export class CategoryReferenceTransformer extends CategoryReference {
  constructor(categoryReference: CategoryReference) {
    super();
    Object.assign(this, categoryReference);
    delete this.updatedAt;
    delete this.deletedAt;
    delete this.createdAt;
    delete this.updatedBy;
    delete this.createdBy;
    delete this.deletedBy;
  }
}
