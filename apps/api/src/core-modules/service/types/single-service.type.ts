import { ApiProperty } from '@nestjs/swagger';
import { ServiceResponseType } from './service-response.type';

export class ServiceType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of an Service',
    type: ServiceResponseType,
  })
  data: ServiceResponseType;
}
