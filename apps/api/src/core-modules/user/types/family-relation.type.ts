import { ApiProperty } from '@nestjs/swagger';
import { FamilialRelationship } from '../../../shared/types/enums';

export class FamilyRelationshipType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Familial Relationship Dropdown',
  })
  data: FamilialRelationship[];
}
