import { ApiProperty } from '@nestjs/swagger';
import { ServiceInListResponseType } from './service-in-list-response.type';
import { PaginationType } from '../../../shared/types/pagination-type';

export class ServicePaginatedListType extends PaginationType<ServiceInListResponseType> {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Services',
    type: [ServiceInListResponseType],
  })
  data: ServiceInListResponseType[];
}
