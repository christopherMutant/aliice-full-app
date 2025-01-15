import { CantonTransfomer } from '../../canton/transformer/canton.transformer';
import { LocalityTransformer } from '../../city/transformer/locality.transformer';
import { CountryTransformer } from '../../country/transformer/country.transformer';
import { UserAddress } from '../entities/user-address.entity';

export class UserAddressTransformer extends UserAddress {
  constructor(userAddress: UserAddress) {
    super();
    Object.assign(this, userAddress);

    delete this.createdAt;
    delete this.updatedAt;
    delete this.deletedAt;
    delete this.updatedBy;
    delete this.createdBy;
    delete this.deletedBy;

    if (this.locality) {
      this.locality = new LocalityTransformer(this.locality);
    }

    if (this.canton) {
      this.canton = new CantonTransfomer(this.canton);
    }

    if (this.country) {
      this.country = new CountryTransformer(this.country);
    }
  }
}
