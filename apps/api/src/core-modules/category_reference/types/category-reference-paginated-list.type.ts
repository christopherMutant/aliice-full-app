import { ApiProperty } from '@nestjs/swagger';
import { PaginationType } from '../../../shared/types/pagination-type';
import { CategoryReference } from '../entities/category_reference.entity';

export class PaginatedCategoryReferenceType extends PaginationType<CategoryReference> {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Category reference list',
    type: [CategoryReference],
  })
  data: CategoryReference[];
}
