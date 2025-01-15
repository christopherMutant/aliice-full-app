import { ApiProperty } from '@nestjs/swagger';
import { CategoryOrganization } from '../entities/category-organization.entity';

export class CategoryOrganizationListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Category of Organization details',
    type: [CategoryOrganization],
  })
  data: CategoryOrganization[];
}
