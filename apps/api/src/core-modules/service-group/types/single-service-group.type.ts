import { ApiProperty } from '@nestjs/swagger';
import { ServiceGroupResponseType } from './service-group-response.type';

export class ServiceGroupType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of a Service Group',
    type: ServiceGroupResponseType,
  })
  data: ServiceGroupResponseType;
}
