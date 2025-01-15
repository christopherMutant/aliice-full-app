import { ApiProperty } from '@nestjs/swagger';
import { FamilyCategory } from '../../../shared/types/enums';
import { IsEnum } from 'class-validator';

export class FamilialRelationshipDto {
  @ApiProperty({
    description: 'Family category',
    enum: FamilyCategory,
  })
  @IsEnum(FamilyCategory)
  familyCategory: FamilyCategory;
}
