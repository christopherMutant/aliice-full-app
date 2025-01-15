import { ApiProperty } from '@nestjs/swagger';
import { DepartmentResponseType } from '../../departments/types/department-response.type';
import {
  Communication,
  ContactCategories,
  CorrespondenceLanguage,
  Gender,
  MaritalStatus,
} from '../../../shared/types/enums';
import { Family, UserAddress } from '../../all-entities';
import { FamilyResponseType } from './family-response.type';

class RefRole {
  @ApiProperty()
  id: string;

  @ApiProperty()
  key: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [String] })
  permissions: string[];
}

class UserRole {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: () => RefRole })
  refRole: RefRole;
}

class ContactDetailType {
  @ApiProperty()
  type: string;

  @ApiProperty({ enum: ContactCategories })
  category: ContactCategories;

  @ApiProperty()
  value: string;
}

export class ContactOwnerResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  uniqueUserId: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  patientNumber: number;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  civility: string;

  @ApiProperty()
  noAVS: string;

  @ApiProperty({ type: Date })
  dateOfBirth: string;

  @ApiProperty()
  isEmailVerified: boolean;

  @ApiProperty()
  gender: Gender;

  @ApiProperty()
  academicTitle: string;

  @ApiProperty()
  specialist: string;

  @ApiProperty()
  profession: string;

  @ApiProperty()
  maritalStaus: MaritalStatus;

  @ApiProperty()
  correspondenceLanguage: CorrespondenceLanguage;

  @ApiProperty({ type: [ContactDetailType] })
  contactDetails: ContactDetailType[];

  // Individual Information Section
  @ApiProperty()
  email: string;

  @ApiProperty()
  doctor: string;

  @ApiProperty()
  vipSurgery: string;

  @ApiProperty()
  vipAesthetics: string;

  //Information of the medical center
  @ApiProperty()
  globalLocationNumber: string;

  @ApiProperty()
  rcc: string;

  //Communication Section
  @ApiProperty()
  communication: Communication;

  @ApiProperty()
  address: UserAddress;

  @ApiProperty()
  administrativeMessage: string;

  @ApiProperty()
  openAdministrativeMessage: boolean;

  @ApiProperty()
  contactCategory: string;

  @ApiProperty()
  favorite: boolean;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  lastLoginTime: Date;

  @ApiProperty()
  isDisabled: boolean;

  @ApiProperty({ type: () => [UserRole] })
  userRoles: UserRole[];

  @ApiProperty()
  department: DepartmentResponseType;
}

export class UserProfileResponse extends ContactOwnerResponseType {
  @ApiProperty()
  contactOwner: ContactOwnerResponseType;

  // @ApiProperty({ type: [FamilyResponseType] })
  // family: FamilyResponseType[];
}
