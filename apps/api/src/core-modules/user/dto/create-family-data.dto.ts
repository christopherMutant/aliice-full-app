import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';
import {
  FamilialRelationship,
  FamilyCategory,
} from '../../../shared/types/enums';
import { IsInDatabase } from '../../../shared/decorator/is-in-database.decorator';
import { User } from '../entities/user.entity';

export class CreateFamilyDataDto {
  @ApiProperty({
    description: 'User ID of the family member',
    example: '6edac13e-3682-4d53-b343-6e9aeca20bb2',
  })
  @IsOptional()
  @IsUUID()
  @IsInDatabase(User, 'id', { message: 'User not found' })
  familyMemberId: string;

  @ApiProperty({
    description:
      'Is this family member the legal representative of the patient',
  })
  @IsOptional()
  @IsBoolean()
  legalRepresentative: boolean;

  @ApiProperty({
    description: 'Category of family member',
    example: Object.values(FamilyCategory),
    required: true,
  })
  @IsEnum(FamilyCategory, { message: 'Invalid family member' })
  category: FamilyCategory;

  @ApiProperty({
    description: 'Degree of relationship with the family member',
    example: Object.values(FamilialRelationship),
    required: true,
  })
  @IsEnum(FamilialRelationship, {
    message: 'Invalid family relationship',
  })
  complement: FamilialRelationship;

  @ApiProperty()
  @IsOptional()
  noticed: string;

  @ApiProperty({
    type: Boolean,
    description: 'Checks if a copy will be sent to reference',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  alwaysSendCopy: boolean;

  @ApiProperty({
    description: 'User ID of the patient',
    example: '6edac13e-3682-4d53-b343-6e9aeca20bb2',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  @IsInDatabase(User, 'id', { message: 'Patient not found' })
  patient?: string;
}
