import { ApiProperty } from '@nestjs/swagger';
import { CheckupResponseType } from './checkup-response.type';

export class CheckupType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of a Checkup',
    type: CheckupResponseType,
  })
  data: CheckupResponseType;
}
