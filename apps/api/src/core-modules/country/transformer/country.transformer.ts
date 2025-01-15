import { Country } from '../entities/country.entity';

export class CountryTransformer extends Country {
  constructor(country: Country) {
    super();

    Object.assign(this, country);

    delete this.updatedAt;
    delete this.deletedAt;
    delete this.createdAt;
    delete this.createdBy;
    delete this.updatedBy;
    delete this.deletedBy;
    delete this.id;
  }
}
