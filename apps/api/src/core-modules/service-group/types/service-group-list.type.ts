import { ApiProperty } from '@nestjs/swagger';
import { PaginationType } from '../../../shared/types/pagination-type';
import { ServiceGroupInListResponseType } from './service-group-in-list-response.type';

export class ServiceGroupPaginatedListType extends PaginationType<ServiceGroupInListResponseType> {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Service Groups',
    type: [ServiceGroupInListResponseType],
  })
  data: ServiceGroupInListResponseType[];
}
