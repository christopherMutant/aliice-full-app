import { ApiProperty } from '@nestjs/swagger';
import { CantonResponseType } from './canton-response-type';

export class CantonType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Canton',
    type: CantonResponseType,
  })
  data: CantonResponseType;
}
