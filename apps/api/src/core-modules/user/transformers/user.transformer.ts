import { User } from '../entities/user.entity';
import { UserRoleTransformer } from '../../role/transformers/user-role.transformer';
import { DepartmentTransformer } from '../../departments/transformers/department.transformer';
import { UserAddressTransformer } from '../../user-address/transformers/user-address.transformer';
import { InsuranceTransformer } from '../../insurance/transformers/insurance.tranformer';
import { ReferenceTransformer } from '../../reference/transformer/reference.transformer';
import { FamilyTransformer } from './family.transformer';
import { BankDetailTransformer } from '../../bank-details/transformer/bank-detail.transformer';

export class UserTransformer extends User {
  constructor(user: User) {
    super();
    Object.assign(this, user);
    delete this.passwordHash;
    delete this.accessTokenHash;
    delete this.refreshTokenHash;
    delete this.emailVerificationTokenExpiryTime;
    delete this.emailVerificationTokenHash;
    delete this.deletedBy;
    delete this.deletedAt;
    delete this.updatedBy;
    delete this.createdBy;

    if (this.userRoles?.length) {
      this.userRoles = this.userRoles.map(
        userRole => new UserRoleTransformer(userRole),
      );
    }

    if (this.department) {
      this.department = new DepartmentTransformer(this.department);
    }

    if (this.address) {
      this.address = new UserAddressTransformer(this.address);
    }

    if (this.family) {
      this.family = this.family.map(
        family => new FamilyTransformer(family),
      );
    }

    if (this.insurances) {
      this.insurances = this.insurances.map(
        insurance => new InsuranceTransformer(insurance),
      );
    }

    if (this.bankDetails) {
      this.bankDetails = new BankDetailTransformer(this.bankDetails);
    }

    if (this.reference) {
      this.reference = this.reference.map(
        reference => new ReferenceTransformer(reference),
      );
    }

    if (this.contactOwner) {
      delete this.contactOwner.contactOwner;
      this.contactOwner = new UserTransformer(this.contactOwner);
    }

    if (this.family) {
      const family = [];
      for (const familyMember of this.family) {
        family.push(new FamilyTransformer(familyMember));
      }
      this.family = family;
    }
  }
}
