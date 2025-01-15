import { ApiProperty } from '@nestjs/swagger';
import { LaboratoryRequestResponseType } from './laboratory-request-response.type';

export class LaboratoryRequestListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Laboratory Requests',
    type: [LaboratoryRequestResponseType],
  })
  data: LaboratoryRequestResponseType[];
}
