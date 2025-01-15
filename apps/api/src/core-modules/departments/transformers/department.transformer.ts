import { Department } from '../../all-entities';

export class DepartmentTransformer extends Department {
  constructor(department: Department) {
    super();
    Object.assign(this, department);
    delete this.updatedAt;
    delete this.deletedAt;
    delete this.updatedBy;
    delete this.createdBy;
    delete this.deletedBy;
  }
}
