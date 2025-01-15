import { City } from '../entities/city.entity';

export class LocalityTransformer extends City {
  constructor(city: City) {
    super();

    Object.assign(this, city);

    delete this.updatedAt;
    delete this.deletedAt;
    delete this.createdAt;
    delete this.createdBy;
    delete this.updatedBy;
    delete this.deletedBy;

    delete this.cantonCode;
    delete this.zipCode;
    delete this.id;
  }
}
