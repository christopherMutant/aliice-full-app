import { ApiProperty } from '@nestjs/swagger';
import {
  FamilialRelationship,
  FamilyCategory,
} from '../../../shared/types/enums';
import { ContactOwnerResponseType } from './user-profile-success-response.type';

export class FamilyResponseType {
  @ApiProperty()
  familyMember: ContactOwnerResponseType;

  @ApiProperty()
  legalRepresentative: boolean;

  @ApiProperty({
    description: 'Category of the family member',
    example: Object.values(FamilyCategory),
  })
  category: FamilyCategory;

  @ApiProperty({
    description: 'Degree of relationship with the family member',
    example: 'biological',
  })
  complement: FamilialRelationship;

  @ApiProperty()
  noticed: string;

  @ApiProperty({
    type: Boolean,
    description: 'Checks if a copy will be sent to reference',
  })
  alwaysSendCopy: boolean;
}
