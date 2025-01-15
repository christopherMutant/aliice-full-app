import { ApiProperty } from '@nestjs/swagger';
import { ServiceBlockInListResponseType } from './service-block-in-list-response.type';
import { ServiceInListResponseType } from '../../service/types/service-in-list-response.type';

export class ServiceBlockResponseType extends ServiceBlockInListResponseType {
  @ApiProperty({
    description: 'List of Services',
    type: [ServiceInListResponseType],
  })
  services: ServiceInListResponseType[];
}
