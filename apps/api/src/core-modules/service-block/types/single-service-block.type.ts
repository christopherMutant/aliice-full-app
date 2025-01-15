import { ApiProperty } from '@nestjs/swagger';
import { ServiceBlockResponseType } from './service-block-response.type';

export class ServiceBlockType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Service Blocks',
    type: ServiceBlockResponseType,
  })
  data: ServiceBlockResponseType;
}
