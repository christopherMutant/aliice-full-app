import { CategoryOrganization } from '../entities/category-organization.entity';

export class CategoryOrganizationTransfomer extends CategoryOrganization {
  constructor(categoryOrganization: CategoryOrganization) {
    super();

    Object.assign(this, categoryOrganization);

    delete this.updatedAt;
    delete this.deletedAt;
    delete this.updatedBy;
    delete this.createdBy;
    delete this.deletedBy;
  }
}
