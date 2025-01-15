import { ApiProperty } from '@nestjs/swagger';
import { ServiceCategoryResponseType } from './service-category-response.type';

export class ServiceCategoryType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of a Service Category',
    type: ServiceCategoryResponseType,
  })
  data: ServiceCategoryResponseType;
}
