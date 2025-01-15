import { LocalityTransformer } from '../../city/transformer/locality.transformer';
import { CountryTransformer } from '../../country/transformer/country.transformer';
import { BankDetails } from '../entities/bank-detail.entity';

export class BankDetailTransformer extends BankDetails {
  constructor(bankDetails: BankDetails) {
    super();
    Object.assign(this, bankDetails);
    delete this.updatedAt;
    delete this.deletedAt;
    delete this.createdBy;
    delete this.updatedBy;
    delete this.deletedBy;

    if (this.country) {
      this.country = new CountryTransformer(this.country);
    }

    if (this.locality) {
      this.locality = new LocalityTransformer(this.locality);
    }
  }
}
