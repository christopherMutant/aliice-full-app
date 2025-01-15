import { ApiProperty } from '@nestjs/swagger';
import { PaginationType } from '../../../shared/types/pagination-type';
import { ServiceCategoryMemberResponseType } from '../../service-category/types/service-category-response.type';

export class ServicePaginatedListForServiceCategoryType extends PaginationType<ServiceCategoryMemberResponseType> {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Services',
    type: [ServiceCategoryMemberResponseType],
  })
  data: ServiceCategoryMemberResponseType[];
}
