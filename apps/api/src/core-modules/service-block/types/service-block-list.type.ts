import { ApiProperty } from '@nestjs/swagger';
import { PaginationType } from '../../../shared/types/pagination-type';
import { ServiceBlockInListResponseType } from './service-block-in-list-response.type';

export class ServiceBlockPaginatedListType extends PaginationType<ServiceBlockInListResponseType> {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Service Blocks',
    type: [ServiceBlockInListResponseType],
  })
  data: ServiceBlockInListResponseType[];
}
