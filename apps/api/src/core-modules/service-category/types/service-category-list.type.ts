import { ApiProperty } from '@nestjs/swagger';
import { ServiceCategoryInListResponseType } from './service-category-in-list-response.type';

export class ServiceCategoryListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Service Categories',
    type: [ServiceCategoryInListResponseType],
  })
  data: ServiceCategoryInListResponseType[];
}
