import { CompanyTransformer } from '../../company/transformer/company.transformer';
import { Insurance } from '../entities/insurance.entity';

export class InsuranceTransformer extends Insurance {
  constructor(insurance: Insurance) {
    super();
    Object.assign(this, insurance);
    delete this.createdBy;
    delete this.updatedBy;
    delete this.createdAt;
    delete this.deletedAt;
    delete this.updatedAt;

    if (this.company) {
      this.company = new CompanyTransformer(this.company);
    }
  }
}
