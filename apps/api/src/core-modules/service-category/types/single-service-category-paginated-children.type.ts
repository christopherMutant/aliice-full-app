import { ApiProperty } from '@nestjs/swagger';
import { ServiceCategoryResponseType } from './service-category-response.type';
import { Pagination } from '../../../shared/types/pagination-type';

export class ServiceCategoryWithPaginatedChildrenType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description:
      'Details of a Service Category with a list of paginated children',
    type: ServiceCategoryResponseType,
  })
  data: ServiceCategoryResponseType;

  @ApiProperty({
    description:
      'This is the pagination object where we have details',
  })
  pagination: Pagination;
}
