import { UserAddressTransformer } from '../../user-address/transformers/user-address.transformer';
import { Company } from '../entities/company.entity';

export class CompanyTransformer extends Company {
  constructor(company: Company) {
    super();

    Object.assign(this, company);

    delete this.updatedAt;
    delete this.deletedAt;
    delete this.createdAt;
    delete this.createdBy;
    delete this.updatedBy;
    delete this.deletedBy;

    if (this.address) {
      this.address = new UserAddressTransformer(this.address);
    }
  }
}
