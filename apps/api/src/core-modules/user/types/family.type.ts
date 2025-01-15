import { ApiProperty } from '@nestjs/swagger';
import { Family } from '../entities/family.entity';

export class FamilyType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Family Details',
    type: Family,
  })
  data: Family;
}
