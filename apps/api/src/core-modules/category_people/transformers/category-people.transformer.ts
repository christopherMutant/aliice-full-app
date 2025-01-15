import { CategoryPeople } from '../entities/category_person.entity';

export class CategoryPeopleTransformer extends CategoryPeople {
  constructor(categoryPeople: CategoryPeople) {
    super();

    Object.assign(this, categoryPeople);

    delete this.updatedAt;
    delete this.deletedAt;
    delete this.updatedBy;
    delete this.createdBy;
    delete this.deletedBy;
  }
}
