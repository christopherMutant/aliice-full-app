import { ApiProperty } from '@nestjs/swagger';
import { InabilityResponseType } from './inability-response.type';

export class InabilityType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of an Inability',
    type: InabilityResponseType,
  })
  data: InabilityResponseType;
}
