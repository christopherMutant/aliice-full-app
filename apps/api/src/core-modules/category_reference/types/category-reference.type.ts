import { ApiProperty } from '@nestjs/swagger';
import { CategoryReference } from '../entities/category_reference.entity';

export class CategoryReferenceType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Categorie of reference details',
    type: CategoryReference,
  })
  data: CategoryReference;
}
