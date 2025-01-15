import { ApiProperty } from '@nestjs/swagger';
import { CategoryReference } from '../entities/category_reference.entity';

export class CategoryReferenceListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Free Reference Category List',
    type: [CategoryReference],
  })
  data: CategoryReference[];
}
