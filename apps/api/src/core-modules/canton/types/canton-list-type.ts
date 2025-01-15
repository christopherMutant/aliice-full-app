import { ApiProperty } from '@nestjs/swagger';
import { CantonResponseType } from './canton-response-type';

export class CantonListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Cantons',
    type: [CantonResponseType],
  })
  data: CantonResponseType[];
}
